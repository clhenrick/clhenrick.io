---
title: "Why Prototype?"
date: 2025-08-11
teaser: "Why prototyping using web tech still matters in the era of Generative AI"
tags:
  - Prototyping
  - User Experience
  - Design
  - Web
---

## What do we mean by "prototype" and "prototyping"?

First things first. Before getting into the weeds too deeply let's start by clarifying the usage of the words "prototype" and "prototyping" and the context in which they are being used in this post.

Here's what [Wikipedia has to say about the word prototype](https://en.wikipedia.org/wiki/Prototype):

> A prototype is an early sample, model, or release of a product built to test a concept or process. It is a term used in a variety of contexts, including semantics, design, electronics, and software programming. A prototype is generally used to evaluate a new design to enhance precision by system analysts and users. Prototyping serves to provide specifications for a real, working system rather than a theoretical one. Physical prototyping has a long history, and paper prototyping and virtual prototyping now extensively complement it. In some design workflow models, creating a prototype (a process sometimes called materialization) is the step between the formalization and the evaluation of an idea.

Through out this post I will be referring to the "software programming" and UI/UX "design" aspects of prototype and prototyping, specifically in the realm of web development.

Within the context of software development and UI/UX design, a prototype most often takes the form of a digital artifact that designers and/or developers (or a hybrid designer - developer, aka Design Engineer, UX Engineer, Design Technologist, etc.) will create. The purpose of the prototype might be for user testing, to get various interested parties on the same page about what is being proposed to be built, and/or ironing out how a design concept holds up. I'll refer to prototyping for these purposes as "UX prototyping."

Closely related to UX prototyping is "technical prototyping", which specifically focuses on figuring out **_how_** to technically solve a problem. In software development technical prototyping is all about the code you write. There may not even be a UI or UX design aspect to it, although there often is, at least when user interfaces are involved. Technical prototypes more often reside in a branch of the production codebase that gets scrutinized during code reviews while UX prototypes are more often created outside the production codebase with their code quality being less of a concern.

It's worth noting however that gaining technical insights is often one benefit of going through the UX design focused prototyping process using code. When prototyping with HTML, CSS, and JavaScript we still are solving technical problems. This could be figuring out an adaptive / responsive layout using CSS, if a design concept will provide a good user experience for users of assistive technology such as screen reader software, or if a data visualization will respond well to the actual data it is intended to represent.

To distinguish between these two types of prototypes, I often will use the term "UX prototyping" when refering to the UI/UX design focused type of prototype and "technical prototyping" when referring to the "code you write" focused type of prototype.

To be even more clear about what UX prototyping is, I'll elaborate on **_what it is not:_**

- It's not "vibe coding" or having generative AI tools make it for you (more on that later).

- It's not "rapid prototyping", which is more of an industrial process (_TODO research this?_), we're still writing software and even a prototype takes thought and time to create.

- It's not a "click through prototype" made with design software like Figma. Click through prototypes have value for certain use cases beyond static mocks, for example conveying the proposed steps in a task completion workflow or how a website navigation might work. They tend to fall short in other areas such as data driven interfaces (e.g. dashboards, geographic maps, etc.) that consume real world data to evaluate whether a design holds up.

This last point exemplifies why we prefer using web materials (at a minimum this is HTML and CSS) and technologies (JavaScript, web browser APIs, the browser itself, etc.) for web prototyping. It allows us to get "closer to the metal" and uncover pitfalls we might not have thought of or discovered using design software alone when investigating a problem space or a new feature for a product. It's extremely helpful to uncover problems with a proposed design concept in a prototype than in production code since it's more costly to iterate on production code than with "throw away" prototype code.

Production codebases come with a lot of checks and balances to enforce things like code quality and processes for updating their code. Automated code linting, formatting, testing; performing code reviews; CI/CD pipelines; etc are great for preventing breaking changes from being introduced into the production codebase and for giving your team an opportunity to give feedback on the work before it has been integrated. However, this all comes at a cost: making changes to production code takes more time, and as the saying goes, "time is money". By discovering unforeseen technical or UX issues in a prototype you can address them early and quickly. This is invaluable for saving time and resources, especially within larger organizations.

The most important aspect of UX prototyping is solving for the _user experience_. We want to make sure what we're thinking about building makes sense, that it is what people expect or will want to use (e.g. from usability testing), and/or to get various interested parties (internally and/or externally) on the same page on what is being built. The phrase _"build the right thing" vs "build the thing right"_ was one thrown around at Google's UX division a lot when I was working there, that I think succinctly gets the point across. Only focusing on _how to build the thing_ is moot if _what you're building_ isn't what your target audience wants to use and ends up frustrating them since they may end up abandoning your product, service, etc.

## Types of UX Prototypes

Let's talk about different types of UX prototypes. When creating a prototype it's generally helpful to narrow its focus for solving a single problem space. The benefit of doing this is that helps answer specific questions and resolve ambiguity for a design concept.

Here are some examples of different types of UX prototypes:

