module.exports = {
  // shared config options used by the 11ty image plugin shortcode
  IMAGE_WIDTHS_WIDE_PAGE_LAYOUT: [450, 900, 1232, 2464],
  IMAGE_WIDTHS_NORMAL_PAGE_LAYOUT: [450, 900, 852, 1704],
  IMAGE_SIZES_WIDE_PAGE_LAYOUT:
    "(min-width: 1232px) 1232px, calc(100vw - 48px)",
  IMAGE_SIZES_NORMAL_PAGE_LAYOUT:
    "(min-width: 852px) 852px, calc(100vw - 48px)",
};
