---
title: "Color manipulation experiments with OKLCH"
date: 2024-08-01
teaser: "Creating color palettes programmatically using the OKLCH color space in CSS."
tags:
  - Color
  - CSS
  - Data Visualization
  - Design
  - OKLCH
---

{% from './colorSwatchFigure.njk' import colorSwatchFigure %}

<style>
  {% include "./post-styles.css" %}
</style>

## Intro and some background on (OK)LCH

Recently at work I've spent some time getting to know the Lightness, Chroma, and Hue (LCH) color space by experimenting with using it for programmatically generating color palettes. Much has already been said about the LCH color space ([OKLCH in CSS: why we moved from RGB and HSL][oklch-in-css] by [Evil Martians][evil-martians] comes to mind and is recommended reading) so I won't go into too much depth about it here.

The "TLDR" is that the LCH color space provides a way to manipulate colors while maintaining lightness that is perceptually similar across hues. That might not sound like a big deal, but it is drastically different than the HSL or HSV color spaces where the same lightness value used with different hues can result in colors that look drastically different in terms of lightness.

To quickly demonstrate, here are a couple of different colors defined using HSL with the same lightness value applied to them. Notice how the lightness of the two colors doesn't look quite the same:

{% set caption %}
  Two color swatches, blue and magenta, defined using the HSL color space with a shared saturation value of 100% and lightness value of 50%. The blue is noticeably darker than the magenta despite using the same lightness value.
{% endset %}

{{ colorSwatchFigure([{ fill: "hsl(250 100% 50%)", textFill: "#fff" }, { fill: "hsl(300 100% 50%)", textFill: "#333" }], caption) }}

However, when we define the same two colors using the LCH color space we get colors that do in fact appear to have the same perceptual amount of lightness:

{% set caption %}
  Two color swatches, blue and magenta, defined using the OKLCH color space with a shared chroma value of 0.25 and lightness value of 0.5. The two colors appear to be uniform in terms of their lightness and color richness.
{% endset %}

{{ colorSwatchFigure([{ fill: "oklch(0.5 0.25 250)", textFill: "#fff" }, { fill: "oklch(0.5 0.25 300)", textFill: "#fff" }], caption) }}

The use of the CSS `oklch()` function instead of the regular `lch()` function means that we are using an updated version of the LCH color model that contains some corrections to the original (TODO: add link to post explaining this?). In CSS Color Modules 4 (TODO: link) we can use either `oklch` or `lch`, but it seems more reasonable to prefer `oklch` for most use cases in order to benefit from the improved upon implementation.

The `oklch` function in CSS has a baseline of "newly available", meaning that it is available in all up to date browsers. Even so, it's probably worth using the CSS `@supports` to detect that it's available before using it, especially if you know people viewing your site might be on an older device or browser that isn't up to date.

You may have noticed that the second swatch in each example don't appear to be the same hue. Hues don't directly map evenly between HSL and LCH, so a hue of 300 degrees in HSL will produce a vivid magenta while in LCH 300 is a little more on the red side.

