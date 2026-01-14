---
title: "How web design is finished"
date: 2026-01-13
teaser: 'A notable "hot take" from a past conversation between Jen Simmons, Chris Coyier, and Dave Rupert.'
tags:
  - Frontend
  - Design
  - Web
  - Prototyping
---

## Inspiration

This blog post was inspired by [Shop Talk podcast episode #328](https://shoptalkshow.com/328-jen-simmons-intrinsic-web-design/), wayback from 2018, that features an interview with [Jen Simmons](https://jensimmons.com). Simmons is a renown and widely respected web designer and developer advocate at Mozilla who has contributed to the CSS Working Group. She got her start as a graphic designer (back when design was done by hand without computers) and then got into web design in the early days of the web, and has been at it ever since. If you work in the field of web development and/or design and are unfamiliar with Simmons, you should really know who she is! I highly recommend checking out her [talks](https://talks.jensimmons.com) and [work](https://labs.jensimmons.com).

In Shop Talk episode 328 Simmons discusses a concept she coined called "intrinsic web design" where she posits that the newer CSS layout features, mainly CSS Grid and its corresponding [`fr` unit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value) and [`minmax()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax), are ushering forth a new era of web design. In short, intrinsic web design enables web developers and designers to move beyond traditional and more limited modalities used in responsive web design, such as CSS media queries. We now have access to more algorithmic types of layout engines provided by the browser that can adjust content based on the content's needs. If this is new to you I encourage you to listen to the podcast as well as [Simmon's talk at An Event Apart](https://www.youtube.com/watch?v=jBwBACbRuGY).

While CSS Grid and Flexbox have been around for almost a decade now, I still find that many people (both developers and designers) don't have a robust understanding of them, including when or why you might use one over the other. When it comes to creating intrinsic layouts on the web, these are your tools to reach for, so knowing the basics of them is pretty important. In my role as a developer I'm often suggesting, or more often than not showing, how we can use these CSS features to enhance a UI design's layout.

If you ask me, the concept of intrinsic web design is pretty freaking cool. It's a useful piece of vocabulary to bring to the table when discussing layouts in web design, particularly when people are fixated on designing layouts for the overly generalized three device sizes ("desktop", "tablet", and "mobile") since there are so many different viewport sizes in between them. Aside: who's to say what exactly is the ideal or most common "mobile" viewport size, "desktop" viewport size, etc. There may be an average out there but perhaps that differs from your user base. This variation isn't only due to the many different devices people use when interacting with the web, it's also from how people size their browser windows on laptop, desktop, and much larger devices like projectors and televisions.

Intrinsic web design aside, what got me to write this post however was when the topic of _who is finishing the web design_ came up. The answer, perhaps surprisingly, is not the web designer (gasp!) it's _the developer_. Why is that so worthy of a blog post? Let's dig in!

## The Dilemma

When we think about the product design process for creating digital artifacts like websites, web apps, mobile apps, etc; we generally speaking tend to think of rigid roles and a linear start to end process (within the tech industry at least). If we're lucky, this process happens in more of an [agile way and not a waterfall one](https://www.ibm.com/think/topics/agile-vs-waterfall), where the work happens incrementally and iteratively.

To be cynically, ahem comically, reductionist about this, but not too far off from reality, you could break the design and development process down into two steps:

1. The designer designs or creates a set of static mocks using design software such as [Figma](https://www.figma.com) to give a general to specific idea of how "the thing" should look and (sometimes vaguely) work.

2. The developer uses the design mocks as a reference for what to aim for and builds "the thing" by writing code, referencing the design as needed for colors, components, sizes, spacing, etc.

Ideally there is a design critique and/or review that happens between steps one and two, as well as iteration on the original concept to incorporate any feedback viewed as valid by those in decision making positions. However, the process is still roughly the same. _The designer designs, the developer develops_. I personally abhor this dichotomy and rigidity, and I think it does teams a disservice when upheld to such strict formalities.

I imagine this at least partly happens from the territorial tendencies we intentionally or unintentionally come to embrace in our designated professions and job titles. If we're consciously or subconsciously believing that we know best about a domain that our job title belongs to and are less receptive to giving and receiving feedback, that makes breaking out of these rigid, hierarchal roles difficult.

But I digress; let's get back to the topic of this post, how web design is finished.

## Developers Finish the Design

What I've seen happen in step two, more often than not, is that the developer makes design decisions that were not forseen or made in the design phase (step one) _during development_. These decisions may not even be signed off by the designer or design team.

Examples include:

- An accessibility issue that was not spec'd in the design mock that might also effect the design visually, for example [focus indicator states](https://www.sarasoueidan.com/blog/focus-indicators/).

- A layout implementation detail that influences how the design looks at a wide range of browser viewport sizes using CSS Flexbox or Grid, when a CSS media query alone isn't a good enough solution.

- Recomputing the number of axes ticks on a chart based on the data values it represents and the container size it resides in.

- Adjusting the spacing and/or sizing of an element to make the design more consistent and give interactive controls room to breathe as to prevent accidental mouse clicks.

In this way, the developer is actually _finishing the design_, since these types of design decisions are accomplished with the technology they are building with during the development phase, not with design software. Many times these design decisions are not incorporated back into the design mocks, so the "source of truth" of the design becomes what is created with the production code.

## A Mitigation Strategy

One effective way to disrupt this dichotomy and in my humble opinion, to build a better end product, is through ["UX Prototyping"](/blog/why-prototype/). This involves using the same or roughly similar tech that is being used to build "the thing" to create a working prototype of the design concept. I like to think of this type of protoyping as different from a "proof of concept" prototype or a "technical" prototype, although there is some overlap with them. I see it as being more about influencing the overall user experience and maybe even the visual design of "the thing" to better accomplish the project's requirements. That could be related to usability, accessibility, and/or bringing clarity to what "the thing" actually is and how it works. It could involve using the prototype for some usability testing with real humans to see what people struggle with and what they like. Figuring all of this out before any production code is written is enormously beneficial in terms of efficiency, collaboration, and alignment.

UX prototyping helps bridge the gap between steps one and two of the (reductionist) product development process where people are siloed into what feels like very disparate roles and don't communicate much with one another. In an ideal prototyping scenario I'm working side by side with a visual or UX designer and bouncing ideas off of them, while simultaneously incorporating their feedback and ideas into the prototype I'm coding. I'm helping them understand what the technical constraints are we are working with, showing (not telling) how we can make the UI more accessible, and demonstrating how we can leverage newer CSS features to enhance the visual design's layout. Others involved in the project, such as product managers and leads, are shown the prototype, interact with it, and get weigh in on the design as well. Having an interactive, working prototype helps everyone get on the same page about what is being built and how it will function, what's possible and what isn't, or at least will take a lot more effort to pull off.

To me UX prototyping is enjoyable and rewarding work, not to mention a big win for teams when there's time that allows for it and when done effectively. It's something that Mike Monteiro might say meets the criteria of ["How to Feel Wonderful"](https://buttondown.com/monteiro/archive/how-to-feel-wonderful/) since for me at least, prototyping work makes me feel wonderful.
