---
layout: layouts/about.njk
title: Accessibility Statement
description: "How this website adheres to web accessibility conformance and inclusive design best practices."
---

# {{title}}

This website strives to achieve level AA compliance for the [Web Content Accessibility Guidelines (WCAG) version 2.2](https://www.w3.org/TR/WCAG22/). WCAG is widely acknowledged by accessibility professionals as well as local, state, and federal government (including the [Americans with Disabilities Act](https://www.ada.gov/resources/small-entity-compliance-guide/)) within the United States as a standard for evaluating whether websites are considered digitally accessibile. However, WCAG _compliance_ does not equate with _usability_ (something could technically be WCAG compliant but not usable by someone with a disability), which is why this website attempts to make sure all of its features and funcionality follow usability and [inclusive design](https://en.wikipedia.org/wiki/Inclusive_design) best practices.

## Technical specifications

The accessibility of this site relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:

- HTML
- WAI-ARIA
- CSS
- JavaScript
- SVG

These technologies are relied upon for conformance with the accessibility standards used.

## Technical details describing WCAG conformance and Inclusive Design practices

The following list describes techniques used and decisions made to help make this site accessible and inclusive to users of all abilities:

- Using valid and appropriate semantic HTML throughout all site pages
- Using [Accessible Rich Internet Applications (ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/) only to appropriately enhance or improve the experience of users of assistive technologies when it makes sense to do so
- Keeping the site statically generated; no JavaScript is used to dynamically render critical portions of any page
- Using [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) techniques so that all of the site works without JavaScript
- Keeping the overall amount of CSS and JavaScript minimal to reduce digital resources
- Using CSS features that have a [Baseline](https://web.dev/baseline/) of "widely available" and checking for support when using CSS features that are deemed "newly available" in web browsers.
- Using only system fonts to cut down on digital resources
- Using responsive image sizing techniques and web specific file types to reduce the amount of data transferred for images
- Ensuring that the site is keyboard navigable and usable by non-mouse users
- Performing regular accessibility auditing using the [WAVE accessibility browser extension](https://wave.webaim.org/)
- Manual accessibility testing with the following screen reader software:
  - VoiceOver with Safari on MacOS
  - VoiceOver with Safari on iOS
  - NVDA with Firefox on Windows
  - JAWS with Chrome on Windows

## Known Limitations

Unintentional gaps in access may still exist in parts of this site. Like many others who design and build for the web, I began my journey into learning web design and development being largely ignorant of the importance of web accessibility, and how not addressing it in the web design and development processes results in barriers to access for people with disabilities. When this site was first created in 2015, accessibility was not prioritized or well thought out. Since then and during my career as a web developer and design engineer I've become more knowledgable of accessibility and inclusion in regards to the web and digital technology. I now consider accessibility and inclusive design a priority and guiding principle in my work. This was a motivating factor for me when [redesigning and refactoring this site in mid 2024](/blog/eleventy-migration-and-redesign/). Despite this endeavor, there were some accessibility issues leftover from the original site that I did not have time to immediately address.

Known gaps in accessibility in this site which I plan on remediating are as follows:

- The top level site wide navigation can be improved in terms of its sub-navigation usability on desktop devices.

- Animated GIFs that autoplay exist in some blog posts. I plan on replacing these with videos that will not autoplay as well as to reduce their file size.

- Some images have missing or sub-par alternative text, particularly in the portfolio project pages and some blog post pages. I plan on improving existing sub-par and addressing missing alt text in all images over time.

- Code blocks in blog posts have low contrast text. I plan on updating the theme used to style code blocks in order to improve their color contrast.

## Legacy Browser Support

This site may not look as intended in older browsers (such as Internet Explorer) or older versions of modern browsers because of the use of modern web features that web browser manufacturers add when updating their browser software. This is a trade off I have chosen to make in order to keep the site performant and lightweight as well as to keep up with the ever evolving digital landscape of the web platform, which is my responsibility as a web developer.

## Feedback

If you happen to find any problems with this site in terms of its accessiblity or usability, please do not hesitate to [contact me](/contact/) about them. I take these issues very seriously and will do my best to remediate them in a timely manner.

## Thanks and Credits

Lastly, I would like to thank the many web accessibility practicioners who work tirelessly to test, write about, speak about, and file web browser bugs on accessibility. Without these folks I would not be where I am today in terms of my knowledge of accessibility and inclusive design. They include but are not limited to:

- [Léonie Watson](https://tink.uk/about-leonie/)
- [Sara Soueidan](https://www.sarasoueidan.com/)
- [Adrian Roselli](https://adrianroselli.com/)
- [Scott O'Hara](https://www.scottohara.me/)
- [Eric Bailey](https://ericwbailey.design/)
- Everyone who is active on and helps run the [A11Y Slack Group](https://web-a11y.slack.com/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [A11Y Project](https://www.a11yproject.com/)
- [A11Y Collective](https://www.a11y-collective.com/)
