#!/usr/bin/env zx

/**
 * create-plot-line-chart.mjs
 * used for creating line charts for the blog post "Color manipulation experiments with OKLCH"
 * usage: npx zx scripts/create-plot-line-chart.mjs --property="hue"
 * where --property is one of "lighness", "chroma", or "hue"
 */

import { argv } from "zx";
import * as Plot from "@observablehq/plot";
import { JSDOM } from "jsdom";

const property = argv.property || "lightness";

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
  ["hue", "hue"]
]);

const dataToPlot = property === "lightness" ? properties.get(property).map((d) => d * 100) : properties.get(property);
const yAxisLabel = yAxisLabels.get(property);
const chart = createLineChart(dataToPlot, yAxisLabel);
console.log(chart);
process.exit(0);

function createLineChart(data, yAxisLabel) {
  const plot = Plot.plot({
    document: new JSDOM("").window.document,
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

// process.stdout.write(plot.outerHTML);
