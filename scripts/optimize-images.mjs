#!/usr/bin/env zx
import { argv, echo, glob } from "zx";
import Image from "@11ty/eleventy-img";
import fs from "node:fs";

const DEFAULT_IMG_QUALITY = 80; // matches defaults for Sharp image processor used by eleventy-img plugin

const inputFile = argv["file-path"];
const inputDir = argv["dir-path"];
const pattern = argv.pattern;
let widths = argv.widths;
let formats = argv.formats;
const help = argv.help;
const isDryRun = argv["dry-run"];
const useFileName = argv["use-file-name"];
const jpegQuality = parseInt(argv["jpeg-quality"] ?? DEFAULT_IMG_QUALITY);
const webpQuality = parseInt(argv["webp-quality"] ?? DEFAULT_IMG_QUALITY);

const isMissingRequiredArgs = !inputFile && !inputDir && !pattern;

if (isMissingRequiredArgs || help) {
  echo("usage: zx optimize-images --path=relative/path/to/images/");
  echo("see scripts/README.md for further usage.");
  process.exit(0);
}

if (typeof widths === "string") {
  widths = widths.split(",").map((value) => +value);
}

if (typeof formats === "string") {
  formats = formats.split(",");
}

if (pattern) {
  await handlePattern(pattern);
} else if (inputDir) {
  handleInputDir(inputDir);
} else if (inputFile) {
  try {
    await processImage(inputFile, widths, formats);
  } catch (error) {
    echo("error ", error);
    process.exit(1);
  }
  echo("Done");
} else {
  echo("Error");
  process.exit(1);
}

function handleInputDir(dir) {
  const dirContents = fs.readdirSync(dir);
  const promises = dirContents.map((filePath) => {
    return processImage(filePath, widths, formats);
  });
  Promise.all(promises)
    .then(() => {
      echo("done!");
      process.exit(0);
    })
    .catch((error) => {
      echo("error: ", error?.message);
      process.exit(1);
    });
}

async function handlePattern(globPattern) {
  echo("pattern: " + globPattern);
  const results = await glob([globPattern]);
  const promises = results.map((filePath) => {
    return processImage(filePath, widths, formats);
  });
  return Promise.all(promises)
    .then(() => {
      echo("done!");
      process.exit(0);
    })
    .catch((error) => {
      echo("error: ", error?.message);
      process.exit(1);
    });
}

async function processImage(
  src,
  widths = ["auto"],
  formats = ["webp", "jpeg"]
) {
  echo("Processing image: " + src);
  const stats = await Image(src, {
    widths,
    formats,
    dryRun: !!isDryRun,
    useCache: false,
    sharpWebpOptions: {
      quality: webpQuality,
    },
    sharpJpegOptions: {
      quality: jpegQuality,
    },
    ...(useFileName && { filenameFormat }),
  });
  console.log(stats);
}

function filenameFormat(id, src, width, format, options) {
  const extension = path.extname(src);
  const name = path.basename(src, extension);
  return `${name}-${width}w.${format}`;
}

process.exit(0);
