# Responsive Images

Responsive images are created using the [Eleventy Image Plugin](https://www.11ty.dev/docs/plugins/image/) and a corresponding `image` ["shortcode"](https://www.11ty.dev/docs/shortcodes/). The shortcode allows for passing in the image file name, alt text, array of desired image widths, and a [`sizes`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) attribute value. The Eleventy Image Plugin then will create the corresponding images for each width in both WebP and JPEG image formats from the original source image. The plugin injects the necessary HTML needed to use the images (e.g. the `<picture>`, `<source>`, and `<img>` tags) where the `image` shortcode is used.

Note that when used in a markdown file such as a blog post, the `image` shortcode can be used within another HTML tag (such as the `<figure>` element) and the output HTML will be valid.

```nunjucks
<figure>
  {% image 'observable_embed_example.jpg', 'A screenshot of an embedded Observable Notebook for a user research study' %}
  <figcaption>Another example of a non-vertical layout using embedded cells from an Observable Notebook.</figcaption>
</figure>
```

That markup generates the following HTML (usually inlined with whitespace removed, but expanded here for readability):

```html
<figure>
  <picture>
    <source
      type="image/webp"
      srcset="/img/observable_embed_example-450w.webp 450w, /img/observable_embed_example-900w.webp 900w, /img/observable_embed_example-1282w.webp 1282w, /img/observable_embed_example-1600w.webp 1600w"
      sizes="100vw">
    <source
      type="image/jpeg"
      srcset="/img/observable_embed_example-450w.jpeg 450w, /img/observable_embed_example-900w.jpeg 900w, /img/observable_embed_example-1282w.jpeg 1282w, /img/observable_embed_example-1600w.jpeg 1600w"
      sizes="100vw">
    <img
      alt="A screenshot of an embedded Observable Notebook for a user research study"
      loading="lazy"
      decoding="async"
      src="/img/observable_embed_example-450w.jpeg"
      width="1600"
      height="794">
  </picture>
  <figcaption>
    Another example of a non-vertical layout using embedded cells from an Observable Notebook.
  </figcaption>
</figure>
```

Note that the `image` shortcode is currently not used everywhere images are rendered in the site. Reasons for this are that currently the shortcode as configured does not handle processing certain file types such as animated GIFs and that the markup created by calling `eleventyImage.generateHTML()` may not be suitable for every image requirement (although the [markup may be customized](https://www.11ty.dev/docs/plugins/image/#make-your-own-markup)).

One example is the homepage's banner image where custom markup has been used in place of the `image` shortcode's `eleventyImage.generateHTML()`. This was to utilized "art direction" media queries to load different images in light and dark modes. These images were generated using the [`optimize-images.js`](../scripts/optimize-images.mjs) script, which also uses the Eleventy Image plugin. For more info see the [Homepage Banner Image Workflow docs](./homepage-banner-image-workflow.md).

The portfolio's index page ([`/work/index.njk`](../content/work/index.njk)) uses the [images as data files strategy](https://www.11ty.dev/docs/plugins/image/#process-images-as-data-files) so that the Eleventy Image Plugin can be used with a Nunjucks Macro that creates the project card markup. This stragey was chosen because [async shortcodes are not supported by Nunjucks Macros](https://mozilla.github.io/nunjucks/templating.html#macro) and at the time of writing the code it seemed easier to use the "images as data files" strategy then to create a duplicate, syncronous version of the `image` shortcode.

> Eventually an [Eleventy Transform](https://www.11ty.dev/docs/plugins/image/#eleventy-transform) could be used for all images in the website, but this requires using Eleventy v3 and the Image Plugin v4.

Note that most of the images in this website were created years ago prior to utilizing modern responsive image sizing techniques. As such not all image widths (most likely the larger `1704` and `2464` sizes) may be created if the source image is smaller than the desired output width. For example, if the source image is only 1600px wide and a desired output size of 1700px is passed, then the output image size will be 1600px not 1700px.

See [`constants.js`](../_data/constants.js) for where the shared array of image widths and `sizes` strings are defined.

See [`eleventy.config.images.js`](../eleventy.config.images.js) for how the Eleventy Image Plugin is configured for use as a shortcode.

## Image widths breakdown

The following image widths (in pixels) are used, depending on the page layout ("normal" or "wide").

| width (px) | layout | pixel density |
| --- | --- | --- |
| 450 | mobile portrait image | 1x |
| 900 | mobile portrait image | 2x |
| 852 | desktop normal layout | 1x |
| 1704 | desktop normal layout | 2x |
| 1232 | desktop wide layout | 1x |
| 2464 | desktop wide layout | 2x |

## Image sizes breakdown:

The following HTML `sizes` attribute values are used, depending on the page layout ("normal" or "wide").

| layout | media query | image size | fallback |
| --- | --- | --- | --- |
| normal | min-width: 852px | 852px | calc(100vw - 48px)\* |
| wide | min-width: 1232px | 1232px | calc(100vw - 48px)\* |

\* _fallback = 100% viewport width minus right and left padding_
