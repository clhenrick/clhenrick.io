const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode(
    "image",
    async function imageShortcode(
      src,
      alt = "",
      widths = [960, 420, 1280],
      sizes = "100vw"
    ) {
      const formats = ["webp", "jpeg", "svg"];
      const filename = src.split("/").pop();
      const input = path.join(__dirname, "public", "img", filename);

      const metadata = await eleventyImage(input, {
        widths: [...widths, null], // null means the original size
        formats: [...formats, null], // null means the original format
        outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
        outputPath: "/img/",
      });

      // TODO loading=eager and fetchpriority=high
      const imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      const options = {
        whitespaceMode: "inline",
      };

      return eleventyImage.generateHTML(metadata, imageAttributes, options);
    }
  );
};
