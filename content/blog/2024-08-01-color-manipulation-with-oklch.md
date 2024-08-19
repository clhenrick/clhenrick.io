---
title: "Color manipulation experiments with OKLCH"
date: 2024-08-01
teaser: "Creating color palettes programmatically using the OKLCH color space in CSS."
tags:
  - Color Spaces
  - JavaScript
  - Design
  - CSS
  - Data Visualization
  - Prototyping
---

<style>
  .swatch-container {
    width: 100%;
    margin-bottom: var(--spacing-mmd);
  }

  .swatch-container div {
    width: 100%;
    display: flex;
    gap: var(--spacing-md);
    font-family: var(--font-family-monospace);
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
  }

  .swatch-container svg {
    max-width: 25%;
  }
</style>

## Introduction

Recently I've spent some time getting to know the Lightness, Chroma, and Hue (LCH) color space and experimenting with using it for things like analyzing and generating color palettes. Much has already been said about the LCH color space (one well known article by [Evil Martians](#) comes to mind) so I won't go in depth about what it is. The "TL;DR" is basically that the LCH color space provides a way to adjust color while maintaining lightness that is perceptually similar between hues. That might not sound like a big deal, but it is drastically different than the HSL or HSV color spaces where the same lightness value used with different hues can result in colors that look drastically different in terms of lightness.

Just to demonstrate quickly, here are a couple of different hues with the same lightness value applied to them. Notice how their lightness doesn't look quite the same:

<figure class="swatch-container">
  <div>
    <svg viewBox="0 0 200 50">
      <rect x="0" y="0" width="200" height="50" fill="hsl(250 100% 50%)" />
      <text x="100" y="30" text-anchor="middle" fill="#fff">hsl(250 100% 50%)</text>
    </svg>
    <svg viewBox="0 0 200 50">
      <rect x="0" y="0" width="200" height="50" fill="hsl(300 100% 50%)" />
      <text x="100" y="30" text-anchor="middle" fill="#222">hsl(300 100% 50%)</text>
    </svg>
  </div>

  <figcaption>
    Two color swatches, blue and magenta, defined using the HSL color space with a shared saturation value of 100% and lightness value of 50%. The blue is noticeably darker than the magenta despite using the same lightness value.
  </figcaption>
</figure>

When we use the LCH color space we get a more consistent result:

<figure class="swatch-container">
  <div>
    <svg viewBox="0 0 200 50">
      <rect x="0" y="0" width="200" height="50" fill="oklch(0.5 0.25 250)" />
      <text x="100" y="30" text-anchor="middle" fill="#fff">oklch(0.5 0.25 250)</text>
    </svg>
    <svg viewBox="0 0 200 50">
      <rect x="0" y="0" width="200" height="50" fill="oklch(0.5 0.25 300)" />
      <text x="100" y="30" text-anchor="middle" fill="#fff">oklch(0.5 0.25 300)</text>
    </svg>
  </div>
  <figcaption>
    Two color swatches, blue and magenta, defined using the OKLCH color space with a shared chroma value of 0.25 and lightness value of 0.5. The two colors appear to be uniform in terms of their lightness and color richness.
  </figcaption>
</figure>

Note that the use of "OKLCH" instead of regular "LCH" means that we are using an updated version of the LCH color model that contains some corrections to the original (don't ask me to explain what they are in detail). In CSS color 4 we can use either, but it seems more reasonable to prefer OKLCH for most use cases in order to benefit from the corrected version.

Also note that hues don't directly map evenly between HSL and LCH, so a hue of 300 degrees in HSL will produce a vivid magenta while in LCH 300 is a little more red.

What I was surprised to learn is that the LCH color space is similar to the Lab color space, which I had used previously when creating multi hue color gradients to avoid the dead middle gray zone that is common with RGB and HSL. LCH allows for specifying the color using polar color coordinates instead of cartesian (TODO: or is it the other way around?).

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
