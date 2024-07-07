# Responsive Images

Responsive images are created using the [Eleventy Image Plugin](https://www.11ty.dev/docs/plugins/image/) and a corresponding `image` ["shortcode"](https://www.11ty.dev/docs/shortcodes/). The shortcode allows for passing in the image file name, alt text, array of desired image widths, and a [`sizes`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) attribute value. The Eleventy Image Plugin then will create the corresponding images for each width in both WebP and JPEG image formats from the original source image. The plugin injects the necessary HTML needed to use the images (e.g. the `<picture>`, `<source>`, and `<img>` tags) where the `image` shortcode is used.

One exception to this is the homepage's banner image where custom markup has been used in place of the `image` shortcode. This was to utilized "art direction" media queries to load different images in light and dark modes. These images were generated using the [`optimize-images.js`](../scripts/optimize-images.mjs) script, which also uses the Eleventy Image plugin. For more info see the [Homepage Banner Image Workflow docs](./homepage-banner-image-workflow.md).

Note that most of the images in this website were created years ago prior to utilizing modern responsive image sizing techniques. As such not all image widths (most likely the larger 1704 and 2464 sizes) may be created if the source image is smaller than the desired output width. For example, if the source image is only 1600px wide and a desired output size of 1700px is passed, then the output image size will likely only be 1600px.

See [`constants.js`](../_data/constants.js) for where the shared array of image widths and `sizes` strings are defined.

See [`eleventy.config.images.js`](../eleventy.config.images.js) for how the Eleventy Image Plugin is configured for use as a shortcode.

## Image widths breakdown

The following image widths are used, depending on the page layout ("normal" or "wide").

| width (px) | layout | pixel density |
| --- | --- | --- |
| 450 | mobile portrait image | 1x |
| 900 | mobile portrait image | 2x |
| 852 | desktop normal layout | 1x |
| 1704 | desktop normal layout | 2x |
| 1232 | desktop wide layout | 1x |
| 2464 | desktop wide layout | 2x |

## Image sizes breakdown:

The following `sizes` values are used, depending on the page layout ("normal" or "wide").

| layout | media query | image size | fallback |
| --- | --- | --- | --- |
| normal | min-width: 852px | 852px | calc(100vw - 48px)\* |
| wide | min-width: 1232px | 1232px | calc(100vw - 48px)\* |

\* _fallback = 100% viewport width minus right and left padding_
