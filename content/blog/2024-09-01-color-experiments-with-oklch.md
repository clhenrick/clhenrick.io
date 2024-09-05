---
title: "Color experiments with OKLCH"
date: 2024-09-01
updated: 2024-09-04
teaser: "Creating color palettes programmatically and fixing color contrast issues using the OKLCH color space in CSS."
tags:
  - Color
  - CSS
  - Data Visualization
  - Design
  - OKLCH
---

{% from '_includes/components/blog-posts/color-experiments-oklch/colorSwatch.njk' import colorSwatch %}
{% from '_includes/components/blog-posts/color-experiments-oklch/colorSwatchFigure.njk' import colorSwatchFigure %}
{% from '_includes/components/blog-posts/color-experiments-oklch/lineChartFigure.njk' import lineChartFigure %}

## Intro and some background on (OK)LCH

Recently I've been getting to know the *Lightness, Chroma, and Hue* (typically abbreviated as *LCH* or *HCL*) color space by experimenting with using it for programmatically generating custom color palettes for use in data visualization. There is a lot of existing writing on the web about the LCH color space and using it in web design (recommended reading: Lea Verou's [LCH colors in CSS][lch-colors-in-css] and [OKLCH in CSS: why we moved from RGB and HSL][oklch-in-css] by Evil Martians) so I'll try to be brief and only touch on the basics of LCH in this post's introduction.

The "TLDR" is that the LCH color space provides a way to manipulate colors while maintaining lightness that is perceptually similar across different hues. That might not sound like a big deal, but when you consider the implications it has for working with color programmatically, I think it's pretty huge, and it's why I decided to write about it here.

> **Quick fact**: the LCH color space is really the [(CIE)LAB][wikipedia-cielab] color space with two different channels, chroma and hue, that are more intuitive for specifying a color than LAB's "a" and "b" channels. Chroma (which is similar to saturation) and hue are "polar coordinates" of the LAB color space, while "a" and "b" are cartesian coordinates for specifying green - red and blue - yellow respectively. The LCH color space was created to make working with LAB more intuitive and user friendly.

The *"maintains perceptual lightness across hues"* part of the LCH color space is what makes it different than the more commonly used HSL and HSV color spaces. In HSL or HSV when the same lightness value is used with different hues, the resulting colors may look noticeably different in terms of their perceived lightness. In other words, the colors will look lighter or darker depending on their hue even though they share the same lightness value. This is a problem that the LAB and LCH color spaces attempt to solve.

To quickly demonstrate the difference between HSL and LCH here are a couple of different colors defined using HSL and then LCH with the same lightness value applied to them in both color spaces.

Here are the HSL colors:

{% set caption %}
  Two color swatches, blue and magenta, defined using the HSL color space with a shared saturation value of 100% and lightness value of 50%. The blue is noticeably darker than the magenta despite using the same lightness value.
{% endset %}

{{ colorSwatchFigure([{ fill: "hsl(250 100% 50%)", textFill: "#fff" }, { fill: "hsl(300 100% 50%)", textFill: "#333" }], caption) }}

And here are the LCH colors with the same lightness values:

{% set caption %}
  Two color swatches, blue and magenta, defined using the OKLCH color space with a shared chroma value of 0.25 and lightness value of 0.5. The two colors appear to be uniform in terms of their lightness and color richness.
{% endset %}

{{ colorSwatchFigure([{ fill: "oklch(0.5 0.3 270)", textFill: "#fff" }, { fill: "oklch(0.5 0.3 328)", textFill: "#fff" }], caption) }}

The lightness of the two colors doesn't look quite the same in HSL, magenta is clearly brighter than blue with the same lightness value of 50%. However, when we define the same two colors using the LCH color space we get colors that do have the same perceptual amount of lightness.

You may have noticed that the hue values in the LCH swatches were adjusted slightly. Hues don't map evenly between HSL and LCH, so a hue of 300 degrees in HSL will produce a vivid magenta while in LCH 300 is a little more on the violet side.

> **Minor detail**: The use of the CSS `oklch()` function instead of the regular `lch()` function means that we are using an updated version of the LCH color model that contains some corrections to the original. In CSS Color Modules 4 we can use either `oklch` or `lch`, but it seems more reasonable to prefer `oklch` for most use cases in order to benefit from the improved upon implementation.

