---
title: "Color manipulation with the OKLCH color space"
date: 2024-08-01
teaser: "Experiments creating color palettes programmatically using the (OK)LCH color space in CSS."
tags:
  - Color Spaces
  - JavaScript
  - Design
  - CSS
  - Data Visualization
  - Prototyping
---

Outline:

- what is a color space?
- why should you care?
- pitfalls of HSL
- perceptual lightness
- heuristics vs. algorithms
- example: create a new categorical palette from a single color
- example: create a sequential single hue palette from a single color
- example: create a sequential multi hue palette from a single color
- example: analyzing color palettes from Color Brewer

Observable Notebooks:
- [Color palette analysis with OKLCH][notebook-color-analysis]
- [Creating categorical color palettes with OKLCH][notebook-exploring-oklch]
- [Creating sequential color palettes with OKLCH][notebook-sequential-oklch]
- [Creating more categorical color palettes with OKLCH][notebook-palette-oklch]


[mdn-oklch]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
[notebook-color-analysis]: https://observablehq.com/@clhenrick/color-palette-analysis-using-oklch
[notebook-exploring-oklch]: https://observablehq.com/@clhenrick/exploring-oklch-color
[notebook-sequential-oklch]: https://observablehq.com/@clhenrick/sequential-color-palette-genration-using-oklch
[notebook-palette-oklch]: https://observablehq.com/@clhenrick/accent-color-to-palette-using-oklch
