---
title: "Why Prototype?"
date: 2025-08-11
teaser: "Why prototyping using web tech still matters in the era of generative AI"
tags:
  - Prototyping
  - UX
  - Design
---

- what do we mean by the words "prototype" and "prototyping"?

  - not so much technical prototyping, which focuses on figuring out how to implement a feature, although this may still be a benefit of going through the UX prototyping process
  - not "vibe coding" or having AI tools make it for you (more on that later)
  - not "rapid prototyping", which is more of an industrial process (research this?), we're still writing software here
  - not "click through prototypes" made with design software like Figma, they have value for certain use cases beyond static mocks, for example conveying steps in a workflow or a website map, but can fall short in others such as data driven layouts (dashboards, geographic maps, etc.)
  - more like prototyping for the user experience, to make sure what we're thinking about building makes sense, is what people expect or will want to use (e.g. from usability testing), and/or to get various interested parties on board on what is being built ("a prototype is worth a thousand meetings")
  - "build the thing right" vs "build the right thing" was a phrase thrown around at Google's UX division a lot when I was working there.

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
  - prototyping novel data visualization types not available in most charting libraries (gant charts, network diagrams)
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

-

- https://blog.adobe.com/en/publish/2017/11/29/prototyping-difference-low-fidelity-high-fidelity-prototypes-use
- https://www.youtube.com/watch?v=su6WA0kUUJE
- https://medium.com/google-design/google-maps-cb0326d165f5
- https://design.google/library/why-google-needs-ux-engineers