> **Quick FYI**: The `oklch` function in CSS has a baseline of "newly available", meaning that it is available in all up to date browsers. Even so, it's probably worth using the CSS `@supports` to detect that it's available before using it, especially if you know people viewing your site might be on an older device or browser that isn't up to date.

<!-- TODO: keep this paragraph? It's saying the same thing that was previously mentioned -->
<!-- When researching LCH I was surprised to learn that the LCH color space is similar to the [Lab color space](#)(TODO: link), which I had used previously when creating multi hue color gradients to avoid the dreaded middle gray dead zone that is common when creating linear gradients using RGB and HSL. LCH and Lab use the same color model, while LCH allows for specifying the desired color using polar color coordinates instead of cartesian (TODO: or is it the other way around?). This makes LCH a little more intuitive to use from a designer's perspective. -->

Another benefit of using either the Lab and LCH color spaces is that we gain access additional, "high definition" colors that are outside of the standard Red, Green, and Blue (sRGB) color space. Color gamuts at are new to CSS such as "Display-P3" give us access to twice as many colors as sRGB.

{% set caption %}
Two color swatches for the color orange. The first swatch is in the "P3" color gamut and will appear as a more vibrant orange if your device and browser supports P3. The second swatch is a fallback orange in the sRGB gamut that is compatible with all browsers and devices.
{% endset %}

{{ colorSwatchFigure([{ fill: "oklch(78% 0.2 61)", textFill: "#333" }, { fill: "#ff9500", textFill: "#333" }], caption) }}

Devices with high definition displays, such as retina screens on Apple devices, have support for these colors while older monitors and displays do not. Therefore, it's best to use CSS feature queries to detect if the device supports HD colors and if not provide a fallback color in sRGB. If you don't provide a fallback the browser will do its best to provide one, but it may not be a fallback color you prefer.

[Here's a simple Codepen][codepen-detect-p3] I made that will tell you if your device and browser supports P3 / HD colors. If the two squares are orange, you have P3 available. The left square should look like a more rich or vivid orange compared to the right square. If the first square is black, then your device does not support P3. See the article [Migrate to HD Color Support][migrate-to-hd-color-support] by Chrome for Developers for more on how to support different color spaces in CSS.

When converting an existing color to LCH, the [OKLCH Color Picker and Converter][oklch-picker-converter] by Evil Martians informs you if you are entering P3 territory when adjusting the LCH's channel values. It will helpfully display a second color swatch in a sRGB fallback once you've crossed over into the P3 gamut.

{% set caption %}
The fancy pants OKLCH color picker and converter created by Evil Martians converts various CSS color notation to OKLCH notation and allows for adjusting each of the LCH channels. Each channel contains a graph that helps visualize available options when making adjustments.
{% endset %}

{% figure caption %}
{% image 'oklch-color-picker-01.png', 'Screenshot of the OKLCH color picker tool UI developed by Evil Martians' %}
{% endfigure %}

{% set caption %}
When a color crosses from sRGB to the P3 color gamut, the Evil Martians OKLCH color picker will show two swatches, one in P3 and a fallback in sRGB that is close to the P3 color in terms of chroma.
{% endset %}

{% figure caption %}
{% image 'oklch-color-picker-02.png', 'Screenshot of the OKLCH color picker tool UI developed by Evil Martians showing two color swatches; one in sRGB and one in the P3 gamut' %}
{% endfigure %}

Google Chrome's developer tools' color picker also indicates where the sRGB / P3 color gamut boundary is when you are adjusting a color using `oklch`:

{% set caption %}
Chrome's color picker now features an OKLCH input and visualizes the boundary between sRGB and P3.
{% endset %}

{% figure caption, 'figure-narrow' %}
{% image 'chrome-color-picker-oklch.png', 'Screenshot of Google Chrome\'s developer tools color picker in OKLCH mode', [400, 800, 1200], '(max-width: 400px), calc(100vw - 48px)' %}
{% endfigure %}

Using a color picker or third party library (I highly recommend [ColorJS][colorjs] developed by [Lea Verou](https://lea.verou.me/) and [Chris Lilley](https://svgees.us/)) that detects whether an LCH color is in or out of the RGB gamut are useful tools to have at your disposal when working with LCH and P3 colors. Remember that leaving gamut correction up to the browser may not give you a desirable result, so intentionally choosing an fallback color is a good practice when reaching for P3 colors.

Phew! So much for a short intro. Now that we've covered the background of OKLCH let's move on to the fun stuff... the experiments!

## Experiment One: Create a Categorical Color Palette From a Single Hue

The first thing I tried was creating a categorical color palette from a single hue. Again, because the LCH color model maintains a perceptual level of lightness across hues, my thinking was to keep the chroma and lightness values from our original color swatch while incrementing the hue value by a constant number of degrees to create new colors. When using this method each of our new colors should look similar to our original color because they share the same chroma and lightness.

Starting with a single color, say `#f97f00`, a vibrant orange (which happens to be the accent color for this website's theme in dark mode...

<!-- NOTE: not using colorSwatchFigure because of the use of <code> in <figcaption> -->
<figure class="swatch-container">
  <div>
    {{ colorSwatch("#f97f00", "transparent", false) }}
  </div>
  <figcaption>
    A color swatch of an orange hue with the CSS hex value of <code>f97f00</code>.
  </figcaption>
</figure>

...we can create _n_ more colors by shifting the hue value of the color in `oklch` by 360 / _n_, since in `oklch` the hue value ranges from 0 - 360 degrees. We don't need to worry about our new hue value being exactly in the range of 0 to 360 since anything over 360 will wrap to the equivalent hue. For example a hue value of 400 will wrap to 40 since 400 minus 360 equals 40.

To demonstrate, here is a palette of five colors I created using this technique starting with the original color of `#f97f00`:

{% set caption %}
  A programmatically generated color palette of five colors. Each color shares the same lightness and chroma value, and are equidistant from one another in terms of hue. Such a palette could be suitable for a categorical color scheme for use in data visualization.
{% endset %}

{{ colorSwatchFigure([{"fill":"#f97f00","showText":false,"width":32,"height":32},{"fill":"#89b80c","showText":false,"width":32,"height":32},{"fill":"#00c5ce","showText":false,"width":32,"height":32},{"fill":"#7a9bff","showText":false,"width":32,"height":32},{"fill":"#ef71c5","showText":false,"width":32,"height":32}], caption) }}

What's interesting to me about this is that the end result looks consistent with our starting color. None of the new colors feel out of place, e.g. too dark or too light, when keeping in mind that this palette would be used for a categorical color scheme in a data visualization or thematic map, where the purpose of using color is to differentiate various categories but not emphasize any one category. Since each color shares the same lightness and chroma LCH value, the palette as a whole feels perceptually uniform.

We might reduce the lightness of all colors but one if we want to use one of the palette's colors as an accent color among the group to help it stand out:

{% set caption %}
  The same five color palette as previously shown in terms of hue and chroma, but with all colors reduced to 35% lightness except the second to last swatch. This could be a useful technique for creating a categorical palette where one category is meant to stand out.
{% endset %}

{{ colorSwatchFigure([{"fill":"oklch(35% 0.18116 53.923)","showText":false,"width":32,"height":32},{"fill":"oklch(35% 0.18116 125.92)","showText":false,"width":32,"height":32},{"fill":"oklch(35% 0.18116 197.92)","showText":false,"width":32,"height":32},{"fill":"oklch(75% 0.18116 269.92)","showText":false,"width":32,"height":32},{"fill":"oklch(35% 0.18116 341.92)","showText":false,"width":32,"height":32}], caption, false) }}

If you're reading this and you've previously studied color theory and/or are familiar with different types of common color schemes such as complementary, triadic, or analogous, then you're probably getting some ideas on how OKLCH could be used to programmatically create other types of color schemes by keeping the same chroma and lightness values while shifting the hue value for a single color.

The drawback of this approach is that as the number of swatches increases, the palette's colors may end up looking too similar in terms of hue. As such viewers might have difficulty in distinguishing individual swatches. This approach is by no means accessible in terms of being color blind friendly. Even with these caveats, this approach could be a good starting point where a designer could make adjustments to each color as needed depending on the use case of the palette.

Try interacting with the [Observable Notebook "Exploring OKLCH Color"][notebook-exploring-oklch] to experiment with this approach on your own.

## Experiment Two: Create a Sequential Color Palette From a Single Hue

Sequential color palettes used for data visualization start with a very light and desaturated color and gradually move towards a dark and more saturated ending color, or vice versa. These types of color palettes are commonly used to visually convey quantitative data, such as population density in a thematic map. Using the LCH color space we can again programmatically generate a palette from an input hue. For this approach we will keep the same hue in each of the palette's color swatches while adjusting the lightness and chroma.

We will start with a different color, the blue that is used for this website's theme accent color in light mode, `#0055a9`:

<!-- NOTE: not using colorSwatchFigure because of the use of <code> in <figcaption> -->
<figure class="swatch-container">
  <div>
    {{ colorSwatch("#0055a9", "transparent", false) }}
  </div>
  <figcaption>
    A color swatch of a blue hue with the CSS hex value of <code>0055a9</code>.
  </figcaption>
</figure>

We can create a palette of _n_ colors by adjusting the lightness value of `oklch`. First we decide what the highest amount of lightness we want for the starting color should be, say 95%, and what the lowest amount of lightness we want for the last color should be, say 40%. Then based on the value of _n_ we create the middle colors by incrementally adjusting the lightness value while keeping the hue value the same.

We also adjust the chroma value to help emphasize the change across the palette. Conversely to lightness we start with a *minimum level* of chroma, perhaps `0.04`, for the lightest color and determine the *maximum value* for the darkest color, perhaps `0.15`. We adjust the middle colors based on our _n_ value.

For computing the lightness and chroma values between the starting and ending color swatches I found it helpful to use [D3JS's linear scales](https://d3js.org/d3-scale/linear) which makes it easy to interpolate between two values.

The result is as follows:

{% set caption %}
A five color sequential, single hue color palette generated from a single input color. Hue remains static while lightness decreases and chroma increases linearly from the lightest to darkest color.
{% endset %}

{{ colorSwatchFigure([{"fill":"#ddf0ff","showText":false,"width":32,"height":32},{"fill":"#a6c4ec","showText":false,"width":32,"height":32},{"fill":"#7199ce","showText":false,"width":32,"height":32},{"fill":"#3c6faf","showText":false,"width":32,"height":32},{"fill":"#004590","showText":false,"width":32,"height":32}], caption)}}

If instead of using linear interpolation we use exponential interpolation we get a slightly different result:

{% set caption %}
A five color sequential, single hue color palette generated from a single input color. Hue remains static while lightness decreases and chroma increases exponentially from the lightest to darkest color.
{% endset %}

{{ colorSwatchFigure([{"fill":"#ddf0ff","showText":false,"width":32,"height":32},{"fill":"#c8e0fe","showText":false,"width":32,"height":32},{"fill":"#9abae5","showText":false,"width":32,"height":32},{"fill":"#5986c0","showText":false,"width":32,"height":32},{"fill":"#004590","showText":false,"width":32,"height":32}], caption) }}

If you ask me, these results aren't too shabby considering they were programmatically generated using some simple heuristics. The process could certainly be refined and we could even look to popular color palettes used for data visualization such as those from [Color Brewer](https://colorbrewer2.org/) or [d3-scale-chromatic](https://d3js.org/d3-scale-chromatic) for inspiration and improving our heuristics.

Try experimenting with the Observable Notebook [Creating sequential color palettes with OKLCH][notebook-sequential-oklch] to get a better sense of this approach.

## Experiment Three: Analyzing Color Brewer Palettes using OKLCH

What if instead of creating new colors using OKLCH we used it to analyze popular color palettes, such as those used in data visualization? Using a JavaScript library such as [ColorJS][colorjs] we can convert the sRGB version of each swatch to OKLCH and then analyze the lightness, chroma, and hue values of the entire palette. This might be an interesting way to dissect different types of color palettes, which could help inform how we create our own color sequential palettes on the fly.

Let's take a sequential, single hue color scheme from the [Color Brewer][color-brewer] color scheme library to try this out with. I'm obviously partial to orange, so I've chosen the "oranges" color scheme with seven discrete colors. I chose seven colors instead of five like in the previous palettes since it will give us more granular data to analyze.

```js
const oranges = ['#feedde','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#8c2d04'];
```

{% set caption %}
Seven color swatches belonging to the "oranges" sequential color scheme from the Color Brewer color scheme library. Color Brewer was developed by Cynthia Brewer and Mark Harrower at Pennsylvania State University.
{% endset %}

{{ colorSwatchFigure([{"fill":"#feedde","showText":false,"width":32,"height":32},{"fill":"#fdd0a2","showText":false,"width":32,"height":32},{"fill":"#fdae6b","showText":false,"width":32,"height":32},{"fill":"#fd8d3c","showText":false,"width":32,"height":32},{"fill":"#f16913","showText":false,"width":32,"height":32},{"fill":"#d94801","showText":false,"width":32,"height":32},{"fill":"#8c2d04","showText":false,"width":32,"height":32}], caption) }}

Using ColorJS we convert each sRGB swatch from the Color Brewer oranges palette to OKLCH:

```js
import Color from 'https://colorjs.io/dist/color.js';

// the oranges color palette from Color Brewer
const oranges = [
  '#feedde',
  '#fdd0a2',
  '#fdae6b',
  '#fd8d3c',
  '#f16913',
  '#d94801',
  '#8c2d04'
];

// function that 1. converts a string representation of a color into a ColorJS object
// and 2. converts the input colorspace to the oklch colorspace
const toColorOklch = (colorString) => new Color(colorString).to('oklch');

// first convert our color strings to ColorJS Color objects in the oklch colorspace
const orangesOklch = oranges.map(toColorOklch);

// get CSS oklch string representations of the colors
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

<!-- Here are the oranges color palette's LCH values formatted as a table: -->

<!-- TODO: add table styles -->
<!-- | Lightness | Chroma | Hue |
| --- | --- | --- |
|0.99 | 0.04 | 107.11|
|0.92 | 0.08 | 81.68|
|0.85 | 0.11 | 62.40|
|0.78 | 0.14 | 43.06|
|0.70 | 0.16 | 29.80|
|0.63 | 0.18 | 21.71|
|0.56 | 0.19 | 19.18|
|0.48 | 0.18 | 21.64|
|0.40 | 0.16 | 29.23| -->

We can then plot the lightness, chroma, and hue values on separate line charts to get a sense of how these values change over the oranges color scheme.

<!-- TODO: update charts: add circles for each data point & incorporate theme accent color -->

{% set caption %}
Lightness decreases relatively consistently from a value of 96% in swatch one to 60% in swatch six, then decreases sharply to 44% at swatch seven.
{% endset %}

{{ lineChartFigure('_includes/components/blog-posts/color-experiments-oklch/lineChartLightness.njk', 'Change in Lightness: Oranges', caption)}}

{% set caption %}
Chroma increases steadily from a starting value of 0.03 by about 0.04 for each swatch to 0.19 until the last swatch where it takes a significant dive to 0.14.
{% endset %}

{{ lineChartFigure('_includes/components/blog-posts/color-experiments-oklch/lineChartChroma.njk', 'Change in Chroma: Oranges', caption) }}

{% set caption %}
Hue starts at a value of 64 degrees, increases to 67 degrees at swatch two, then steadily decreases to a value of 39 degrees for the last two swatches.
{% endset %}

{{ lineChartFigure('_includes/components/blog-posts/color-experiments-oklch/lineChartHue.njk', 'Change in Hue: Oranges', caption) }}

The three charts convey the following about the Color Brewer oranges color scheme:

- Lightness steadily declines by about 7% until the last swatch where it declines significantly by about 16%. Decreasing lightness more intensely for the last swatch helps make it stand out as the darkest swatch in the group.

- Chroma increases steadily by about 0.04 for each swatch until the last swatch where it takes a significant dive by roughly 0.06. Reducing the chroma for the last swatch helps it appear darker among the rest of the swatches.

- Although the Color Brewer oranges color scheme is referred to as a "single hue" sequential color scheme, hue doesn't remain static! It changes slightly for each of the color scheme's swatches with the exception of the last two swatches. There's roughly 28 degrees of variance across the palette which we might not immediately perceive with our eyes only.

It's almost as if the colors in these swatches had a human touch applied to them... (Sarcasm intended).

To get a better idea of how the lightness, chroma, and hue values change for commonly used data visualization color palettes it would be useful to run this analysis on every palette we could get our hands on. That's a bit beyond the scope of this blog post, but I think it would be a worthwhile endeavor if we are serious about coming up with an automated method for creating sequential color scheme palettes for use in data visualization.

If doing this sort of broad analysis I might start with doing a gridded / faceted, small multiples plot of each color as well as running some statistics on the data. Someone smarter then me might even be able to use machine learning with the data to come up with a way to predict what lightness, chroma, and hue values would be ideal given an input color.

That being said, my goal here is more or less to see if we can get "good enough" results using heuristics in a programmatic way. Doing this analysis certainly helps refine the approach from naively increasing lightness and chroma while keeping the hue a static value.

Other questions I'm curious to answer:

- What about multi-hue color schemes? How might that type of color scheme's heuristics differ from a single hue?

- Ditto for diverging color schemes where a neutral middle color is used and two opposing colors such as red and blue gradually get darker and more saturated when moving away from the middle color

- Could we use the "cool" and "warm" properties of hues in the color wheel to get a sense of how to shift our colors when making them darker?

If you'd like to play around with this experiment, you may try interacting with the Observable Notebook ["Color palette analysis using OKLCH"][notebook-color-analysis]. You can copy and paste a color palette of your choosing and view its corresponding lightness, chroma, and hue line charts.

## Experiment Four: Improving Color Contrast Using OKLCH

The last experiment's goal was to utilize the OKLCH colorspace for adjusting the color contrast of two colors for accessibility purposes. The [Web Content Accessibility Guidelines][wcag-overview] (WCAG) has Success Criteria (SC) for [color contrast][wcag-sc-1-4-3] which must be passed if one is striving to make their website or application conform to WCAG. The SC states that at a minimum, a text's color must contrast 4.5 to 1 with its background color in order for it to be considered accessible. For graphical objects and user interface components the minimum contrast must be 3 to 1 with the background color. There is also related contrast success criteria for focus indicators, [SC 1.4.11][wcag-sc-1-4-11] and [SC 2.4.13][wcag-sc-2-4-13], which require a minimum 3 to 1 color contrast betwen a the focus indicator color and its background color.

> **Jargon explainer**: A "focus indicator" is the visual outline that appears to indicate something has focus, such as when using your keyboard to navigate interactive user interface elements like buttons, form fields, and links. It is a very important part of making a website or application accessible as it helps people interact with the page who cannot use a mouse.

My thinking was that perhaps the OKLCH color space would work better for adjusting color contrast than the HSL color space since changing lightness in OKLCH is an improvement over HSL.

For this experiment I created an Observable Notebook, [OKLCH Color Contrast Evaluator][notebook-oklch-color-contrast], for analyzing the color contrast of two colors using both the WCAG and APCA color contrast algorithms. This was again made possible via ColorJS since it has the two color contrast algorithms built in (plus a few others). The text and background colors may be entered via form text inputs and then adjusted using sliders for the lightness, chroma, and hue values from OKLCH. As the values are changed the color contrast is re-evaluated.

{% set caption %}
Screenshot of the OKLCH color contrast evaluator Observable notebook showing color contrast results for two colors. Each color has lightness, chroma, and hue sliders for adjusting the color. The colors are previewed using the text "The Quick Brown Fox Jumps Over the Lazy Dog". The notebook indicates whether the color contrast value for the two colors passes WCAG and APCA minimum contrast requirements.
{% endset %}

{% figure caption %}
{% image 'oklch-color-contrast-evaluator.png', 'Screenshot of the OKLCH color contrast evaluator Observable notebook' %}
{% endfigure %}

Fixing color contrast using this approach is very straightforward: use either of the input color's lightness slider to modify the lightness variance between the two colors. From my experience with this approach a difference in 40% lightness between two colors of any hue is enough to reach the minimum color contrast requirements for WCAG. The other benefit, since we are using the LCH color space, is that the adjusted color(s) won't look too different from their original color(s) if lightness is only modified slightly.

Here is an example of a color swatch pair that fails the WCAG SC for minimum text and background color contrast:

{{ colorSwatchFigure([{"fill":"#F58069"},{"fill":"#144C70", textFill: "#fff"}], 'Two color swatches, a light red (#f58069) and dark blue (#144C70), with a WCAG color contrast ratio of 3.56 to 1.') }}

By increasing the first color's lightness and decreasing the second color's lightness, we fix the color contrast issue:

{{ colorSwatchFigure([{"fill":"#ff8a72"},{"fill":"#094163", textFill: "#fff"}], 'Two color swatches, a light red (#ff8a72) and dark blue (#094163), with a WCAG color contrast ratio of 4.69 to 1.') }}

Adjusting the colors using OKCLH results in our new colors looking fairly similar to the original colors. To be honest, when making very small adjustments like this I'm not entirely sure that the LCH color space has a huge advantage over HSL, so you might want to try using either color space to see which result you prefer. I'll also admit that I'm not the first to think of using LCH for this purpose, Eugene Fedorenko wrote about it back in 2021 in the post [Accessible Palette: stop using HSL for color systems][accessible-color-palette-stop-using-hsl].

> It's worth remembering that the minimum color contrast ratio of 4.5 to 1 is *the bare minimum* color contrast ratio for text to be considered accessible according to WCAG. A ratio of 7 to 1 is required for "triple A" (AAA) conformance and will make text more accessible to a wider segment of the population. Remember that *conformance* doesn't necessarily mean *usable* when it comes to WCAG and accessibility, and that we should always strive to make things as usable to the widest range of people as possible.

I'm considering porting the Observable notebook code into a stand alone Svelte web app to make this a more user friendly and easy to find tool. The other color contrast tools I've come across on the web don't use the LCH color space for adjusting color contrast, so it seems like an opportunity for an improved color contrast evaluator and fixer tool.

## Wrapping Up

I don't know about you but I think using OKLCH for these purposes is pretty neat, if not at least nerdy. While they are simple experiments that don't go too in depth, I do think they are promising for solving some practical problems relating to color in data visualization and web accessibility. I hope that these experiments help you when it comes to utilizing color in your projects, whether that's for data visualization or other purposes.

In fact, I've used OKLCH here in my website to adjust the theme accent colors in both the light and dark themes for the site. If you're viewing this site on a device that supports HD colors you will be getting a more rich version of these accent colors in the P3 color gamut. I've also used OKLCH to refine the accent color variants so that they are a little more harmonious. Places this shows up in this site are the link colors where visited links have a slightly darker color, and also in the [portfolio page](/work/) for the projects filter buttons.

For reference, here is the full list of Observable Notebooks of the experiments I mentioned in this article:

- [Creating categorical color palettes with OKLCH][notebook-exploring-oklch]
- [Creating sequential color palettes with OKLCH][notebook-sequential-oklch]
- [Color palette analysis with OKLCH][notebook-color-analysis]
- [OKLCH Color Contrast Evaluator][notebook-oklch-color-contrast]

Please don't hesitate to reach out to me if you have any questions or comments, and thanks for reading!

[accessible-color-palette-stop-using-hsl]: https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems
[avoid-equidistant-hsv-colors]: https://www.vis4.net/blog/avoid-equidistant-hsv-colors/
[codepen-detect-p3]: https://codepen.io/clhenrick/pen/LYKjwpE?editors=1100
[color-brewer]: https://colorbrewer2.org/
[colorjs]: https://colorjs.io/
[evil-martians]: https://evilmartians.com
[lch-colors-in-css]: https://lea.verou.me/blog/2020/04/lch-colors-in-css-what-why-and-how/
[mastering-multi-hued-color-scales]: https://www.vis4.net/blog/mastering-multi-hued-color-scales/
[migrate-to-hd-color-support]: https://developer.chrome.com/docs/css-ui/migrate-hd-color
[mdn-oklch]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
[notebook-color-analysis]: https://observablehq.com/@clhenrick/color-palette-analysis-using-oklch
[notebook-exploring-oklch]: https://observablehq.com/@clhenrick/exploring-oklch-color
[notebook-sequential-oklch]: https://observablehq.com/@clhenrick/sequential-color-palette-genration-using-oklch
[notebook-palette-oklch]: https://observablehq.com/@clhenrick/accent-color-to-palette-using-oklch
[notebook-oklch-color-contrast]: https://observablehq.com/@clhenrick/color-contrast-evaluator?collection=@clhenrick/storymaps
[oklch-in-css]: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
[oklch-picker-converter]: https://oklch.com
[wcag-overview]: https://www.w3.org/WAI/standards-guidelines/wcag/
[wcag-sc-1-4-3]: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
[wcag-sc-1-4-11]: https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
[wcag-sc-2-4-13]: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
[wikipedia-cielab]: https://en.wikipedia.org/wiki/CIELAB_color_space
[wikipedia-hcl]: https://en.wikipedia.org/wiki/HCL_color_space
