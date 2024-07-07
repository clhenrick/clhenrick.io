const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const constants = require("./_data/constants");

/**
 * handles creating an 11ty shortcode for images.
 * Outputs image markup as `<picture>` element with child `<source>` and `<img>` elements
 * */
function pluginImages(eleventyConfig) {
  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode(
    "image",
    async function imageShortcode(
      src,
      alt = "",
      widths = constants.IMAGE_WIDTHS_NORMAL_PAGE_LAYOUT,
      sizes = constants.IMAGE_SIZES_NORMAL_PAGE_LAYOUT
    ) {
      const formats = ["webp", "jpeg", "svg"];
      const filename = src.split("/").pop();
      const input = path.join(__dirname, "public", "img", filename);

      const metadata = await eleventyImage(input, {
        widths,
        formats,
        // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
        outputDir: path.join(eleventyConfig.dir.output, "img"),
        outputPath: "/img/",
        // use the input filename instead of a hash for naming the optimized images
        filenameFormat: function formatFilename(id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${width}w.${format}`;
        },
      });

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
}

/**
 * allows for processing images as data files.
 * see: https://www.11ty.dev/docs/plugins/image/#process-images-as-data-files
 */
function pluginDataCascadeImage(eleventyConfig) {
  eleventyConfig.addDataExtension("png,jpg,jpeg", {
    read: false, // Don’t read the input file, argument is now a file path
    parser: async (imagePath) => {
      let stats = await eleventyImage(imagePath, {
        widths: ["auto"],
        formats: ["webp", "jpeg"],
        outputDir: path.join(eleventyConfig.dir.output, "img"),
      });

      return {
        image: {
          stats,
        },
      };
    },
  });

  // This works sync or async: images were processed ahead of time in the data cascade
  eleventyConfig.addShortcode("dataCascadeImage", (stats, alt, sizes) => {
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    return eleventyImage.generateHTML(stats, imageAttributes);
  });
}

module.exports = {
  pluginDataCascadeImage,
  pluginImages,
};
