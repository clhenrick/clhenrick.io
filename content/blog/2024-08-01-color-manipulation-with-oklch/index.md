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

{% from './colorSwatch.njk' import colorSwatch %}
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

Starting with a single color, say `#f97f00`, a vibrant orange (which happens to be the accent color for this website's theme in dark mode):

<!-- NOTE: not using colorSwatchFigure because of the use of <code> in <figcaption> -->
<figure class="swatch-container">
  <div>
    {{ colorSwatch("#f97f00", "transparent", false) }}
  </div>
  <figcaption>
    A color swatch of an orange hue with the CSS hex value of <code>f97f00</code>.
  </figcaption>
</figure>

We can create _N_ more colors by shifting the `H` value of the color in `oklch` by 360 / _N_, since in `oklch` the hue value ranges from 0 - 360. We also don't need to worry about having a value that is exactly in the range of 0 to 360 since anything over 360 will wrap to the equivalent hue. For example a hue value of 400 will wrap to 40 since 400 - 360 = 40.

To demonstrate, here is a palette of five colors I created using this technique starting with the original color of `#f97f00`. The first color swatch is the original hue, the four that follow were programmatically created.

{% set caption %}
  A programmatically generated color palette of five colors. Each color shares the same lightness and chroma value, and are equidistant from one another in terms of hue. Such a palette could be suitable for a categorical color scheme for use in data visualization.
{% endset %}

{{ colorSwatchFigure([{"fill":"#f97f00","showText":false,"width":32,"height":32},{"fill":"#89b80c","showText":false,"width":32,"height":32},{"fill":"#00c5ce","showText":false,"width":32,"height":32},{"fill":"#7a9bff","showText":false,"width":32,"height":32},{"fill":"#ef71c5","showText":false,"width":32,"height":32}], caption) }}

What's interesting to me about this is that the color palette that is generated looks consistent with the starting color. None of the other colors feel out of place, e.g. too dark or too light, when keeping in mind that this palette would be used for a categorical color scheme in a data visualization or thematic map, where the purpose of using color is to differentiate various categories but not emphasize any one category. Since each color shares the same lightness and chroma LCH value, the palette as a whole feels perceptually uniform.

The drawback of this approach is that as the number of hues increase, the palette's colors may not be different enough from one another, so viewers might have difficulty in distinguishing individual colors. It also by no means accessible in terms of color contrast out of the box. However, this could be a good starting point where a designer could make adjustments to each color as needed depending on the use case of the palette.

Feel free to try out the Observable Notebook ["Exploring OKLCH Color"][notebook-exploring-oklch].

## Experiment Two: Create a Sequential Color Palette From a Single Hue

Sequential color palettes used for data visualization typically start out using a very light color and gradually move towards dark, usually to visually convey a range of less to more of something such as population density in a thematic map or incidents per hour in a heat map chart. Using the LCH color space we can again programmatically generate a palette from a starting or input hue. This time by keeping the same hue in each of the palette's colors while adjusting the lightness and chroma.

The following graphics come from the Observable Notebook [Creating sequential color palettes with OKLCH][notebook-sequential-oklch].

This time let's start with a different color, the blue used for this website's theme's accent color in light mode, `#0055a9`.

<!-- NOTE: not using colorSwatchFigure because of the use of <code> in <figcaption> -->
<figure class="swatch-container">
  <div>
    {{ colorSwatch("#0055a9", "transparent", false) }}
  </div>
  <figcaption>
    A color swatch of a blue hue with the CSS hex value of <code>0055a9</code>.
  </figcaption>
</figure>

We can create a palette of _N_ colors by adjusting the lightness value of `oklch`. First we decide what the highest amount of lightness we want for the starting color should be, say 95%, and what the lowest amount of lightness we want for the last color should be, say 40%. Then based on the value of _N_ we create the middle colors by incrementally adjusting the lightness value while keeping the hue value the same.

We can also adjust the chroma value to help emphasize the change across the palette. Similar to lightness we start with a minimum level of chroma, perhaps `0.04`, for the lightest color and maximum value, perhaps `0.15` for the darkest color. Then we adjust the middle colors based on our _N_ value.

For adjusting the lightness and chroma values I found it easiest to use [D3JS's linear scales](https://d3js.org/d3-scale/linear) which makes it easy to interpolate between two values.

The result is as follows:

{% set caption %}
TODO: add caption
{% endset %}

{{ colorSwatchFigure([{"fill":"#ddf0ff","showText":false,"width":32,"height":32},{"fill":"#a6c4ec","showText":false,"width":32,"height":32},{"fill":"#7199ce","showText":false,"width":32,"height":32},{"fill":"#3c6faf","showText":false,"width":32,"height":32},{"fill":"#004590","showText":false,"width":32,"height":32}], caption)}}

If instead of using linear interpolation and use exponential interpolation we get a result that looks a little more like a proper sequential color palette. The result is subtle, but adds a bit of polish that helps. It can be adjusted by changing the exponent value.

{% set caption %}
TODO: add caption
{% endset %}


{{ colorSwatchFigure([{"fill":"#ddf0ff","showText":false,"width":32,"height":32},{"fill":"#c8e0fe","showText":false,"width":32,"height":32},{"fill":"#9abae5","showText":false,"width":32,"height":32},{"fill":"#5986c0","showText":false,"width":32,"height":32},{"fill":"#004590","showText":false,"width":32,"height":32}], caption) }}

If you ask me, these results aren't too shabby considering they were programmatically generated using some simple heuristics. The process could certainly be refined, I'm sure, and we could look to popular color palettes used for data visualization such as those from [Color Brewer](https://colorbrewer2.org/) or [d3-scale-chromatic](https://d3js.org/d3-scale-chromatic) for inspiration and improving our heuristics.

## Experiment Three: Analyzing Color Brewer Palettes using OKLCH

What if instead of creating new colors using OKLCH we used it to analyze popular color palettes, such as those used in data visualization? Using a JavaScript library such as [ColorJS][colorjs] we can convert the RGB versions of each palette into OKLCH and then read each of the values for lightness, chroma, and hue. This could be an interesting way to "dissect" or analyze different types of color palettes, which could help inform how we create color palettes suitable for data visualization on the fly.

Let's take a sequential, single hue color scheme from the [Color Brewer][color-brewer] color scheme library to try this out with. I'm obviously partial to orange, so I've chosen the "oranges" color scheme with seven discrete colors. I chose seven colors to start with since it will show more variation for the color scheme.

{% set caption %}
Seven color swatches belonging to the "oranges" sequential color scheme from the Color Brewer color scheme library. Color Brewer was developed by Cynthia Brewer and Mark Harrower at Pennsylvania State University.
{% endset %}

{{ colorSwatchFigure([{"fill":"#feedde","showText":false,"width":32,"height":32},{"fill":"#fdd0a2","showText":false,"width":32,"height":32},{"fill":"#fdae6b","showText":false,"width":32,"height":32},{"fill":"#fd8d3c","showText":false,"width":32,"height":32},{"fill":"#f16913","showText":false,"width":32,"height":32},{"fill":"#d94801","showText":false,"width":32,"height":32},{"fill":"#8c2d04","showText":false,"width":32,"height":32}], caption) }}

Using ColorJS we can convert each swatch from the oranges palette to OKLCH and then plot the lightness, chroma, and hue values on separate line graphs to see how these values change over the seven colors:

<figure aria-labelledby="lightness-plot-title">
  <span id="lightness-plot-title">Change in Lightness for the oranges color scheme</span>
{% include "./lightnessPlot.njk" %}
  <figcaption>
    Lightness decreases linearly from swatches one to six, then decreases sharply by 20% at swatch seven.
  </figcaption>
</figure>

<!-- TODO: chroma chart -->

<!-- TODO: hue chart -->

What's interesting to me about the above charts is that it shows the following about the oranges color scheme:

- Lightness steadily declines by about 5-8% until the last swatch where it declines significantly by about 20%.

- Chroma increases steadily by about 0.04 for each swatch until the last swatch where it takes a significant dive by roughly 0.7.

- Hue doesn't remain static, it changes slightly for each of color scheme's swatches with the exception of the last two swatches.

What about a multi-hue color scheme? How might that type of color scheme's heuristics differ from a single hue?

The following graphics come from the Observable Notebook ["Color palette analysis using OKLCH"][notebook-color-analysis].




## Wrapping Up

I don't know about you but I think using OKLCH for these purposes is pretty friggin cool. While they are simple experiments that stemmed from solving a practical problem, I do think they are promising. I hope that they can help you when it comes to utilizing color in your projects, whether that's for data visualization or other purposes.

In fact, I've used OKLCH here in my website to adjust the theme accent colors in both the light and dark themes for the site. If you're viewing this site on a device that supports HD colors you will be getting a more rich version of these accent colors. I've also used OKLCH to refine the accent color variants so that they are a little more harmonious. Places this shows up in this site are the link colors where visited links have a slightly darker color, and also in the [portfolio page](/work/) for the filter buttons.

For reference, here is the full list of Observable Notebooks of the experiments I mentioned in this article:
- [Color palette analysis with OKLCH][notebook-color-analysis]
- [Creating categorical color palettes with OKLCH][notebook-exploring-oklch]
- [Creating sequential color palettes with OKLCH][notebook-sequential-oklch]
- [Creating more categorical color palettes with OKLCH][notebook-palette-oklch]

[codepen-detect-p3]: https://codepen.io/clhenrick/pen/LYKjwpE?editors=1100
[color-brewer]: https://colorbrewer2.org/
[colorjs]: https://colorjs.io/
[evil-martians]: https://evilmartians.com
[mdn-oklch]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
[notebook-color-analysis]: https://observablehq.com/@clhenrick/color-palette-analysis-using-oklch
[notebook-exploring-oklch]: https://observablehq.com/@clhenrick/exploring-oklch-color
[notebook-sequential-oklch]: https://observablehq.com/@clhenrick/sequential-color-palette-genration-using-oklch
[notebook-palette-oklch]: https://observablehq.com/@clhenrick/accent-color-to-palette-using-oklch
[oklch-in-css]: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
[oklch-picker-converter]: https://oklch.com
