const { DateTime } = require("luxon");
const {
  EleventyHtmlBasePlugin,
  EleventyRenderPlugin,
} = require("@11ty/eleventy");

const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdown = require("markdown-it")({
  html: true,
});
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const {
  pluginImages,
  pluginDataCascadeImage,
} = require("./eleventy.config.images.js");

module.exports = function (eleventyConfig) {
  // Force 11ty to watch CSS and JS files
  eleventyConfig.addWatchTarget("assets/css/**/*.css");
  eleventyConfig.addWatchTarget("assets/js/**/*.js");

  // TODO: remove this after JS is handled via minification approach
  eleventyConfig.addWatchTarget("public/js/**/*.js");

  // TODO: remove this after JS is handled via minification approach
  eleventyConfig.addPassthroughCopy({
    "./public/js": "/js",
  });

  // CSS and JavaScript are inlined in HTML for performance reasons. The problem
  // with that is that saving a CSS or JavaScript file during development does
  // not cause HTML files to be recompiled, which makes working on the site
  // significantly more cumbersome. The problem is addressed by linking external
  // stylesheets and scripts in development, and inlining their content in style
  // script tags in production. For the assets to be linked to in development,
  // they need to be passed through to the `_site` directory.
  // See: https://kittygiraudel.com/2020/12/03/inlining-scripts-and-styles-in-11ty/
  if (process.env.NODE_ENV !== "production") {
    eleventyConfig.addPassthroughCopy("assets/js");
    eleventyConfig.addPassthroughCopy("assets/css");
    eleventyConfig.addPassthroughCopy(
      "node_modules/prismjs/themes/prism-okaidia.css"
    );
  }

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(pluginDataCascadeImage);

  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

  eleventyConfig.addGlobalData("generated", () => {
    const now = new Date();
    const timeZone = "PST";
    const buildTime = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone,
    }).format(now);
    return {
      iso: now.toISOString(),
      formatted: `${buildTime} ${timeZone}`,
    };
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "LLLL dd, yyyy"
    );
  });

  eleventyConfig.addFilter("dateFromISOString", (dateString, format, zone) => {
    // dateString is expected to be an ISO 8601 date string such as "YYYY-MM-DD"
    // full list of options: https://moment.github.io/luxon/#/parsing?id=iso-8601
    return DateTime.fromISO(dateString, { zone: zone || "utc" }).toFormat(
      format || "LLLL dd, yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  });

  eleventyConfig.addFilter("markdown", (value) => {
    return `<div class="md-block">${markdown.render(value)}</div>`;
  });

  eleventyConfig.addFilter("findIndex", (array, target) => {
    return array.findIndex((item) => item === target);
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],
    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",
    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    pathPrefix: "/",
  };
};
