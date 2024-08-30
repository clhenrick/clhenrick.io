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

{% from '_includes/components/colorSwatch.njk' import colorSwatch %}
{% from '_includes/components/colorSwatchFigure.njk' import colorSwatchFigure %}
{% from '_includes/components/lineChartFigure.njk' import lineChartFigure %}

<style>
  {% include "./post-styles.css" %}
</style>

## Intro and some background on (OK)LCH

Recently at work I've spent some time getting to know the Lightness, Chroma, and Hue (LCH) color space by experimenting with using it for programmatically generating color palettes. Much has already been said about the LCH color space ([OKLCH in CSS: why we moved from RGB and HSL][oklch-in-css] by [Evil Martians][evil-martians] comes to mind and is recommended reading) so I won't go into too much depth about it here.

The "TLDR" is that the LCH color space provides a way to manipulate colors while maintaining lightness that is perceptually similar across different hues. That might not sound like a big deal, but when you consider the implications it has for working with color programmatically, I think it's pretty huge, and it's why I decided to write about it here.

- **Quick fact**: the LCH color space is really the "Lab" color space with different channels (lightness, chroma, and hue) that are more intuitive for specifying a color than Lab's "a" and "b" channels.

- **Important context**: the "maintains perceptual lightness across hues" part of the LCH color space is drastically different than the HSL or HSV color spaces where the same lightness value used with different hues can result in colors that look drastically different in terms of lightness.

To quickly demonstrate the difference between HSL and LCH here are a couple of different colors defined using HSL and then LCH with the same lightness value applied to them.

Here are the HSL colors:

{% set caption %}
  Two color swatches, blue and magenta, defined using the HSL color space with a shared saturation value of 100% and lightness value of 50%. The blue is noticeably darker than the magenta despite using the same lightness value.
{% endset %}

{{ colorSwatchFigure([{ fill: "hsl(250 100% 50%)", textFill: "#fff" }, { fill: "hsl(300 100% 50%)", textFill: "#333" }], caption) }}

And here are the LCH colors with the same lightness values:

{% set caption %}
  Two color swatches, blue and magenta, defined using the OKLCH color space with a shared chroma value of 0.25 and lightness value of 0.5. The two colors appear to be uniform in terms of their lightness and color richness.
{% endset %}

{{ colorSwatchFigure([{ fill: "oklch(0.5 0.25 250)", textFill: "#fff" }, { fill: "oklch(0.5 0.25 300)", textFill: "#fff" }], caption) }}

The lightness of the two colors doesn't look quite the same in HSL, magenta is clearly brighter than blue with the same lightness value of 50%. However, when we define the same two colors using the LCH color space we get colors that do have the same perceptual amount of lightness.

You may have noticed that the second swatch in each example don't appear to be the same hue. Hues don't directly map evenly between HSL and LCH, so a hue of 300 degrees in HSL will produce a vivid magenta while in LCH 300 is a little more on the red side.

- **Minor detail**: The use of the CSS `oklch()` function instead of the regular `lch()` function means that we are using an updated version of the LCH color model that contains some corrections to the original (TODO: add link to post explaining this?). In CSS Color Modules 4 (TODO: link) we can use either `oklch` or `lch`, but it seems more reasonable to prefer `oklch` for most use cases in order to benefit from the improved upon implementation.

- **Quick FYI**: The `oklch` function in CSS has a baseline of "newly available", meaning that it is available in all up to date browsers. Even so, it's probably worth using the CSS `@supports` to detect that it's available before using it, especially if you know people viewing your site might be on an older device or browser that isn't up to date.

