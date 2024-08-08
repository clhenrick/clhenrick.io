---
layout: layouts/about.njk
title: Accessibility Statement
date: 2024-07-16
updated: 2024-07-28
description: "How this website adheres to WCAG conformance and inclusive design best practices."
---

# {{title}}

This is an accessibility statement from the owner and creator of this website, {{ metadata.author.name }}. This statement was created on <time datetime="{{ page.date | htmlDateString }}">{{ page.date | readableDate }}</time> with help from the [W3C Accessibility Statement Generator Tool](https://www.w3.org/WAI/planning/statements/). It was last updated on <time datetime="{{ updated | htmlDateString}}">{{ updated | readableDate }}<time>.

This website achieves partial level AA compliance for the [Web Content Accessibility Guidelines (WCAG) version 2.2](https://www.w3.org/TR/WCAG22/). WCAG is widely acknowledged by accessibility professionals as well as local, state, and federal government (including the [Americans with Disabilities Act](https://www.ada.gov/resources/small-entity-compliance-guide/)) within the United States as a standard for evaluating whether websites are considered digitally accessible. In addition to working towards WCAG level AA conformance, this website's features and functionality strive to follow usability and [inclusive design](https://en.wikipedia.org/wiki/Inclusive_design) best practices.

## Measures to support accessibility

{{ metadata.author.name }} takes the following measures to ensure the accessibility of {{ metadata.title }}:

<ul>
  <li>Include accessibility as part of our mission statement.</li>
  <li>Include accessibility throughout our internal policies.</li>
  <li>Integrate accessibility into our procurement practices.</li>
  <li>Appoint an accessibility officer ({{ metadata.author.name }}).</li>
  <li>Provide continual accessibility training for our staff ({{ metadata.author.name }}).</li>
  <li>Assign clear accessibility goals and responsibilities.</li>
  <li>Employ formal accessibility quality assurance methods.</li>
</ul>

## Compatibility with browsers and assistive technology

This website, {{ metadata.title }}, is designed to be compatible with the following assistive technologies:

<ul>
  <li>Safari with VoiceOver on MacOS</li>
  <li>Safari with VoiceOver on iOS</li>
  <li>NVDA with Firefox on Windows</li>
  <li>JAWS with Chrome on Windows</li>
  <li>Talkbalk with Chrome on Android</li>
</ul>

This website is not compatible with Internet Explorer and may have problems with browsers more than two years old.

## Technical specifications

The accessibility of this site relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:

- HTML
- WAI-ARIA
- CSS
- JavaScript
- SVG

These technologies are relied upon for conformance with the accessibility standards used.

## Known Limitations

Unintentional gaps in access may exist in parts of this site. Like many others who design and build for the web, I began my journey into learning web design and development being largely ignorant of the importance of web accessibility, and how not addressing it in the web design and development processes results in barriers to access for people with disabilities. When this site was first created in 2015, accessibility was not prioritized or well thought out. Since then, and during my career as a web developer and design engineer, I've become more knowledgable of accessibility and inclusion in regards to the web and digital technology. I now consider accessibility and inclusive design a priority and guiding principle in my work. This was a motivating factor for me when [redesigning and refactoring this website in mid 2024](/blog/eleventy-migration-and-redesign/). Despite this endeavor, there were some accessibility issues leftover from the original site that I did not have time to immediately address.

Known gaps in accessibility in this site which I plan on remediating are as follows:

- **Site navigation:** Sub navigation items in the main site navigation display immediately on mouse hover without delay and immediately disappear when the mouse cursor moves away. No mechanism currently exists to delay the revealing and hiding of sub navigation items. I plan on updating the main site navigation to use a more accessible design to reveal and hide sub-navigation items.

- **Animated GIFs:** GIF, a type of image format that has animation capabilities, may autoplay in some blog posts. I plan on replacing these animated GIFs with videos that will not autoplay and may be played and paused.

- **Poor alternative text on some images:** Some images have missing or sub-par alternative text, particularly in the portfolio project pages and some blog post pages. I plan on improving existing sub-par and addressing missing alt text in all images over time.

- **Video alternatives:** video embeds may exist in some pages of this site that do not have alternatives such as closed captions or transcripts. I plan on adding closed captions and transcripts for these videos.

All known accessibility bugs have been documented in [this site's GitHub repository]({{ metadata.githubRepository }}/issues?q=is%3Aopen+is%3Aissue+label%3Aa11y). You may also view [accessibility bugs that have been fixed]({{ metadata.githubRepository }}/issues?q=is%3Aissue+label%3Aa11y+is%3Aclosed).

## Assessment Approaches

{{ metadata.author.name }} assessed the accessibility of {{ metadata.title }} through utilizing the following self-evaluation approaches:

- Using web browser developer tools such as [Chrome's accessibility pane](https://developer.chrome.com/docs/devtools/accessibility/reference#pane) to inspect the accessibility properties of HTML elements.
- Automated testing of the site's web pages using the [WAVE Web Accessibility  Evaluation browser extension](https://wave.webaim.org/).
- Manual accessibility testing using only the keyboard to navigate and operate the site.
- Manual accessibility testing using common screen reader software and web browser pairings:
  - VoiceOver with Safari on MacOS and iOS
  - NVDA with Firefox on Windows
  - JAWS with Chrome on Windows
- Manual accessibility testing using forced colors mode on Windows.

## Feedback

If you happen to find any problems with this site in terms of its accessibility or usability, please do not hesitate to [contact me](/contact/) about them. I take these issues very seriously and will do my best to remediate them in a timely manner.

## Thanks and Credits

Lastly, I would like to thank the many web accessibility practitioners who work tirelessly to test, write about, speak about, and file web browser bugs on accessibility. Without these folks I would not be where I am today in terms of my knowledge of accessibility and inclusive design. They include but are not limited to:

- [Léonie Watson](https://tink.uk/about-leonie/)
- [Sara Soueidan](https://www.sarasoueidan.com/)
- [Adrian Roselli](https://adrianroselli.com/)
- [Scott O'Hara](https://www.scottohara.me/)
- [Heydon Pickering](https://heydonworks.com/)
- [Eric Bailey](https://ericwbailey.design/)
- Everyone who is active on and helps run the [A11Y Slack Group](https://web-a11y.slack.com/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [A11Y Project](https://www.a11yproject.com/)
- [A11Y Collective](https://www.a11y-collective.com/)
