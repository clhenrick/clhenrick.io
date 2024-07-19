# Favicon Creation

Following guidance from the article [How to Favicon in 2024: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs). Inspiration taken from [favicon.io](https://favicon.io/emoji-favicons/) / the [twemoji](https://github.com/twitter/twemoji/tree/master) project on Github.

1. Started with basic SVG markup, creating the `public/favicons/favicon.svg` file. See [this Observable Notebook](https://observablehq.com/d/03b5363b091f4505) for the original SVG markup and for a way to preview and edit the SVG.

2. ~~Use SVGO to compress the SVG:~~ (_NOTE: this seems to mess up the dark theme in the SVG so I avoided doing it_).

   ```bash
   npx svgo --multipass favicon.svg
   ```

3. Use [ImageMagick](https://imagemagick.org/index.php)'s `convert` utility to convert the SVG file to ico:

   ```bash
   convert -background transparent -format ico -resize 32x32 favicon-for-ico.svg favicon.ico
   ```

4. (_NOTE: ImageMagick seems to not like the text in the SVG element, so I ended up using [cloud convert](https://cloudconvert.com/svg-to-ico) for the SVG to PNG conversions instead._) ~~Use `convert` to create the following PNG files:~~

   ```bash
   convert -background transparent -format png -resize 180x180 favicon.svg apple-touch-icon.png
   convert -background transparent -format png -resize 192x192 favicon.svg icon-192.png
   convert -background transparent -format png -resize 512x512 favicon.svg icon-512.png
   ```

5. Add the `manifest.webmanifest` for Android devices in `public/`

6. Added the necessary markup to the `<head>` of the `base.njk` template file.