<!-- TODO: keep this paragraph? It's saying the same thing that was previously mentioned -->
<!-- When researching LCH I was surprised to learn that the LCH color space is similar to the [Lab color space](#)(TODO: link), which I had used previously when creating multi hue color gradients to avoid the dreaded middle gray dead zone that is common when creating linear gradients using RGB and HSL. LCH and Lab use the same color model, while LCH allows for specifying the desired color using polar color coordinates instead of cartesian (TODO: or is it the other way around?). This makes LCH a little more intuitive to use from a designer's perspective. -->

Another benefit of using either Lab or LCH is that we optionally gain access to colors that are outside of the RGB color space. This is known as the "P3" color gamut, sometimes lumped in with "High Definition" (HD) colors (TODO: link to web.dev article). Devices with fancy screens, such as retina displays on Apple devices, have support for these colors while older monitors and displays do not. Therefore, it's best to use CSS feature queries to detect if the device supports HD colors and if not provide a fallback color in RGB. If you don't provide a fallback the browser will do its best to provide one, but it may not be a fallback you prefer.

[Here's a simple Codepen][codepen-detect-p3] I made that will tell you if your device supports P3 / HD colors. If the two squares are orange, you have P3 available. The left square should look like a more rich or vivid orange compared to the right square. If the first square is black, then your device does not support P3.

You only need to worry about this if you are intentionally using P3 colors. From my experience this is most easily achieved with LCH by increasing the Chroma value of a color. If you are converting RGB colors to LCH and not adjusting their chroma value then you won't need to worry about. Drastically reducing the lightness value in LCH also may get you into P3 territory.

The [OKLCH Color Picker and Converter][oklch-picker-converter] by Evil Martians makes it easy to detect if you are entering P3 territory when adjusting the lightness and chroma values.

{% image 'oklch-color-picker-01.png', 'Screenshot of the OKLCH color picker tool UI developed by Evil Martians' %}

It will display a second color swatch with an RGB fallback once you've crossed over into the P3 gamut:

{% image 'oklch-color-picker-02.png', 'Screenshot of the OKLCH color picker tool UI developed by Evil Martians showing two color swatches; one in RGB and one in the P3 gamut' %}

Google Chrome's color picker in dev tools will also indicates where the RGB / P3 color gamut boundary is when you are adjusting a color using `oklch`:

<figure style="max-width:400px">
{% image 'chrome-color-picker-oklch.png', 'Screenshot of Google Chrome\'s developer tools color picker in OKLCH mode', [400, 800, 1200], '(max-width: 400px), calc(100vw - 48px)' %}
<figcaption>Chrome's color picker now features an OKLCH input and visualizes the boundary between sRGB and P3</figcaption>
</figure>

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

If you're reading this and you've previously studied color theory and/or are familiar with different types of common color schemes such as complementary, triadic, or analogous you're probably getting some ideas on how OKLCH could be used to programmatically create other types of color schemes just by shifting the hue value.

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

```js
const oranges = ['#feedde','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#8c2d04'];
```

{% set caption %}
Seven color swatches belonging to the "oranges" sequential color scheme from the Color Brewer color scheme library. Color Brewer was developed by Cynthia Brewer and Mark Harrower at Pennsylvania State University.
{% endset %}

{{ colorSwatchFigure([{"fill":"#feedde","showText":false,"width":32,"height":32},{"fill":"#fdd0a2","showText":false,"width":32,"height":32},{"fill":"#fdae6b","showText":false,"width":32,"height":32},{"fill":"#fd8d3c","showText":false,"width":32,"height":32},{"fill":"#f16913","showText":false,"width":32,"height":32},{"fill":"#d94801","showText":false,"width":32,"height":32},{"fill":"#8c2d04","showText":false,"width":32,"height":32}], caption) }}

Using ColorJS we can convert each sRGB swatch from the oranges palette to OKLCH:

```js
import Color from 'https://colorjs.io/dist/color.js';

// the oranges color palette from Color Brewer
const oranges = ['#feedde','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#8c2d04'];

// function that converts a string representation of a color into a ColorJS object
// and converts the input colorspace to the oklch colorspace
const toColorOklch = (colorString) => new Color(colorString).to('oklch');

// first convert our color strings to ColorJS Color objects in the oklch colorspace
const orangesOklch = oranges.map(toColorOklch);

// get oklch string representations of the colors using the Color's display method
const orangesOklchDisplay = orangesOklch.map((color) => color.display());

// inspect the results
console.log(orangesOklchDisplay);
// logs the following:
[
  'oklch(95.56% 0.0272 63.957)',
  'oklch(88.561% 0.07849 67.145)',
  'oklch(81.351% 0.12475 60.007)',
  'oklch(75.205% 0.1635 52.742)',
  'oklch(67.909% 0.18695 45.415)',
  'oklch(59.95% 0.19166 39.006)',
  'oklch(43.57% 0.13654 39.012)'
];
```

<!-- TODO: use a table in addition to or instead of code block above? -->

We can then plot the lightness, chroma, and hue values on separate line graphs to get a sense of how these values change over the oranges color scheme.

<!-- TODO: update charts: add circles for each data point & incorporate theme accent color -->

{% set caption %}
Lightness decreases linearly from swatches one to six, then decreases sharply by 20% at swatch seven.
{% endset %}

{{ lineChartFigure('_includes/components/lineChartLightness.njk', 'Change in Lightness: Oranges', caption)}}

{% set caption %}
Chroma increases steadily by about 0.04 for each swatch until the last swatch where it takes a significant dive by roughly 0.7.
{% endset %}

{{ lineChartFigure('_includes/components/lineChartChroma.njk', 'Change in Chroma: Oranges', caption) }}

{% set caption %}
Hue starts at a value of 64 degrees, increases to 67, then steadily decreases to a value of 39 degrees. There is roughly 28 degrees of variance for the entire color scheme.
{% endset %}

{{ lineChartFigure('_includes/components/lineChartHue.njk', 'Change in Hue: Oranges', caption) }}

The three charts convey the following about the Color Brewer oranges color scheme:

- Lightness steadily declines by about 7% until the last swatch where it declines significantly by about 15%. Decreasing lightness more intensely for the last swatch helps make it stand out as the darkest swatch in the group.
- Chroma increases steadily by about 0.04 for each swatch until the last swatch where it takes a significant dive by roughly 0.7. Reducing the chroma for the last swatch helps it appear darker among the rest of the swatches.
- Hue doesn't remain static, it changes slightly for each of the color scheme's swatches with the exception of the last two swatches. There's roughly 28 degrees of variance for this so-called "single hue" sequential color scheme.

It's almost as if the colors in these swatches had a human touch applied to them... (Sarcasm intended, these color schemes were created by hand AFAIK!)

To get a better idea of how the lightness, chroma, and hue values change for commonly used data visualization color palettes it would be useful to run this analysis on every palette we could get our hands on. That's a bit beyond the scope of this particular blog post, but I think it would be an worthwhile endeavor if we are serious about coming up with an automated method for creating sequential color scheme palettes for use in data visualization.

If doing this I might start with doing a gridded or faceted, small multiples plot of each color as well as running some statistics on the data. Someone smarter then me might even be able to use machine learning with the data to come up with a way to predict what additional colors would be ideal given an input or starting color.

That being said, my goal here is more or less to see if we can get "good enough" results using heuristics in a programmatic way. Doing this analysis certainly helps refine the approach from naively increasing lightness and chroma while keeping the hue a static value.

Other questions I'm curious to answer:

- What about multi-hue color schemes? How might that type of color scheme's heuristics differ from a single hue?
- Ditto for diverging color schemes where a neutral middle color is used and two opposing colors such as red and blue gradually get darker and more saturated when moving away from the middle color
- Could we use the "cool" and "warm" properties of hues in the color wheel to get a sense of how to shift our colors when making them darker?

The following graphics come from the Observable Notebook ["Color palette analysis using OKLCH"][notebook-color-analysis].

## Experiment Four: Improving Color Contrast Using OKLCH

The last experiment's goal was to utilize the OKLCH colorspace for adjusting the color contrast of two colors for accessibility purposes. The Web Content Accessibility Guidelines (WCAG) has success criteria (SC) for color contrast which must be passed to if one is striving to make their website or application conform to WCAG 2.1 or 2.2. The SC states that at a minimum, a text's color must contrast 4.5 to 1 with its background color in order for it to be considered accessible. For graphical objects and user interface components the minimum contrast must be 3 to 1 with the background color. There is also related contrast success criteria for focus indicators (the outline that should appear when using your keyboard to navigate things like forms and links). My thinking was that perhaps the OKLCH colorspace would work better for adjusting color contrast than the HSL or RGB color space since changing lightness in OKLCH is an improvement over HSL.

For this experiment I created an Observable Notebook, [OKLCH Color Contrast Evaluator][notebook-oklch-color-contrast], for analyzing the color contrast of two colors using both the WCAG and APCA color contrast algorithms. This was again made possible via ColorJS since it has the algorithms built in. The text and background colors may be entered via form text inputs and then adjusted using sliders for the lightness, chroma, and hue values from OKLCH. As the values are changed the color contrast is re-evaluated.

## Wrapping Up

I don't know about you but I think using OKLCH for these purposes is pretty friggin cool. While they are simple experiments that stemmed from solving a practical problem, I do think they are promising. I hope that they can help you when it comes to utilizing color in your projects, whether that's for data visualization or other purposes.

In fact, I've used OKLCH here in my website to adjust the theme accent colors in both the light and dark themes for the site. If you're viewing this site on a device that supports HD colors you will be getting a more rich version of these accent colors. I've also used OKLCH to refine the accent color variants so that they are a little more harmonious. Places this shows up in this site are the link colors where visited links have a slightly darker color, and also in the [portfolio page](/work/) for the filter buttons.

For reference, here is the full list of Observable Notebooks of the experiments I mentioned in this article:
- [Color palette analysis with OKLCH][notebook-color-analysis]
- [Creating categorical color palettes with OKLCH][notebook-exploring-oklch]
- [Creating sequential color palettes with OKLCH][notebook-sequential-oklch]
- [Creating more categorical color palettes with OKLCH][notebook-palette-oklch]
- [OKLCH Color Contrast Evaluator][notebook-oklch-color-contrast]

[avoid-equidistant-hsv-colors]: https://www.vis4.net/blog/avoid-equidistant-hsv-colors/
[codepen-detect-p3]: https://codepen.io/clhenrick/pen/LYKjwpE?editors=1100
[color-brewer]: https://colorbrewer2.org/
[colorjs]: https://colorjs.io/
[evil-martians]: https://evilmartians.com
[mastering-multi-hued-color-scales]: https://www.vis4.net/blog/mastering-multi-hued-color-scales/
[mdn-oklch]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
[notebook-color-analysis]: https://observablehq.com/@clhenrick/color-palette-analysis-using-oklch
[notebook-exploring-oklch]: https://observablehq.com/@clhenrick/exploring-oklch-color
[notebook-sequential-oklch]: https://observablehq.com/@clhenrick/sequential-color-palette-genration-using-oklch
[notebook-palette-oklch]: https://observablehq.com/@clhenrick/accent-color-to-palette-using-oklch
[notebook-oklch-color-contrast]: https://observablehq.com/@clhenrick/color-contrast-evaluator?collection=@clhenrick/storymaps
[oklch-in-css]: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
[oklch-picker-converter]: https://oklch.com
