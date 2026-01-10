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

## Prior Art

This blog post was inspired by [Shop Talk podcast episode #328](https://shoptalkshow.com/328-jen-simmons-intrinsic-web-design/), "way back" from 2018 that features an interview with [Jen Simmons](https://jensimmons.com). Simmons is a renown and widely respected web designer and developer advocate at Mozilla who has contributed to the CSS Working Group and WebKit. She got her start as a graphic designer (back when things were done by hand) and then got into web design in the early days of the web, and has been at it since. If you work in the field of web development and/or design and are unfamiliar with Simmons, you should really know who she is! I highly recommend checking out her [talks](https://talks.jensimmons.com) and [work](https://labs.jensimmons.com).

In Shop Talk episode 328 Simmons discusses a concept she coined called "intrinsic web design" where she posits that the newer CSS layout features, mainly CSS Grid and its corresponding length units, such as [the `fr` unit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value) and [`minmax()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax), are ushering forth a new era of web design. In short, intrinsic web design enables web developers and designers to move beyond traditional and more limited modalities used in responsive web design, such as CSS media queries. We now have access to more algorithmic types of layout engines provided by the browser that can adjust content based on the content's needs. If this is new to you I encourage you to listen to the podcast as well as [Simmon's talk at An Event Apart](https://www.youtube.com/watch?v=jBwBACbRuGY).

The topic of who(m) is finishing the web design of a product comes up during the podcast. The answer, perhaps unsurprisingly, is not the web designer (gasp!) **_it's the developer_**.

## The Problem

When we think about the design process for creating digital products like websites, web apps, mobile apps, etc; we generally speaking tend to think of rigid roles and a linear start to end process. If we're lucky, this process happens in more of an agile way and not a waterfall one, where the work happens incrementally and hopefully iteratively.

To be cynically, ahem comically, reductionist about this, but not too far off from reality, you could break the process down into two steps:

1. The designer designs or creates a set of static mocks using design software such as [Figma](https://www.figma.com) to give a general to specific idea of how "the thing" should look and (sometimes vaguely) work.

2. The developer then uses the design mocks as a reference for what to aim for and builds "the thing" using code.

You might say that generative AI tools are changing this process a little bit, but in my current role and place of work this is still how things are done.

Ideally there is a design review that happens between steps one and two, as well as iteration on the original concept to incorporate any feedback viewed as valid by those in decision making positions. However, the process is still roughly the same. _The designer designs, the developer develops_. I personally abhor this dichotomy and rigidity, and I think it does teams a disservice when upheld to such strict formalities. Perhaps it's due to the territorial tendencies we intentionally or unintentionally come to embrace in our designated professions and job titles. Someone else telling you how to do your job feels shitty. However, it doesn't have to be that way!

## The Result: Developers Finish the Design

What I've seen that tends to happen in step two, more often than not, is that the developer makes design decisions that were not forseen or made in the design phase (step one). This could be something to do with accessibility that might also effect the design visually, for example [focus indicator states](https://www.sarasoueidan.com/blog/focus-indicators/). It could be a layout implementation detail that influences how the design looks at a wide range of browser viewport sizes using CSS flexbox or grid when a CSS media query for a "mobile layout" won't cut it. Maybe it's using an [ARIA live region](https://www.a11y-collective.com/blog/aria-live/) to announce dynamic UI updates to users of assistive technology. In this way, the developer is actually **_finishing the design_**, since these types of design decisions are accomplished with the technology they are building during the development phase, not with design software.

## A Mitigation Strategy

One effective way to disrupt this dichotomy and in my humble opinion, to build a better end product, is through ["UX Prototyping"](/blog/why-prototype/). This involves using the same or roughly similar tech that is being used to build "the thing" to create a working prototype of the design concept. I like to think of this type of protoyping as different from a "proof of concept" prototype or a "technical" prototype, although there is some overlap with them. I see it as being more about influencing the overall user experience and maybe even the visual design of "the thing" to better accomplish the project's objectives and requirements. That could be related to usability, accessibility, and/or bringing clarity to what "the thing" actually is and how it works. It could involve using the prototype for some usability testing with real humans to see what people struggle with and what they like. Figuring all of this out before the handoff to development and before production code is written is enormously beneficial in terms of efficiency, collaboration, and alignment.

UX prototyping helps bridge the gap between steps one and two of the (reductionist) product development process where people are siloed into what feels like very disparate roles and don't talk much to each other. Typically when I'm prototyping I'm working with a designer and bouncing ideas off of them, while simultaneously incorporating their feedback and ideas into the prototype I'm coding. I'm helping them understand what the technical constraints are we are working with, showing (not telling) how we can make the UI more accessible, and demonstrating how we can leverage newer CSS features to enhance the visual design's layout. Others involved in the project, such as product managers and leads, are shown the prototype and get to weigh in on things as well. It helps everyone get on the same page about what we're building and how it will work; what's possible and what isn't, or at least will take a lot more effort to pull off.

To me that's enjoyable and rewarding work, and as a result, a big win. It's something that Mike Monteiro might say meets the criteria of ["How to feel wonderful"](https://buttondown.com/monteiro/archive/how-to-feel-wonderful/).
