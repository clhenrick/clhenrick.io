import path from "path";

/** @type {object} global site metadata */
export default {
  /** @type {string} site root URL */
  url: "https://clhenrick.io/",

  /** @type {string} site domain name */
  get domainName() {
    return path.basename(this.url);
  },

  /** @type {string} site title used through out various pages */
  get title() {
    return this.domainName;
  },

  /** @type {string} banner image used for home page and default og meta tag in head */
  get titleImage() {
    return path.join("img", "oakland-map-dark-1800w.webp");
  },

  /** @type {string} alt text for banner image */
  titleImageAlt:
    "A geographic map of the city of Oakland, California, centered on downtown. The map's extent spans the San Francisco Bay to the west, the cities of Berkeley and Emeryville to the north, the Oakland hills to the east, and the city of Alameda to the south. The map depicts the road networks and names of various cities and neighborhoods, predominantly in the East Bay area. It includes a topographic shaded relief rendering of the rugged Oakland hills.",

  /** @type {string} mime type of banner image */
  titleImageType: "image/webp",

  /** @type {string} open graph logo image */
  get logoImage() {
    return path.join("favicon", "apple-touch-icon.png");
  },

  /** @type {string} site webmention.io URL */
  get webmentionUrl() {
    return new URL(`${this.domainName}/webmention`, "https://webmention.io")
      .href;
  },

  /** @type {string} site language code */
  language: "en",

  /** @type {string} site description used in head meta tags and RSS */
  description:
    "The website, blog, and portfolio of Chris L Henrick, front-end web developer and design engineer.",

  /** @type {"production" | "development"} nodejs env setting */
  environment: process.env.NODE_ENV,

  /** site github repository URL */
  githubRepository: "https://github.com/clhenrick/clhenrick.io",

  /** @type {{ name: string; email: string; url: string; }} site author metadata */
  author: {
    name: "Chris Henrick",
    email: "chrishenrick@gmail.com",
    url: "https://clhenrick.io/about/",
  },

  /** @typedef {"Github" | "Mastodon" | "Observable" | "LinkedIn" | "Ko-Fi"} SocialHandles */
  /** @type {Map<SocialHandles, string>} social media handles */
  socialHandles: new Map([
    ["Github", "@clhenrick"],
    ["Mastodon", "@clhenrick@indieweb.social"],
    ["Observable", "@clhenrick"],
    ["LinkedIn", "@chrishenrick"],
    ["Ko-Fi", "@chrislhenrick"],
  ]),

  /** @type {Map<SocialHandles, string>} social media URLs */
  socialLinks: new Map([
    ["GitHub", "https://github.com/clhenrick"],
    ["Mastodon", "https://indieweb.social/@clhenrick"],
    ["Observable", "https://observablehq.com/@clhenrick"],
    ["LinkedIn", "https://www.linkedin.com/in/chrishenrick/"],
    ["Ko-Fi", "https://ko-fi.com/chrislhenrick"],
  ]),

  /** @type {string} light theme-color for head meta tag (used for styling browser UI when supported) */
  metaThemeColorLight: "#0052a6",

  /** @type {string} dark theme-color for head meta tag (not honored by all browsers) */
  metaThemeColorDark: "#00204d",
};
