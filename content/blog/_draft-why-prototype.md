---
title: "Why Prototype?"
date: 2025-08-11
teaser: "Why UX prototyping still matters in the era of Generative AI"
tags:
  - Prototyping
  - User Experience
  - Design
  - Web
  - AI
---

## Intro

This is a post that I have been meaning to write for quite a while about a topic I'm honestly damn passionate about. Much of it comes out of my personal experience doing "UX prototyping" work in the tech industry over the past decade or so, and before that while attending the MFA Design and Technology program at Parsons School of Design in New York City. Some of the content here comes from a conversation I had with my former manager at Google, Ryan Kuykendall, a vetern UX Engineer who managed a team of UX Engineers on Google Cloud. Additionally I've experienced some misconceptions around prototyping for the web, which has also motivated me to write this post. I hope what follows is useful for folks out there who work on creating things for the web, particularly those with a design and/or front-end programming background.

## What do I mean by "prototype" and "prototyping"?

First things first; before getting into the weeds too deeply I would like to clarify the usage of the words "prototype" and "prototyping" in the context of this blog post.

Here's what [Wikipedia has to say about the word prototype](https://en.wikipedia.org/wiki/Prototype):

> A prototype is an early sample, model, or release of a product built to test a concept or process. It is a term used in a variety of contexts, including semantics, design, electronics, and software programming. A prototype is generally used to evaluate a new design to enhance precision by system analysts and users. Prototyping serves to provide specifications for a real, working system rather than a theoretical one. Physical prototyping has a long history, and paper prototyping and virtual prototyping now extensively complement it. In some design workflow models, creating a prototype (a process sometimes called materialization) is the step between the formalization and the evaluation of an idea.

Through out this post I will be referring to the "software programming" and UI/UX "design" aspects of prototype and prototyping, specifically in the realm of web development.

From my personal experience, within the context of software development and UI/UX design, a prototype most often takes the form of a digital artifact that designers and/or developers (or a hybrid designer - developer, AKA Design Engineer, UX Engineer, Design Technologist, etc.) will create. The purpose of the prototype might be for user testing, to get various interested parties on the same page about what is being proposed, and/or ironing out how well a design concept holds up or not. I'll refer to prototyping for these purposes as "UX prototyping."

In the world of software development and closely related to UX prototyping is the concept of "technical prototyping", which specifically focuses on figuring out **_how_** to technically solve a problem. In software development technical prototyping is all about the code you write. There may not even be a UI or UX design aspect to it, although there often is, at least when user interfaces are involved. Technical prototypes often, but not always, reside in a branch of the production codebase that gets scrutinized during code reviews while UX prototypes are more often created outside the production codebase with their code quality being less of a concern.

It's worth noting however that gaining technical insights is often one benefit of going through the UX design focused prototyping process using code. When prototyping with HTML, CSS, and JavaScript we still are solving technical problems. For example, this may include figuring out an adaptive / responsive layout using CSS grid and/or flexbox, evaluating whether a design concept will provide a good user experience for users of screen reader software, or if a data visualization or dashboard will respond well to the actual data it is intended to represent.

To distinguish between these two types of prototypes, I often will use the term "UX prototyping" when refering to the UI/UX design focused type of prototype and "technical prototyping" when referring to the "code you write" focused type of prototype.

To be even more clear about what UX prototyping is, I'll elaborate on **_what it is not:_**

- It's not "vibe coding" or having generative AI tools prototype for you (more on that later).

- It's not "rapid prototyping", which is more of an industrial process (_TODO research this?_), we're still writing software and even a simple prototype made with code takes thought and time to create.

- It's not a "click through prototype" made with design software like Figma. Click through prototypes have value for certain use cases beyond static mocks, for example conveying the proposed steps in a task completion workflow or how a website navigation might work. They tend to fall short in other areas such as data driven interfaces (e.g. dashboards, geographic maps, etc.) that consume real world data to evaluate whether a design holds up.

This last point exemplifies why we prefer using web standards such as semantic HTML, CSS, JavaScript, browser APIs, etc. for UX prototyping. It allows us to get "closer to the metal" and uncover pitfalls we might not have thought of or discovered using design software alone when investigating a problem space or a new feature for a product. It's extremely helpful and time saving to uncover problems with a proposed design concept in a UX prototype than in production code since generally speaking it's more costly to iterate on production code than with "throw away" prototype code.