When researching LCH I was surprised to learn that the LCH color space is similar to the [Lab color space](#)(TODO: link), which I had used previously when creating multi hue color gradients to avoid the dreaded middle gray dead zone that is common when creating linear gradients using RGB and HSL. LCH and Lab use the same color model, while LCH allows for specifying the desired color using polar color coordinates instead of cartesian (TODO: or is it the other way around?). This makes LCH a little more intuitive to use from a designer's perspective.

Another benefit of using either Lab or LCH is that we optionally gain access to colors that are outside of the RGB color space. This is known as the "P3" color gamut, sometimes lumped in with "High Definition" (HD) colors (TODO: link to web.dev article). Devices with fancy screens, such as retina displays on Apple devices, have support for these colors while older monitors and displays do not. Therefore, it's best to use CSS feature queries to detect if the device supports HD colors and if not provide a fallback color in RGB. If you don't provide a fallback the browser will do its best to provide one, but it may not be a fallback you prefer.

[Here's a simple Codepen][codepen-detect-p3] I made that will tell you if your device supports P3 / HD colors. If the two squares are orange, you have P3 available. The left square should look like a more rich or vivid orange compared to the right square. If the first square is black, then your device does not support P3.

You only need to worry about this if you are intentionally using P3 colors. From my experience this is most easily achieved with LCH by increasing the Chroma value of a color. If you are converting RGB colors to LCH and not adjusting their chroma value then you won't need to worry about. Drastically reducing the lightness value in LCH also may get you into P3 territory.

The [OKLCH Color Picker and Converter][oklch-picker-converter] by Evil Martians makes it easy to detect if you are entering P3 territory when adjusting the lightness and chroma values. It will display a second color swatch with an RGB fallback once you've crossed over:

![TODO: screenshot of OKLCH color picker]()

![TODO: 2nd screenshot of OKLCH color picker in P3 land]()

Google Chrome's color picker in dev tools will also indicates where the RGB / P3 color gamut boundary is when you are adjusting a color using `oklch`:

![TODO: screenshot of Google Chrome color picker]()

Now that we've covered the background of OKLCH let's move on to the fun stuff... the experiments!

## Experiment One: Create a Categorical Color Palette From a Single Hue

The first thing I tried was creating a categorical color palette from a single hue. Again, because the LCH color model maintains a perceptual level of lightness across hues, my thinking was to keep the chroma and lightness value from our original hue while shifting the hue value to create new colors. Each of our new colors should look similar to our original color because they share the same chroma and lightness.

The following graphics come from the Observable Notebook ["Creating categorical color palettes with OKLCH"][notebook-exploring-oklch].

Starting with a single color, say `#f97f00`, a vibrant orange (which happens to be the accent color for this website's theme in dark mode):

{{ colorSwatchFigure([{ fill: "#f97f00" }], "A color swatch of an orange hue.") }}

We can create _N_ more colors by shifting the `H` value of the color in `oklch` by 360 / _N_, since in `oklch` the hue value ranges from 0 - 360. We also don't need to worry about having a value that is exactly in the range of 0 to 360 since anything over 360 will wrap to the equivalent hue. For example a hue value of 400 will wrap to 40 since 400 - 360 = 40.

To demonstrate, here is a palette of seven colors I created using this technique using the original color of `#f97f00`. The first color swatch is the original or starting hue, the six that follow were programmatically created.

<figure class="swatch-container">
  <svg viewBox="0 0 230 38" style="max-height: 128px; width: 100%;">
    <rect x="0" y="0" width="230" height="38" fill="var(--background-color)"/>
    <rect fill="rgb(249,127,0)" x="3" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/><rect fill="rgb(184,169,0)" x="35" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/><rect fill="rgb(0,197,115)" x="67" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/><rect fill="rgb(0,194,222)" x="99" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/><rect fill="rgb(87,164,255)" x="131" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/><rect fill="rgb(198,129,250)" x="163" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/><rect fill="rgb(252,109,161)" x="195" y="3" width="32" height="32" stroke="var(--background-color)" stroke-width="2"/>
  </svg>
  <figcaption>
    A programmatically generated color palette of seven colors. Each color shares the same lightness and chroma value and are equidistant from one another in terms of hue. Such a palette could be suitable for a categorical color scheme for use in data visualization.
  </figcaption>
</figure>

What's interesting to me about this is that the color palette that is generated looks consistent with the starting color. None of the other colors feel out of place, e.g. too dark or too light, when considering that this palette could be used for a categorical color scheme in a data visualization or thematic map where the purpose of using color is to differentiate various categories but not emphasize any one category. Since each color shares the same lightness and chroma LCH value, the palette as a whole feels perceptually uniform.


## Experiment Two: Create a Sequential Color Palette From a Single Hue

Sequential color palettes used for data visualization typically start out using a very light color and gradually move towards dark, usually to visually convey less to more of something. Using the LCH color space we can again do something similar programmatically by keeping the same hue and adjusting the lightness, perhaps even the chroma.

The following graphics come from the Observable Notebook [Creating sequential color palettes with OKLCH][notebook-sequential-oklch].

## Experiment Three: Analyzing Color Brewer Palettes using OKLCH

What if instead of creating new colors using OKLCH we used it to analyze popular color palettes, such as those used in data visualization? Using a JavaScript library such as ColorJS we can convert the RGB versions of each palette into OKLCH and then read each of the values for lightness, chroma, and hue. This could be an interesting way to "dissect" or analyze different types of color palettes, which could help inform how we create color palettes suitable for data visualization on the fly.

The following graphics come from the Observable Notebook ["Color palette analysis with OKLCH"][notebook-color-analysis].

## Wrapping Up

I don't know about you but I think using OKLCH for these purposes is pretty friggin cool. While they are simple experiments that stemmed from solving a practical problem, I do think they are promising. I hope that they can help you when it comes to utilizing color in your projects, whether that's for data visualization or other purposes.

In fact, I've used OKLCH here in my website to adjust the theme accent colors in both the light and dark themes for the site. If you're viewing this site on a device that supports HD colors you will be getting a more rich version of these accent colors. I've also used OKLCH to refine the accent color variants so that they are a little more harmonious. Places this shows up in this site are the link colors where visited links have a slightly darker color, and also in the [portfolio page](/work/) for the filter buttons.

For reference, here is the full list of Observable Notebooks of the experiments I mentioned in this article:
- [Color palette analysis with OKLCH][notebook-color-analysis]
- [Creating categorical color palettes with OKLCH][notebook-exploring-oklch]
- [Creating sequential color palettes with OKLCH][notebook-sequential-oklch]
- [Creating more categorical color palettes with OKLCH][notebook-palette-oklch]

## Outline:

- what is a color space?
- why should you care?
- pitfalls of HSL
- perceptual lightness
- heuristics vs. algorithms
- example: create a new categorical palette from a single color
- example: create a sequential single hue palette from a single color
- example: create a sequential multi hue palette from a single color
- example: analyzing color palettes from Color Brewer

[codepen-detect-p3]: https://codepen.io/clhenrick/pen/LYKjwpE?editors=1100
[evil-martians]: https://evilmartians.com
[mdn-oklch]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
[notebook-color-analysis]: https://observablehq.com/@clhenrick/color-palette-analysis-using-oklch
[notebook-exploring-oklch]: https://observablehq.com/@clhenrick/exploring-oklch-color
[notebook-sequential-oklch]: https://observablehq.com/@clhenrick/sequential-color-palette-genration-using-oklch
[notebook-palette-oklch]: https://observablehq.com/@clhenrick/accent-color-to-palette-using-oklch
[oklch-in-css]: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
[oklch-picker-converter]: https://oklch.com
