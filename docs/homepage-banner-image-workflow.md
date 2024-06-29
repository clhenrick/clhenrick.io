# Homepage banner image workflow notes

## TL;DR

Describes how the banner / hero images and their corresponding HTML markup in `content/index.njk` were created.

## Steps

> NOTE: Original images are located in Dropbox in `/projects/portfolio-website/images/` as `oakland-map-light.png` and `oakland-map-dark.png`.

1. Ran the `optimize-images` script as follows on a dry run to generate metadata:

```bash
npm run optimize-images -- --file-path='./oakland-map-light.png' --formats="webp,jpg" --widths="450,900,1300,1800,2600,3600" --use-file-name="true" --dry-run="true"

npm run optimize-images -- --file-path='./oakland-map-dark.png' --formats="webp,jpg" --widths="450,900,1300,1800,2600,3600" --use-file-name="true" --dry-run="true"
```

> NOTE: the `--widths` value was chosen based roughly on common device widths and their 2x equivalent values for high resolution displays.

2. Used [Observable Notebook](https://observablehq.com/d/7b09eeca0f2b415e) to turn metadata into HTML markup for loading the images.

  - first you must remove the `<Buffer...` code from the JSON output by the script
  - then copy and paste that code into the notebook

3. Re-ran the `optimize-images` script to create the actual images which are output in `./img`:

```bash
npm run optimize-images -- --file-path='public/img/oakland-map-light.png' --formats="webp,jpg" --widths="450,900,1300,1800,2600,3600" --use-file-name="true"

npm run optimize-images -- --file-path='public/img/oakland-map-dark.png' --formats="webp,jpg" --widths="450,900,1300,1800,2600,3600" --use-file-name="true"
```

4. Copied the output images to `public/img`
5. Copied HTML markup from the Observable notebook into `content/index.njk`

> NOTE: after copying the images to `public/img` you may need to restart the eleventy server.

6. Check the HTML markup using the [responsive image linter bookmarklet](https://ausi.github.io/respimagelint/). (_I did get errors about image sizes but didn't quite understand why or if it was taking into consideration high resolution displays_).
