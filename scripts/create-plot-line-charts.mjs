#!/usr/bin/env zx

/**
 * create-plot-line-charts.mjs
 * used for creating line charts for the blog post "Color manipulation experiments with OKLCH"
 * usage: npx zx scripts/create-plot-line-chart.mjs
 */

import * as Plot from "@observablehq/plot";
import { JSDOM } from "jsdom";

const properties = new Map([
  [
    "lightness",
    [
      0.9556043692364901, 0.8856051616076382, 0.8135084132420718,
      0.7520499284793192, 0.6790920321499001, 0.5994997616920047,
      0.435696619133839,
    ],
  ],
  [
    "chroma",
    [
      0.02719759511517301, 0.07848777934270625, 0.12474928401954712,
      0.16349806406136444, 0.18695357248797942, 0.1916583458413386,
      0.13654289098568484,
    ],
  ],
  [
    "hue",
    [
      63.95710878155268, 67.1447157411327, 60.00699028921258, 52.7418807344925,
      45.41513199214904, 39.00608638779073, 39.01180381488899,
    ],
  ],
]);

const yAxisLabels = new Map([
  ["lightness", "lightness (%)"],
  ["chroma", "chroma"],
  ["hue", "hue (degrees)"],
]);

const accNames = new Map([
  ["lightness", "Line chart of lightness values for the Color Brewer oranges color scheme"],
  ["chroma", "Line chart of chroma values for the Color Brewer oranges color scheme"],
  ["hue", "Line chart of hue values for the Color Brewer oranges color scheme"],
])

const codeComment = `{# Note: this chart was programmatically generated using PlotJS. See scripts/create-plot-line-charts.mjs #}`

main();

function main() {
  for (let [property, values] of properties) {
    const yLabel = yAxisLabels.get(property);
    const ariaLabel = accNames.get(property);
    const data =
      properties === "lightness" ? convertValuesToPercentages(values) : values;
    const chartMarkup = createLineChart(data, yLabel, ariaLabel);
    const contents = codeComment + "\n" + chartMarkup;
    writeNjkPartialFile(property, contents);
  }
  process.exit(0);
}

/**
 * writes a Nunjucks partial file to the desired directory
 * @param {string} chartName
 * @param {string} contents
 */
function writeNjkPartialFile(chartName, contents) {
  const outPath = getOutFilePath(chartName);
  fs.writeFileSync(outPath, contents, { encoding: "utf-8" });
}

/**
 * returns the file path for the file to write to
 * @param {string} property
 * @returns {string}
 */
function getOutFilePath(property) {
  const propertyTitleCase = titleCaseString(property);
  const fileName = `lineChart${propertyTitleCase}.njk`;
  const filePath = `${process.cwd()}/_includes/components/blog-posts/color-experiments-oklch/${fileName}`;
  return filePath;
}

/**
 * converts a string to title case: "foo" => "Foo"
 * @param {string} string
 * @returns {string}
 */
function titleCaseString(string) {
  return string
    .split("")
    .map((character, index) =>
      index === 0 ? character.toUpperCase() : character
    )
    .join("");
}

/**
 * converts a series of numbers to percentages
 * @param {number[]} values
 * @returns {number[]}
 */
function convertValuesToPercentages(values) {
  return values.map((d) => d * 100);
}

/**
 * Returns the outerHTML result from calling Plot.plot(options)
 * @param {number[]} data
 * @param {string} yAxisLabel
 * @returns {string} SVG markup
 */
function createLineChart(data, yAxisLabel, accName) {
  const plot = Plot.plot({
    document: new JSDOM("").window.document,
    ariaLabel: accName,
    x: { label: "swatch step" },
    y: { label: yAxisLabel },
    marks: [
      Plot.frame({ strokeWidth: 1 }),
      Plot.gridY({ strokeOpacity: 0.3 }),
      Plot.lineY(data, {
        stroke: "var(--color-accent, currentColor)",
        strokeWidth: 2,
        x: (_, i) => i + 1,
      }),
      Plot.dot(
        data.map((d, i) => [i + 1, d]),
        {
          fill: "var(--color-accent, currentColor)",
          r: 4,
          stroke: "var(--background-color, currentColor)",
        }
      ),
    ],
  });

  plot.setAttribute("role", "img");

  plot.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns",
    "http://www.w3.org/2000/svg"
  );
  plot.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  return plot.outerHTML;
}
