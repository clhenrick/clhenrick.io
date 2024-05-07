#!/usr/bin/env zx
import "zx/globals";

/**
 * find-and-replace-md-img-tags.mjs
 * Node.js ESM script that will find and replace markdown image syntax with an Eleventy Nunjucks 'image' shortcode.
 * Note: this script uses the zx library: https://google.github.io/zx/
 * Warning: this script will write to the input file!
 * Usage: find-and-replace-md-img-tag.mjs --file=relative/path/to/file.md
 */

const input = argv.file;
if (!input) {
  echo("No input file specified");
  echo(
    "usage: find-and-replace-md-img-tag.mjs --file=relative/path/to/file.md"
  );
  process.exit(0);
}
echo("Processing file: " + input);

const data = fs.readFileSync(input, { encoding: "utf8" });

const regex = /\!\[(.*?)\]\((.*)\)$/gm;

const matches = data.matchAll(regex);
const matchesArray = Array.from(matches);

if (!matchesArray.length) {
  echo("No markdown image tags found, exiting.");
  process.exit(0);
}

let processed = data;

matchesArray.forEach(([match, altText, imgPath]) => {
  const fileName = imgPath.split("/").pop();
  const imgShortCode = `{% image '${fileName}', '${altText || ""}' %}`;
  processed = processed.replace(match, imgShortCode);
});

echo("Writing file: " + input);
fs.writeFileSync(input, processed, { encoding: "utf8" });
echo("Done.");

process.exit(0);
