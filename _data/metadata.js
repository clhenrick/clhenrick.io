import path from "path";

export default {
  url: "https://clhenrick.io/",
  get domainName() {
    return path.basename(this.url);
  },
  get title() {
    return this.domainName;
  },
  get titleImage() {
    return path.join("img", "oakland-map-dark-1800w.webp");
  },
  titleImageAlt:
    "A geographic map of the city of Oakland, California, centered on downtown. The map's extent spans the San Francisco Bay to the west, the cities of Berkeley and Emeryville to the north, the Oakland hills to the east, and the city of Alameda to the south. The map depicts the road networks and names of various cities and neighborhoods, predominantly in the East Bay area. It includes a topographic shaded relief rendering of the rugged Oakland hills.",
  titleImageType: "image/webp",
  get logoImage() {
    return path.join("favicon", "apple-touch-icon.png");
  },
  get webmentionUrl() {
    return new URL(`${this.domainName}/webmention`, "https://webmention.io")
      .href;
  },
  language: "en",
  description:
    "The website, blog, and portfolio of Chris L Henrick, front-end web developer and design engineer.",
  environment: process.env.NODE_ENV,
  githubRepository: "https://github.com/clhenrick/clhenrick.io",
  author: {
    name: "Chris Henrick",
    email: "chrishenrick@gmail.com",
    url: "https://clhenrick.io/about/",
  },
  socialHandles: new Map([
    ["Github", "@clhenrick"],
    ["Mastodon", "@clhenrick@indieweb.social"],
    ["Observable", "@clhenrick"],
    ["LinkedIn", "@chrishenrick"],
    ["Ko-Fi", "@chrislhenrick"],
  ]),
  socialLinks: new Map([
    ["GitHub", "https://github.com/clhenrick"],
    ["Mastodon", "https://indieweb.social/@clhenrick"],
    ["Observable", "https://observablehq.com/@clhenrick"],
    ["LinkedIn", "https://www.linkedin.com/in/chrishenrick/"],
    ["Ko-Fi", "https://ko-fi.com/chrislhenrick"],
  ]),
  metaThemeColorDark: "#00204d",
  metaThemeColorLight: "#0052a6",
};
