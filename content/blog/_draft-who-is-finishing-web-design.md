---
title: "How web design is finished"
date: 2026-01-07
teaser: 'A notable "hot take" from a past conversation between Jen Simmons, Chris Coyier, and Dave Rupert.'
tags:
  - Frontend
  - User Experience
  - Design
  - Web
---

# Who is finishing the design?

## Prior Art

This blog post was inspired by a [Shop Talk podcast episode](https://shoptalkshow.com/328-jen-simmons-intrinsic-web-design/) from 2018 I recently re-listened to that features an interview with Jen Simmons. If you work in the field of web development and/or design and are unfamiliar with Simmons, you should really know who she is! She's a renown and widely respected web developer, web designer, and developer advocate who has contributed to the W3C and WebKit (**_TODO: cite this_**).

Simmons discusses a concept she coined called "intrinsic web design" and theorizes that the then newer CSS features such as Flexbox, Grid, and their corresponding units such as the `fr` unit are ushering forth a new era of web design. Intrinsic web design allows for web developers and web designers to move beyond the CSS breakpoint model that has traditionally been used to target device sizes (e.g. mobile, tablet, laptop, desktop, etc). Instead, we now have access to more algorithmic types of layout engines provided by the browser that can adjust content based on the content's needs. If this is new to you I encourage you to listen to the podcast as well as Simmon's talk at [TODO: NAME OF CONFERENCE & LINK TO TALK].

The concept of who(m) is finishing the web design of a product comes up during the podcast. The answer, perhaps unsurprisingly, is not the web designer; it's the developer.

## The Problem

When we (the people working in tech) think about the design process for creating digital products like websites, web apps, mobile apps, etc; we (generally speaking) tend to think of rigid roles and a linear start to end process. If we're lucky, this process happens in more of an agile way and not a waterfall one, where the work happens incrementally and hopefully iteratively.

To be cynically, ahem comically, reductionist about this, but not too far off from reality, you could break the process down into two steps:

1. The designer designs or creates a set of static mocks using design software such as [Figma](https://www.figma.com) to give a general to specific idea of how "the thing" works.

2. The developer then uses the design mocks as a basis for what to shoot for and builds "the thing" using code.

Ideally there is some sort of "design review" and "feedback" or critique that happens between steps one and two, as well as iteration on the original concept to incorporate any feedback viewed as valid by those in decision making positions. However, the process is still roughly the same. The designer designs, the developer develops. I personally abhor this dichotomy and rigidity and think it does teams a disfavor when upheld to such strict formalities. Perhaps it's due to the territorial tendencies we intentionally or unintentionally come to embrace in our designated professions and job titles. Someone else telling you how to do your job feels shitty. However, it doesn't have to be that way!

What I think tends to happen in step two, more often than not, is that the developer makes design decisions that were not forseen or made in the design phase (step one). This could be something to do with accessibility that might also effect the design visually, for example focus states and focus order. It could be a layout implementation that influences how the design looks at different browser viewport sizes using CSS flexbox and grid or even container queries. In this way, the developer is actually **_finishing the design_**, since these types of design decisions are accomplished using the technology they are building with at development, not with design software.

In my experience a valuable way to disrupt this dichotomy and vastly improve the product design process to build a better end product is via ["UX Prototyping"](/blog/why-prototype/): using the same or roughly similar tech that is being used to build "The Thing." I like to think of this type of protoyping as different from a "proof of concept" prototype or a technical prototype, although there is some overlap with those types of prototyping purposes. I see it as being more about influencing the overall user experience and maybe even the visual design of "the thing" for the better. That could be usability, accessibility, and/or bringing clarity to what "the thing" actually is and how it works. Figuring this out before the handoff to development and before production code is written is enormously beneficial in terms of efficiency, collaboration, and alignment.

End rant.

https://shoptalkshow.com/328-jen-simmons-intrinsic-web-design/