- **Animation & motion**: seeing what's possible with CSS or JavaScript to delight users, as well as to make sure there is still a good user experience when the animation or motion is turned off for users who have the [prefer-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting in their device enabled.

- **Data focused / driven**: e.g. with an interactive dashboard or geographic mapping application, this could be verifying that the design concept works with the actual data we'll be using.

- **Visual fidelity**: responsive design falls in this category, but also making things look pretty. How pixel perfect are we concerned with when implementing the design? What is the margin of error we have to accommodate different devices and browsers?

- **Interaction / task completion**: for example, evaluating a user interface for a customizing keyboard shortcuts and whether or not it is [accessible for users with disabilities](https://www.w3.org/WAI/fundamentals/accessibility-intro/).

- **The "kitchen sink"**: this means combining most or all of the above types into a single prototype. This should generally be avoided (more on this next), however at times it has value.

A bit more on why it's best to avoid the kitchen sink, but also why it can be useful in certain times:

- There is a risk of the prototype too closely mirroring the production code. As a result it requires frequent updating to be up to date with the actual product.

- The prototype becomes unwieldy to maintain due to code bloat. Prototype code is generally "quick and dirty" when compared with production code, so it doesn't scale well unless you're maintaining code quality from the start.

- Using the kitchen sink approach is likely a sign that the scope of the prototype's accompanying research is too broad and should be narrowed. User experience design research is most often qualitative in nature, so too many mixed signals can make the data from performing the research unwieldy to decode and summarize.

That being said, there is a place and time for the kitchen sink prototyping approach. It might be useful for aligning interested parties on the future product features being propsoed as well as for user testing purposes while keeping the prototype closely mirrored to the actual product. After all, updating prototype code is less costly then production code churn.

## The benefits of UX prototyping

- saving engineering (writing production code) time by bringing clarity and certainty prior to building
- avoiding having to redo prod code work later
- risk mitigation
- aligning people on what is being built
- addressing rift in design & eng
- use both design and dev skills
- can work outside of the production codebase and iterate much more quickly without things like code reviews, tests, type checking, linting, etc. Code quality isn't a primary focus of prototyping, but that doesn't mean you can't or shouldn't write "clean code" when prototyping

- helpful to identify a clear set of pain points that prototyping is meant to address

- difference between prototyping to figure out a technical issue vs a UX one
- "build the thing right" vs "build the right thing"
- experience as a UXE at Google
  - collaborating with designers, product managers, and researchers
  - role was unique: full time prototyping!
  - used actual web tech: html, css, js, frameworks like React, Vue, Svelte
    - the tech didn't matter so much as the output is a design artifact; SWEs would build out the real world feature how they saw fit
  - used real data to evaluate design concepts
  - 311 data when real data couldn't be acquired due to privacy concerns (have this as a separate topic?)
  - prototyping novel data visualization types not available in most charting libraries (Gantt charts, network diagrams)
  - user testing for accessibility

## My personal experience with prototyping

- prototyping the Activity Map block for StoryMaps.com
- uncovered design blind spots such as
  - making sure that things had enough room on mobile,
  - too little or too much data,
  - improving the elevation profile chart design,
  - using an intrinsic layout rather than strict pixel based breakpoints for responsive layout
  - making sure the feature was accessible (semantic HTML for structure, accessible names, focus order, etc.)
  - partly technical
    - determining how to utilize the JS SDK (both map and elev profile view model)
    - addressing data processing & storage (reducing the amount of data stored for the elev profile and GPX tracks)
- created three separate prototypes before building out the production code
- also built the production code, prototyping ahead of time made the process go much more quickly with fewer unknowns / less uncertainty

## Frequently Asked Questions on Prototyping

- when unsure whether your org will buy into ux prototyping, ask if there is room for more design thinking & product thinking. It's definitely an investment and requires additional time in software production lifecycle

- does prototyping work make sense for a human to do now that we can use generative AI for it?
  - to me prototyping is one of those fun things, almost like making art or music, that I enjoy doing and get a lot of value out of. It's meaningful work to me, not something that I want to automate with gen AI.
  - I learn from prototyping as well; even if it's UX focused there are still technical learnings I gain from the process that I can relay to whomever is building the finished product (including myself)
  - some things that AI may and will likely fall short on such as accessibility, given that much of the code LLMs have been trained on has accessibility issues
- trade off of shipping quickly vs longer investment and shipping later:
  - e.g. a backend feature that requires a UI component, but it's not clear what that UI component should look like
  - backend dev is costly, so having a prototype showing what the UX should be can be helpful

- "a prototype is worth a thousand meetings"

## Further Reading

- https://blog.adobe.com/en/publish/2017/11/29/prototyping-difference-low-fidelity-high-fidelity-prototypes-use
- https://www.youtube.com/watch?v=su6WA0kUUJE
- https://medium.com/google-design/google-maps-cb0326d165f5
- https://design.google/library/why-google-needs-ux-engineers
