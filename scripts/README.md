# Helper Scripts

Node.js scripts that are useful for automating tasks related to the development of this website. The following scripts make use of the [`zx`](https://google.github.io/zx/) library for simplifying the process of shell scripting with Node.js.

## find-and-replace-md-img-tags

Example usage:

```bash
yarn find-and-replace-md-img-tags --file=relative/path/to/file.md
```

This script may be used to do a find and replace of markdown image syntax with a Nunjucks `image` shortcode.

For example, the following markdown:

```md
![my image alt text](/path/to/my-image.jpg)
```

would be replaced with the image shortcode:

```
{% image 'my-image.jpg', 'my image alt text' %}
```

## optimize-images

Example usage:

```bash
# single image
yarn optimize-images --path=relative/path/to/images/

# image directory
yarn optimize-images --dir-path=relative/path/to/images_directory/

# glob pattern matching
yarn optimize-images --pattern='**/images/*.jpg'

# pass desired output widths and image formats
yarn optimize-images --path=relative/path/to/images/ --widths='[auto, 300]' --formats='[.webp,.jpg,.png]'

# perform a "dry-run" (no write) and use the image's file name instead of a hash
yarn optimize-images --pattern='**/images/*.jpg' --dry-run --use-file-name
```

This script may be used to run the [Eleventy Image plugin (`@11ty/eleventy-img`)](https://www.11ty.dev/docs/plugins/image/) on one or more arbitrary image files. The script will log the "stats" data for each image processed which is a result of calling the default function export of the npm `@11ty/eleventy-img` module.

**NOTE:** Currently this script is not being used for anything related to the Eleventy build process, but it is helpful for testing the plugin prior to using it in the project. To run the script in a "dry run" to avoid writing files mode pass the `--dry-run` flag.