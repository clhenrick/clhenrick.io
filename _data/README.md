# Eleventy Global Data

## metadata

Global site metadata:

```js
{
  title: "clhenrick.io",
	url: "",
	language: "en",
	description: "Coming soon...",
	author: {
		name: "Chris Henrick",
		email: "chrishenrick@gmail.com",
		url: ""
	}
}
```

## work_image_thumbnails/

- Referenced as `work_image_thumbnails` in templates

- Used with the short code `dataCascadeImage` (see the `pluginDataCascadeImage` in [`eleventy.config.images.js`](../eleventy.config.images.js).)

These thumbnail images are treated as data files using the Eleventy config's `addDataExtension` and `addShortcode` methods which allows for utilizing the [Eleventy Image plugin](https://www.11ty.dev/docs/plugins/image/) and referencing the images as [global data](https://www.11ty.dev/docs/data-global/). See [process images as data files](https://www.11ty.dev/docs/plugins/image/#process-images-as-data-files) in the Eleventy docs for more.

These thumbnail image files are used in the portfolio (`/work/`) index page for the project card images. This usage of the Eleventy Image optimization plugin method was chosen as Eleventy's async short codes are not compatible with Nunjuck macros (the `image` short code is used elsewhere in the site for optimizing images). The `dataCascadeImage` short code works in a macro as the data is computed at build time.

## work.json

- Referenced as `work` in templates

This data is used:

- in the portfolio index page (`content/work/index.njk`) to create the project cards (see `content/work/index.njk` and `_includes/components/projectCard.njk`)
- to create individual project pages in `/work/[project-name-page]/` (see `content/work/project-page.njk`).
- to create part of the sitemap.xml file (see `content/sitemap.xml.njk`)

An example `work` object looks like:

```json
{
  "title": "Cal-Adapt: Analytics Engine",
  "tags": ["web"],
  "description": "Website visual design and development.",
  "description_long": "Website design was done using [Figma](https://www.figma.com/), mainly for creating basic mocks and a style guide (scroll down to view), the rest of the design process was done using Markdown, HTML, and Sass. The website was built using the [Astro](https://astro.build/) static site generator, which uses the concept of \"partial hydration\" to keep client-side JavaScript to a minimum. CAE Jupyter Notebooks were converted to Markdown using Jupyter's [nbconvert](https://pypi.org/project/nbconvert/) utility, allowing for fast loading and previewing of notebook contents.",
  "tech": [
    "Astro",
    "SvelteJS",
    "TypeScript",
    "Sass",
    "Jupyter Notebooks",
    "NodeJS"
  ],
  "thumb": "cae-website-thumb.jpg",
  "imgs": [
    "cae-website-01.jpg",
    "cae-website-2.jpg",
    "cae-website-3.jpg",
    "cae-website-4.jpg",
    "cae-website-5.jpg",
    "cae-website-6.jpg",
    "cae-website-7.jpg",
    "cae-website-8.jpg",
    "cae-website-9.jpg",
    "cae-website-10.jpg",
    "cae-website-11.jpg",
    "cae-website-12.jpg",
    "cae-website-13.jpg"
  ],
  "size": "width3",
  "date": "2022-04-17",
  "link": "https://analytics.cal-adapt.org"
}
```

> Note that "size" is deprecated / no longer used.
