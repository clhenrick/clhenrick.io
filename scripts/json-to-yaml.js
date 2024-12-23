#!/usr/bin/env zx

import { argv, path, fs } from "zx";
import yaml from "js-yaml";

const input = argv.file;
const outfile = argv.outfile;

if (!input || !outfile) {
  console.log(
    "usage: npx zx scripts/json-to-yaml --file=path/to/file.json --outfile=path/to/outfile.yaml"
  );
  process.exit(0);
}

main();

function parseJsonInput() {
  const parsed = path.parse(input);
  const fullPath = path.join(process.cwd(), parsed.dir, parsed.base);
  return fs.readJSONSync(fullPath, { encoding: "utf8" });
}

function convertToYaml(data) {
  return yaml.dump(data, { lineWidth: 100 });
}

function writeOutFile(string) {
  const parsed = path.parse(outfile);
  const fullpath = path.join(process.cwd(), parsed.dir, parsed.base);
  fs.writeFileSync(fullpath, string, { encoding: "utf8" });
}

function main() {
  try {
    const json = parseJsonInput();
    const converted = convertToYaml(json);
    writeOutFile(converted);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
