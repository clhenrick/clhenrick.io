import { DateTime } from "luxon";
import { EleventyHtmlBasePlugin, EleventyRenderPlugin } from "@11ty/eleventy";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import bundlerPlugin from "@11ty/eleventy-plugin-bundle";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyTocPlugin from "eleventy-plugin-toc";
import markdownit from "markdown-it";
import anchor from "markdown-it-anchor";
import postcss from "postcss";
import postcssMinify from "postcss-minify";
import autoprefixer from "autoprefixer";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import {
  pluginImages,
  pluginDataCascadeImage,
} from "./eleventy.config.images.mjs";
import { minify } from "terser";
import htmlmin from "html-minifier-terser";

const markdown = markdownit({
  html: true,
});

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  // Force 11ty to watch CSS and JS files
  eleventyConfig.addWatchTarget("assets/css/**/*.css");
  eleventyConfig.addWatchTarget("assets/js/**/*.js");

  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
  eleventyConfig.addWatchTarget("public/**/*.{svg,webp,png,jpeg,ico}");

  eleventyConfig.addPassthroughCopy({
    // TODO: eventually remove "./public/img" when all image files are rendered using the 11ty Image Plugin
    "./public/img": "/img",
    "./public/favicon": "/favicon",
    "./public/manifest.webmanifest": "/manifest.webmanifest",
    "./public/robots.txt": "/robots.txt",
    "./public/keybase.txt": "/keybase.txt",
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
  }

  eleventyConfig.setLibrary("md", markdown.use(anchor));

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(bundlerPlugin, {
    transforms: [transformMinifyCss, transformMinifyJs],
  });
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(pluginDataCascadeImage);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(eleventyTocPlugin, {
    tags: ["h2", "h3"],
    wrapperLabel: "Table of contents",
  });

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", transformMinifyHtml);
  }

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

  eleventyConfig.addFilter("isArray", (value) => Array.isArray(value));

  eleventyConfig.addPairedShortcode(
    "figure",
    (content, caption, className = "figure") => {
      return `<figure class="${className}">${content}<figcaption>${caption}</figcaption></figure>`;
    }
  );

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
}

/** process CSS with PostCSS */
async function transformMinifyCss(content) {
  // NOTE: `this.type` returns the bundle name
  if (this.type === "css") {
    const postCssPlugins = [autoprefixer];

    if (process.env.NODE_ENV === "production") {
      /** minify inlined CSS in production builds */
      postCssPlugins.push(postcssMinify);
    }

    try {
      const result = postcss(postCssPlugins).process(content, {
        from: this.page.inputPath,
        to: null,
      });
      return result.css;
    } catch (error) {
      console.error("Problem transforming CSS: ", error);
      // fallback gracefully
      return content;
    }
  }
  return content;
}

/** minifies inlined JavaScript in production builds */
async function transformMinifyJs(content) {
  if (this.type === "js" && process.env.NODE_ENV === "production") {
    try {
      const minified = await minify(content);
      return minified.code;
    } catch (error) {
      console.error("Problem minifying JS: ", error);
      // fallback gracefully
      return content;
    }
  }
  return content;
}

const htmlminOptions = {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true,
  continueOnParseError: true,
};

async function transformMinifyHtml(content) {
  if ((this.page.outputPath || "").endsWith(".html")) {
    try {
      let minified = await htmlmin.minify(content, htmlminOptions);
      return minified;
    } catch (error) {
      console.error("problem minifying html: ", error);
    }
  }
  // If not an HTML output, return content as-is
  return content;
}
