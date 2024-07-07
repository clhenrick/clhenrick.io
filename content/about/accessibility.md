---
layout: layouts/about.njk
title: Accessibility Statement
description: "How this website adheres to web accessibility conformance and inclusive design best practices."
---

# {{title}}

- striving for achieving conformance to WCAG 2.2 AA and beyond where applicable
- adopting inclusive design principles where applicable
	- keeping the site statically generated, no JS is used to render critical HTML
	- keeping the overall amount of CSS and JS minimal
	- using CSS features that have a baseline of "widely available" and checking for support when using newer features
	- using progressive enhancement so that the site works without JS
	- using responsive image sizing and file types to reduce the amount of data transferred for images
	- testing that the site is keyboard only navigable
	- testing with the following screen readers:
		- VoiceOver on MacOS
		- VoiceOver on iOS
		- *TODO: NVDA, JAWS*
	- audited using WAVE accessibility browser extension
	- audited using Lighthouse

gaps:
- began my journey into web design and development largely ignorant of digital and web a11y
- over time I've become more knowledgable about this important aspect of the web and digital technology, and now consider it a priority in my work.
- as such there are still some areas of this site where gaps may exist, some of these are as follows:
- some animated GIFs exist in blog posts which are quite large in file size, I plan on replacing with videos to reduce the file size and not require them to be downloaded immediately
- missing or sub-par alternative text in some images, particularly in portfolio project pages and some blog post pages. Planning on improving the sub-par alt text and addressing missing alt text.
- the site may not look correct in older browsers such as IE because of the use of modern CSS
