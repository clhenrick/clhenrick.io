# Eleventy Global Data

## constants

Shared constants used to avoid repeating the same values over and over again. Currently this consists of:

### images

Image widths arrays and sizes strings used with the Eleventy Image Plugin and its corresponding `image` shortcode. See [docs/responsive-images](../docs/responsive-images.md) for more info.

## metadata

Global site metadata including the site's `title`, `description`, `url`, `language`, etc.

The current NodeJS environment may be referenced from here, e.g.:

```nunjucks
{% if metadata.environment === "production" %}
  we're in production!
{% else %}
  we're in develop!
{% endif %}
```

Various social media and their corresponding URLs are available via `socialLinks`, an ES6 Map which can be iterated via Nunjucks `for` (see `footer.njk`) or used to retrieve a single URL, e.g.

```js
metadata.socialLinks.get("Mastodon");
// returns "https://indieweb.social/@clhenrick"
```

The `socialHandles` Map is similar but returns just the handle for a social media:

```js
metadata.socialHandles.get("Mastodon");
// returns "@clhenrick@indieweb.social
```

## work_image_thumbnails/

- Referenced as `work_image_thumbnails` in templates

- Used with the short code `dataCascadeImage` (see the `pluginDataCascadeImage` in [`eleventy.config.images.js`](../eleventy.config.images.js).)

These thumbnail images are treated as data files using the Eleventy config's `addDataExtension` and `addShortcode` methods which allows for utilizing the [Eleventy Image plugin](https://www.11ty.dev/docs/plugins/image/) and referencing the images as [global data](https://www.11ty.dev/docs/data-global/). See [process images as data files](https://www.11ty.dev/docs/plugins/image/#process-images-as-data-files) in the Eleventy docs for more.

These thumbnail image files are used in the portfolio (`/work/`) index page for the project card images. This usage of the Eleventy Image optimization plugin method was chosen as Eleventy's async short codes are not compatible with Nunjuck macros (the `image` short code is used elsewhere in the site for optimizing images). The `dataCascadeImage` short code works in a macro as the data is computed at build time.

## work.yaml

Portfolio projects data, referenced as `work` in all templates.

This data is used:

- in the portfolio index page (`content/work/index.njk`) to create the project cards. See `content/work/index.njk` and `_includes/components/projectCard.njk`

- to create individual project pages (`/work/[project-name-page]/index.html`). See `content/work/project-page.njk`

- to create part of the `sitemap.xml` file, see `content/sitemap.xml.njk`

An example `work` project entry looks like:

```yaml
# required project title, used to create the slug for the corresponding project page, e.g. `/work/graffiti-rat-sightings-and-wifi-hotspots/index.html`
- title: Graffiti, Rat Sightings, and Wifi Hotspots

  # required project tags, consisting of one or more of: "web", "cartography", "data-viz"
  tags:
    - web
    - cartography

  # required short description that shows up in project cards and the top of project pages, markdown supported
  description: >-
    A not so serious map of graffiti, rat sightings, and wi-fi hotspots in NYC.

  # optional long description for project pages, markdown supported
  description_long: >-
    A random juxtaposition of graffiti, rat sightings, and wi-fi hotspots, inspired by Stamen's [Trees-Cabs-Crime](https://stamen.com/trees-cabs-crime-in-the-venice-biennale-968ea4983177/). Created using public data from New York City's [open data portal](https://opendata.cityofnewyork.us).

  # required thumbnail image file name, used for project cards
  thumb: graffiti-rats-wifi-thumb.jpg

  # optional: one or more screenshot images
  imgs:
    - nyc-rats-graffiti-wifi.jpg

  # optional: one or more image alt text, corresponds to same array index as `imgs`
  imgsAlt:
    - A map of New York City showing the locations of public wi-fi hotspots, graffiti, and rat sightings. Each location is represented by a colored circle that when overlapped with one another blend together. Rat sightings appear to be concentrated in central Brooklyn and The Bronx, wifi hotspots in lower Manhattan, and graffiti is dense in Manhattan's Lower East Side.

  # optional video properties for projects that have an associated external video, rendered as an iframe
  video:
    # url of the video
    url: https://vimeo.com/89143409
    # embed url
    embed: https://player.vimeo.com/video/89143409?autoplay=1
    # video thumbnail image
    thumb: coast-2-coast.jpg
    # alt text for video thumbnail image
    alt: Screen recording of From Coast to Coast

  # technologies used for creating the project
  tech:
    - TileMill
    - CartoCSS
    - QGIS
    - MapBox

  # approximate date of when the project was completed or published
  date: "2013-11-01"
```
