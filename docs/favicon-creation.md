# Favicon Creation

Following guidance from the article [How to Favicon in 2024: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs).

1. Started with basic SVG markup, creating the `public/favicons/circle.svg` file.

2. Use SVGO to compress the SVG:

   ```bash
   npx svgo --multipass circle.svg
   ```

3. Use [ImageMagick](https://imagemagick.org/index.php)'s `convert` utility to convert the SVG file to ico:

   ```bash
   convert -background transparent -format ico -resize 32x32 circle.svg circle.ico
   ```

4. Use `convert` to create the following PNG files:

   ```bash
   convert -background transparent -format png -resize 180x180 circle.svg apple-touch-icon.png
   convert -background transparent -format png -resize 192x192 circle.svg icon-192.png
   convert -background transparent -format png -resize 512x512 circle.svg icon-512.png
   ```

5. Add the `manifest.webmanifest` for Android devices in `public/`

6. Added the necessary markup to the `<head>` of the `base.njk` template file.
