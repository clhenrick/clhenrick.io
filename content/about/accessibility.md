---
layout: layouts/about.njk
title: Accessibility Statement
description: "How this website adheres to web accessibility conformance and inclusive design best practices."
---

# {{title}}

This website strives to achieve level AA compliance for the [Web Content Accessibility Guidelines (WCAG) version 2.2](https://www.w3.org/TR/WCAG22/). WCAG is widely acknowledged by accessibility professionals as well as local, state, and federal government (including the ADA) within the United States as _the standard_ for ensuring and evaluating whether websites are digitally accessibile. However, WCAG _compliance_ does not equate with _usability_ (something could technically be compliant but not usable by someone with a disability), which is why this website attempts to make sure all of its features and funcionality follow usability and [inclusive design](https://en.wikipedia.org/wiki/Inclusive_design) best practices.

In addition to compliance to WCAG 2.2, inclusive design principles are followed where applicable. Together this includes:
  - using the appropriate semantic HTML throughout all site pages
  - using [Accessible Rich Internet Applications (ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/) only to appropriately enhance or improve the experience of users of assistive technologies when it makes sense to do so
	- keeping the site statically generated; no JavaScript is used to render critical HTML of any page
	- keeping the overall amount of CSS and JavaScript minimal to reduce digital resources
	- using CSS features that have a [Baseline](https://web.dev/baseline/) of "widely available" and checking for support when using features that are deemed "newly available" in web browsers.
	- using [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) techniques so that all of the site works without JavaScript
	- using responsive image sizing techniques and web specific file types to reduce the amount of data transferred for images
	- ensuring that the site is keyboard navigable and usable by non-mouse users
  - accessibility auditing using the [WAVE accessibility browser extension](https://wave.webaim.org/)
	- manual accessibility testing with the following screen reader software:
		- VoiceOver on MacOS
		- VoiceOver on iOS
		- *TODO: NVDA, JAWS on Windows*

With all of that being said, unintentional gaps in access may still exist in parts of this site. Like many others who design and build things for the web, I began my journey into learning web design and development being largely ignorant of the importance of digital and web accessiblity and how not addressing these aspects leaves barriers to people with disabilities. When this site was first created in 2015, accessibility was not prioritized or well thought out. During my career as a web developer and design engineer I've become more knowledgable of accessibility and inclusion in regards to the web and digital technology. I now consider it a priority and guiding principle in my work. This was a motivating factor for me when re-designing and refactoring the site in mid 2024. Despite this endeavor, there were some things left from the original site that I did not have time to address.

Known gaps in accessibility and inclusive design in this site I plan on remediating are as follows:
- some animated GIFs exist in blog posts which are quite large in file size, I plan on replacing with videos to reduce the file size and not require them to be downloaded immediately
- some images have missing or sub-par alternative text, particularly in the portfolio project pages and some blog post pages. I plan on improving existing sub-par and addressing missing alt text in all images.
- the site may not look correct in older browsers such as Internet Explorer because of the use of some modern CSS and HTML features. This is a trade off I have chosen to make in order to keep the site lightweight and to keep up with the ever evolving landscape of the web platform and related technologies.

If you happen to find any problems with this site in terms of accessiblity, please do not hesitate to [contact me](/contact/) about them. I take these issues very seriously and will do my best to remediate them.

Lastly, I would like to thank the many web accessibility practicioners who work tirelessly to test, write about, speak about, and file browser bugs about web accessibility. Without these folks I would not be where I am today in terms of my knowledge of accessibility and inclusive design. They include but are not limited to:

- [Léonie Watson](https://tink.uk/about-leonie/)
- [Sara Soueidan](https://www.sarasoueidan.com/)
- [Adrian Roselli](https://adrianroselli.com/)
- [Scott O'Hara](https://www.scottohara.me/)
- [Eric Bailey](https://ericwbailey.design/)
- Everyone who is active on and helps run the [A11Y Slack Group](https://web-a11y.slack.com/)