This is a by product of the checks and processes that are enforced in production codebases. Automated code linting, formatting, type checking, tests, code reviews, and CI/CD pipelines are great for preventing breaking changes from being introduced into the production codebase and for giving your team an opportunity to give feedback on new work. However, this all comes at a cost: making changes to production code takes more time, and as the saying goes, "time is money". Making further changes or reverting previous changes to production code after learning that the user experience or accessibility of a new feature is poor is even more costly. By discovering unforeseen technical, accessibility, or UX issues in a prototype you can address them early and quickly. This is invaluable for saving time and resources, especially within larger production codebases.

Aside: while code quality isn't a primary concern of prototyping, it doesn't mean you can't or shouldn't have good code quality when prototyping, especially if you sense that the prototype may grow more elaborate and complex.

The most important aspect of UX prototyping is solving for the _user experience_. We want to make sure what we're thinking about building makes sense, that it is what people expect or will want to use (e.g. from usability testing), and/or to get various interested parties (internally and/or externally) on the same page on what is being built. The phrase _"build the right thing" vs "build the thing right"_ was one thrown around at Google's UX division a lot when I was working there, that I think succinctly gets the point across. Only focusing on _how to build the thing_ is moot if _what you're building_ isn't what your target audience wants to use and ends up frustrating them, resulting in abandoning your product.

## Types of UX Prototypes

Let's talk about different types of UX prototypes that exist in the wild and that you might reach for in the prototyping process. When creating a prototype it's generally helpful to narrow its focus. The benefit of doing this is that helps answer specific questions and resolve ambiguity for a design concept.

Here are some examples of different types of UX prototypes:

- **Animation & motion**: seeing what's possible with CSS or JavaScript to delight users, as well as to make sure there is still a good user experience when the animation or motion is turned off for users who have the [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting in their device enabled.

- **Data focused / driven**: e.g. with an interactive dashboard or geographic mapping application, this could be verifying that the design concept works with the actual data we'll be using.

- **Visual fidelity**: responsive design falls in this category, but generally this is about making things look pretty. How pixel perfect are we concerned with when implementing the design? What is the margin of error we have to accommodate the plethora of devices and browsers people use? Does it need to look good on a wide screen television or large touch interface at a museum? Does it need to be legible on a small wearable device such as an Apple watch?

