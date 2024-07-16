---
layout: layouts/about.njk
title: Accessibility Statement
description: "How this website adheres to WCAG conformance and inclusive design best practices."
---

# {{title}}

This is an accessibility statement from the owner and creator of this website, Chris L Henrick. This statement was created on <time datetime="2024-07-16">July 16, 2024</time> with help from the [W3C Accessibility Statement Generator Tool](https://www.w3.org/WAI/planning/statements/).

This website achieves partial level AA compliance for the [Web Content Accessibility Guidelines (WCAG) version 2.2](https://www.w3.org/TR/WCAG22/). WCAG is widely acknowledged by accessibility professionals as well as local, state, and federal government (including the [Americans with Disabilities Act](https://www.ada.gov/resources/small-entity-compliance-guide/)) within the United States as a standard for evaluating whether websites are considered digitally accessible. However, WCAG _compliance_ does not equate with _usability_ (something could technically be WCAG compliant but not usable by someone with a disability), which is why this website attempts to make sure all of its features and functionality follow usability and [inclusive design](https://en.wikipedia.org/wiki/Inclusive_design) best practices.

## Measures to support accessibility

Chris Henrick takes the following measures to ensure the accessibility of clhenrick.io:

<ul>
  <li>Include accessibility as part of our mission statement.</li>
  <li>Include accessibility throughout our internal policies.</li>
  <li>Integrate accessibility into our procurement practices.</li>
  <li>Appoint an accessibility officer (Chris Henrick).</li>
  <li>Provide continual accessibility training for our staff (Chris Henrick).</li>
  <li>Assign clear accessibility goals and responsibilities.</li>
  <li>Employ formal accessibility quality assurance methods.</li>
</ul>

## Compatibility with browsers and assistive technology

This website, clhenrick.io, is designed to be compatible with the following assistive technologies:

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

- **Insufficient color contrast for text formatted as machine readable code:** Text in code blocks may have low contrast due to the code styling theme not being WCAG conformant for color contrast. I plan on updating the theme used to style code blocks in order to improve their color contrast.

- **Video alternatives:** video embeds may exist in some pages of this site that do not have alternatives such as closed captions or transcripts. I plan on adding closed captions and transcripts for these videos.

## Assessment approach

Chris Henrick assessed the accessibility of chenrick.io through utilizing the following self-evaluation approaches:

- Using web browser developer tools to inspect the accessibility properties of HTML elements.
- Automated testing of the site's web pages using the [WAVE Web Accessibility  Evaluation browser extension](https://wave.webaim.org/).
- Manual accessibility testing using screen readers such as VoiceOver, NVDA, and JAWS.

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
