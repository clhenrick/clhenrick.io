---
title: "Why Prototype?"
date: 2025-08-11
teaser: "Why prototyping using web tech still matters in the era of generative AI"
tags:
  - Prototyping
  - UX
  - Design
---

## What do we mean by the words "prototype" and "prototyping"?

Let's start by defining the words "prototype" and "prototyping" and clarifying the context in which I'm using them in this post.

Here's what [Wikipedia has to say about the word prototype](https://en.wikipedia.org/wiki/Prototype):

> A prototype is an early sample, model, or release of a product built to test a concept or process. It is a term used in a variety of contexts, including semantics, design, electronics, and software programming. A prototype is generally used to evaluate a new design to enhance precision by system analysts and users. Prototyping serves to provide specifications for a real, working system rather than a theoretical one. Physical prototyping has a long history, and paper prototyping and virtual prototyping now extensively complement it. In some design workflow models, creating a prototype (a process sometimes called materialization) is the step between the formalization and the evaluation of an idea.

For this blog post I'm referring to the "software programming" and UI/UX "design" aspects of prototype and prototyping.

In the context of software development and UI/UX design, a prototype most often takes the form of a digital artifact that designers and/or developers (or a hybrid designer - developer, aka design engineer, UX engineer, design technologist, etc.) will create, often for user testing and/or to get various interested parties on the same page about what is being proposed to be built and how it is intended to function.

There is also "technical prototyping", which specifically focuses on figuring out _how_ to do or implement a thing. In software development technical prototyping is all about the code you write. There may not even be a UI or UX design aspect to it. Gaining technical insights is often one benefit of going through the UX design focused prototyping process, as when prototyping using code we still are solving UI related problem with code, which is a technical process. I can't say with certainty the converse is true, when focusing on a technical implementation prototype, how the thing looks may not be a concern at all, or at most an after thought.

To distinguish between these two types of prototypes, I often say "UX prototyping" when refering to the UI/UX design focused type of prototype and "technical prototyping" when referring to the "code you write" focused type of prototype.

To be even more clear about the type of prototyping I'm talking about, I'll elaborate on what it is not.

- It's not "vibe coding" or having generative AI tools make it for you (more on that later).

- It's not "rapid prototyping", which is more of an industrial process (_TODO research this?_), we're still writing software here and writing software, even a prototype takes thought and time.

- It's not a "click through prototype" made with design software like Figma. Click through prototypes have value for certain use cases beyond static mocks, for example conveying the steps in a task completion workflow or a site map. They tend to fall short in other areas such as data driven layouts (e.g. dashboards, geographic maps, etc.) that require using real data to evaluate whether a design holds up.

UX prototyping's purpose is solving for the _user experience_, to make sure what we're thinking about building makes sense, is what people expect or will want to use (e.g. from usability testing), and/or to get various interested parties on the same page on what is being built. The phrase "build the right thing" vs "build the thing right" was a phrase thrown around at Google's UX division a lot when I was working there that gets the point across. Only focusing on how to build the thing is moot if what you're building isn't what your target audience wants to use and frustrates them since they may end up abandoning your product, service, etc.

## Types of UX Prototypes

- some different types of UX prototype focus areas:

  - animation & motion
  - data focused / driven (e.g. an interactive dashboard or mapping application, does the design concept work with the data we'll be using or expecting to use?)
  - visual fidelity (responsive design falls in this category, but also making things look pretty)
  - interaction / task completion (e.g. a UI for a customizing keyboard shortcuts)
  - the "kitchen sink" (many of the above focus areas in a single prototype, should generally be avoided but could have its value)

- why it's best to avoid the kitchen sink but also why it can be useful in certain times:

  - the prototype ends up too closely mirroring the production code
  - becomes unwieldy to maintain
  - most likely a sign that the scope of research a prototype is seeking to address needs to be narrowed
  - there is a place and time for the kitchen sink, perhaps it's mimicing part of a desktop software and it becomes useful for aligning people on what new features are being built out as well as user testing

- benefits of UX prototyping:

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

- experience at Esri:
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

questions:

- when unsure whether your org will buy into ux prototyping, ask if there is room for more design thinking & product thinking. It's definitely an investment and requires additional time in software production lifecycle

- does prototyping work make sense for a human to do now that we can use generative AI for it?

  - to me prototyping is one of those fun things, almost like making art or music, that I enjoy doing and get a lot of value out of. It's meaningful work to me, not something that I want to automate with gen AI.
  - I learn from prototyping as well; even if it's UX focused there are still technical learnings I gain from the process that I can relay to whomever is building the finished product (including myself)
  - some things that AI may and will likely fall short on such as accessibility, given that much of the code LLMs have been trained on has accessibility issues

- trade off of shipping quickly vs longer investment and shipping later:

  - e.g. a backend feature that requires a UI component, but it's not clear what that UI component should look like
  - backend dev is costly, so having a prototype showing what the UX should be can be helpful

- "a prototype is worth a thousand meetings"

- https://blog.adobe.com/en/publish/2017/11/29/prototyping-difference-low-fidelity-high-fidelity-prototypes-use
- https://www.youtube.com/watch?v=su6WA0kUUJE
- https://medium.com/google-design/google-maps-cb0326d165f5
- https://design.google/library/why-google-needs-ux-engineers