- **Interaction / task completion**: for example, evaluating a user interface for a customizing keyboard shortcuts for a web application and whether or not it is [accessible for users with disabilities](https://www.w3.org/WAI/fundamentals/accessibility-intro/).

- **The "kitchen sink"**: this means combining most or all of the above into a single prototype. This should generally be avoided, however at times it has value.

### More on the kitchen sink approach

A bit more on why it's best to avoid the kitchen sink, but also why it can be useful in certain times:

- There is a risk of the prototype too closely mirroring the production code. As a result it requires frequent updating to be up to date with the actual product.

- The prototype becomes unwieldy to maintain due to code bloat. Prototype code is generally written in a "quick and dirty" manner in comparison to production code, so it doesn't scale well unless you're maintaining code quality from the start or have additional time for refactoring.

- Using the kitchen sink approach may be a sign that the scope of the prototype's accompanying research is too broad and should be narrowed. User experience design research is most often qualitative in nature, so too many mixed signals can make the data from performing the research unwieldy to decode and analyze.

That being said, there is a place and time for the kitchen sink prototyping approach. It might be useful for aligning interested parties on future product features being proposed as well as for user testing purposes while keeping the prototype closely mirrored to the actual product. After all, updating prototype code is still less costly then production code churn.

## Benefits of UX prototyping

Some benefits of UX prototyping have already been covered in this post but I feel that it's worth mentioning them their own section for easy reference.

- **Saving engineering time** by bringing clarity and certainty prior to building the feature in the production code.

- **Avoiding redoing production code** after determining a feature needs to be reworked because of a less than desirable user experience.

- **Risk mitigation** by identifying if something is or isn't working before shipping it.

- **Aligning interested parties** on what is being built to reduce ambiguity and gain buy in.

- **Addressing the rift between design and engineering**. For example, prototyping can be an effective means to advocate for user experience to engineering and/or better convey technical constraints to designers.

- **Utilizing both of one's design and development skills**. Too often we are siloed into a strict role (developer or designer) and don't get to flex our complimentary skills. UX prototyping is an opportunity to do just that.

- **Iterating quickly** without being slowed down by code reviews, tests, type safety, code linting, etc. In my personal experience this has often felt like a breath of fresh air after working in production codebases that have established patterns and processes for integrating new code.

- **Evaluating the accessibility** of a proposed design concept, workflow, new user interface component, chart or data visualization, etc. Since design tools such as Figma do not output accessible code, it's the responsibility of those of us who write and understand frontend code to make sure we are delivering code that follows [best practices for accessibility](https://www.a11yproject.com/checklist/) and meets the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/). When using code to prototype we can run automated accessibility checks on the code as well as test it using screen reader software and the keyboard only. We can enlarge the font size and zoom the browser to see how things hold up or don't.

- **Internationalization (i18n) & localization (l10n):** what happens to the design when it is translated to different languages? Especially when "right to left" (RTL) languages such as Arabic and Hebrew are used in the design in place of English? It's important to keep in mind that when translating labels, instructional text, numbers, dates, etc. from English to other languages and locales we have to be mindful that the space requirements for text will most likely be greater. Our design should plan for this to ensure that users of non-English languages are still able to use our product without any hiccups. Luckily for developers there are JavaScript libraries, CSS features, and browser APIs for handling i18n and l10n that make this a problem UX prototyping can effectively address.

Again, the largest benefit of UX prototyping is improving the design and usability of the product you are working on. UX prototyping provides an opportunity to have deeper conversations and be more nuanced about what is being built and why.

## Potential Drawbacks of UX Prototyping

I honestly have not found there to be many drawbacks from going through the process of UX Prototyping when _it is warranted._ That being said, at times things may go awry.

Perhaps the biggest drawback is that the prototype becomes the final product. The most likely reason for this happening is running out of time and/or resources for the project you are creating the prototype for. This isn't necessarily a bad thing and could be totally fine given the situation, so I'm not sure it actually counts as a drawback. In the past when I've worked at smaller companies that specialize in creating projects for a variety of clients, this has often been the case. For "greenfield" projects (meaning projects where you are starting from a total clean slate) that may never need another update, or at least will require very minimal updates or maintenance in the future, the prototype being the final product is okay, as long as it isn't buggy and meets the requirements for the project. It might even be "good enough" to sell to people as a pitch for a more long term project in a start up or business venture. However, if the prototype does become the final project and resources are never devoted to refactoring and cleaning up the code to make it more scalable, secure, and performant; then technical debt from the prototype will likely come back to haunt you later.

Sometimes it can be more productive to do the actual prototyping work in the production codebase and then refactor and/or clean up the code after the "prototype" is approved. At times it may even be too difficult to prototype outside of the production codebase for a particular problem, for example if you need to incorporate an existing system to make the prototype functional.

Prototyping in the production codebase requires that you are very comfortable with the area of the codebase you are working in, as well as are able to work within the constraints of the architecture and processes your team has put in place. There's nothing wrong with doing this, so if this works for you by all means go for it! My personal preference has been to break down problems into smaller pieces and work outside production code when prototyping so that I don't feel bogged down by things like technical debt, complex architecture, slow build times, and processes such as automated tests, code quality adherence, CI/CD pipelines, and code reviews.

I do want to acknowledge that prototyping with code for UX purposes as someone without a design title takes self advocacy and persuasion. In the tech industry we tend to be siloed into very narrow roles such as "designer" and "engineer", and we aren't always given room for stepping outside of what our day to day responsibilities are. Building a strong case for why UX Prototyping can improve the design process and product development will help win over people who are skeptical about allocating time and resources for it. Setting a time limit on prototyping work can also help, for example 10-20% of your time for however many weeks. Typically once you show the finished prototype (or at least first iteration of it) and people are able to interact with it, they will immediate see the value in it and tend to be more receptive to doing it in the future. It's hard to convince people of something that's valuable when they haven't yet experienced it, but it can be done.

## My personal experience with UX prototyping

Working as a UX Engineer (UXE) at Google was a very unique experience and I feel privileged for having been able to do it. In a nutshell, my entire day was centered around prototyping and not writing any production code! I'm sure this is surprising to some people reading this, but yes I assure you that this type of role actually exists. It usually resides in larger companies that have the resources to dedicate to it. This doesn't mean you have to have a dedicated prototyping role to do this type of work, as I'll demonstrate in a bit.

My prototyping work at Google as a UXE ninety-five percent of the time involved using HTML, CSS, JavaScript or TypeScript, as well as various frontend frameworks such as React, Angular, Vue, and Lit / Web Components, plus build tools like Webpack or Google's internal ones. Occassionally I would reach for Collab (Jupyter) Notebooks for data analysis and transformation when a project was data heavy. Using code and frontend tech didn't preclude me from using design software such as Figma or Sketch, it was there if we felt it was helpful to use.

The choice of tech used to prototype wasn't so important as finished prototypes were viewed as design artifacts and the code written to create them was viewed as "throw away code" that would never see the light of day (other than a usability test). Software engineers building the final product would write production code as they saw fit with the tech they felt was best suited using Google's various frontend tech stacks. From my experience and from what I heard from other UXEs at Google, this mismatch between prototyping tech and production tech didn't typically cause problems as UXEs were expected to effectively communicate any technical details to software engineers if waranted. Again, the primary purpose of a prototype was to help everyone involved in the product lifecycle better understand what was to be made before making it and iron out design ambiguities, so writing code purely for creating design artifacts wasn't seen as problematic or a waste of resources.

While working as a UXE I worked closely with folks in different types of roles, mostly in the UX realm. This included UX designers and visual designers, UX researchers (both quantitative and qualitative), product managers, content writers, and occassionally software engineers. It was a very collaborative environment to say the least! I've found that I thrive in a healthy and open collaborative environment; it's much more enjoyable to me than being siloed as a software engineer or frontend engineer working only on production code related tasks and not being able to give input into the design process.

In my current role as a Senior Software Engineer at [Esri](https://www.esri.com/) my role hasn't strictly focused on UX prototyping, but I leverage it whenever I feel that a problem space or design concept would benefit from it. At this point I feel I have a fairly good intuition for this and can justify it to others, such as my manager.

A particularly successful example from my tenure at Esri is when I prototyped the "Activity Map" for [StoryMaps.com](https://storymaps.com), a web and mobile application for, ahem, telling stories with (or without) maps. Unfortunately StoryMaps.com was sunsetted in July of 2025, so this feature is no longer available to view live. However, you may [view a screen recording of the Activity Map block](/work/storymaps-activity-map-block/) in my portfolio.

The concept of a "block" in StoryMaps is akin to a building block for a larger structure. When creating a story, authors may choose from various block types such as rich text, image galleries, video embeds, interactive geographic maps, and map tours to make their story media rich and immersive (think Medium.com but with more media capabilities). The Activity Map block was a new block type that would allow an author to upload activity data (in the form of a [GPX file](https://en.wikipedia.org/wiki/GPS_Exchange_Format)) from apps such as [Strava](https://www.strava.com) or [Ride With GPS](https://ridewithgps.com) to create a preconfigured dashboard showing a map of an activity (like a bicycle ride, hike, or run) along with some summary statistics and an elevation profile chart.

_TODO: include screenshot of activity map_

In the prototyping process for the Activity Map block I uncovered some blind spots in the preliminary design concept such as:

- Making sure that the dashboard's pieces had enough room to breath on mobile, such as not making the map or chart too squished. By leveraging intrinsic design patterns using CSS flexbox, I could allow the various parts of the dashboard to stack vertically when the ideal amount horizontal space was not available in the browser viewport. This allowed the design to be responsive without the use of CSS media queries or breakpoints.

- Adjusting the design when there was too little or too much data. By testing a prototype using real world GPX data, I could see how well the design concept held up when the input data wasn't the ideal or expected amount of data (e.g. too little or too much data, or perhaps corrupted data).

- Making design improvements to the block's elevation profile chart. The original design of the chart was quite minimal, so I suggested minor design adjustments to help make the chart more readable which the designer incorporated into the final design.

- Making sure the feature was accessible. Prototyping with code meant I could reach for semantic HTML for the block's structure, determine what parts required accessible names, ensure that the focus order made sense, test interacting with it via keyboard only and screen reader software such as NVDA, Voice Over, and JAWS. These are important parts of designing for the web to meet the Web Content Accessibility Guidelines that design software (currently) cannot assist with.

Some technical learnings from prototyping the Activity Map included:

- Determining how to utilize the ArcGIS JS SDK's [ElevationProfileViewModel](#) with D3JS to create a customized elevation profile chart.

- Addressing data transformation and storage, including reducing the amount of data stored for the elevation profile and GPX data for improving performance when the Activity Map loads.

- Determining whether to use CSS Grid or Flexbox for the responsive layout as well as other CSS features such as custom properties to make the block themeable.

In total I created three separate prototypes before building out the production code. Putting in the time to prototype ahead of writing production code made the software development process go much more quickly with fewer unknowns and less uncertainty. It also helped get everyone involved with the project (designers, product engineers, myself, tech lead, and CTO) on the same page about what we were building and how it intended to function.

## Frequently Asked Questions on Prototyping

### How do I get my organization to green light prototyping?

When unsure whether your organization will buy into UX prototyping, ask if there is room for more design and product thinking. Although it has the potential to save time down the road and improve the usability of a product, UX prototyping is an investment and requires additional time in the product lifecycle. It can be helpful to identify a clear set of pain points that prototyping is meant to address and to reiterate that addressing them outside of the production codebase will likely save time and money by avoiding churn.

In my own work I've experienced a correlation between ambiguity and risk in design and opportunity for reducing risk and uncertainty with UX prototyping. In other words, the more ambiguity and risk there is in a proposed design, it's more likely that UX prototyping will be a beneficial part of the design process and lead to a better outcome in the finished product.

- trade off of shipping quickly vs longer investment and shipping later:
  - e.g. a backend feature that requires a UI component, but it's not clear what that UI component should look like
  - backend dev is costly, so having a prototype showing what the UX should be can be helpful

There's always the business case to be made for UX prototyping as you'll likely be saving your company money in the long run. This is not only from avoiding production code churn and reworking design concepts after shipping a feature, but also by delivering an improved and accessible user experience which will win over and retain more customers. You can always propose a trial run or pilot UX prototyping process and then evaluate the outcome of it to see how it saved your organization time and money while delivering an improved and more accessible user experience.

### Does manual prototyping make sense now that we can use Generative AI for it?

To me prototyping is one of those fun things, almost like making art or music, that I enjoy doing and get a lot of value out of. It's meaningful work to me and is not something that I want to automate with Generative AI.

I always learn from the prototyping process. Although it's UX focused, there are always technical learnings I gain that I can relay to the engineer building the finished product (including myself!). Automating the creation of prototypes may still result in technical learnings, but I find that I learn best when writing code than reading or reviewing it.

It's important to be aware of things that AI may fall short on. One is accessibility, given that much of the code LLMs have been trained on has accessibility issues or is out right inaccessible. Being knowledgable of accessibility can help you course correct here, but why not write the code to be accessible from the start, especially if it's a requirement of building the final product or if you are user testing with people with disabilities (which you [really should be doing](#))?

### What types of tools should I use for UX Prototyping?

The answer to this question is simple and straightforward: the ones you're comfortable with. This could be a simple [Codepen](#) using only HTML and CSS. Maybe that gets augmented using a component library from your organization's design system to keep things looking polished and to avoid rewriting your own UI components. If you're more comfortable with modern frontend tooling, I've found [Vite starter projects](#) to a be perfect way to get going with a framework of your choice. In the past I've reached for [Observable Notebooks](#) for prototypes that rely on data transformation and manipulation and/or data visualization, I've found the reactive programming nature of these notebooks to be helpful and a productivity boost.

Lately I've been pretty happy using Vite, TypeScript, and Svelte for UX prototyping. For my day to day protoyping work at Esri I use a [template I've created](#) that incorporates these tools as well as the Esri JS SDK, map components, and Calcite (design system) components. The template includes a git pre-commit hook for linting and formatting code using ESLint and Prettier, which helps me keep my code neat from the start. It also has some boilerplate features I tend to use across different prototypes such as reading URL query params or hash to load the prototype in a specific state.

I tend to deploy my prototypes as static websites (meaning no backend APIs that require a separate server as part of the prototype) to free website hosting services like [Netlify](#) or [Github Pages](#) when I need to share them with others. Usually the prototyping work I'm doing doesn't contain any sensitive data or intellectual property so it isn't a concern for these sites to be public. When that is a concern I'll deploy in a way that is only accessible internally to folks at Esri.

## Further Reading

Thanks for reading! Be sure to remember that "a prototype is worth a thousand meetings" (another bit of wisdom thrown around by Google's UX Engineers).

- https://blog.adobe.com/en/publish/2017/11/29/prototyping-difference-low-fidelity-high-fidelity-prototypes-use
- https://www.youtube.com/watch?v=su6WA0kUUJE
- https://medium.com/google-design/google-maps-cb0326d165f5
- https://design.google/library/why-google-needs-ux-engineers
