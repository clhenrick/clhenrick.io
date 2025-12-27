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

## Introduction

This is a topic that I have been meaning to write for quite a while and one I'm pretty passionate about. Much of it comes out of my personal experience from working in the tech industry over the past decade or so, and before that while attending the MFA Design and Technology program at Parsons School of Design in New York City. Some of the ideas here were inspired by a conversation I had with my former manager at Google, Ryan Kuykendall, a vetern UX Engineer who managed a team of UX Engineers on Google Cloud. Additionally, I've experienced some misconceptions around prototyping for the web, which has also motivated me to write this post. I hope what follows is useful for folks out there who work on creating things for the web, particularly those with a design and/or front-end web development background.

## What do I mean by "prototype" and "prototyping"?

Before getting into the weeds too deeply I would like to clarify the usage of the words "prototype" and "prototyping" in the context of this blog post.

Here's what [Wikipedia has to say about the word prototype](https://en.wikipedia.org/wiki/Prototype):

> A prototype is an early sample, model, or release of a product built to test a concept or process. It is a term used in a variety of contexts, including semantics, design, electronics, and software programming. A prototype is generally used to evaluate a new design to enhance precision by system analysts and users. Prototyping serves to provide specifications for a real, working system rather than a theoretical one. Physical prototyping has a long history, and paper prototyping and virtual prototyping now extensively complement it. In some design workflow models, creating a prototype (a process sometimes called materialization) is the step between the formalization and the evaluation of an idea.

Through out this post I will be referring to the "software programming" and UI/UX "design" aspects of prototype and prototyping, specifically in the realm of web application development.

From my personal experience, within the context of software development and UI/UX design, a prototype most often takes the form of a digital artifact that designers and/or developers (or a hybrid designer - developer, AKA Design Engineer, UX Engineer, Design Technologist, etc.) will create. The purpose of the prototype might be for user testing, to get various interested parties on the same page about what is being proposed, and/or ironing out how well a design concept holds up or not beyond static mocks and wireframes. I'll refer to prototyping for these purposes as **_UX prototyping_**.

In the world of software development and closely related to UX prototyping is the concept of "technical prototyping", which specifically focuses on figuring out **_how_** to solve a problem. This may also be referred to as creating a "proof of concept." In software development, technical prototyping is all about the code you write. There may not even be a UI or UX design aspect to it, although there often is, at least when user interfaces are involved. Technical prototypes often, but not always, reside in a branch of the production codebase that gets scrutinized during code reviews while UX prototypes are more often created outside the production codebase with their code quality being less of a concern since they are viewed as design artifacts and research.

It's worth noting however that gaining technical insights is often one benefit of going through the UX prototyping process, _when prototyping with code_. When prototyping with HTML, CSS, and JavaScript we still are solving technical problem and arguably still writing software. For example, this may include figuring out an adaptive / responsive layout using CSS Grid and/or Flexbox, evaluating whether a design concept will provide a good user experience for users of screen reader software, or if a data visualization or dashboard will respond well to the actual data it is intended to represent.

To distinguish between these two types of prototypes, I often will use the term **UX prototyping** when refering to the UI/UX design focused prototype and **technical prototyping** when referring to the "code you write" and "proof of concept" type of prototype.

To be even more clear about what UX prototyping is, I'll elaborate on **_what it is not:_**

- It's not "vibe coding" or having generative AI tools prototype for you (more on that later).

- It's not "rapid prototyping" (like in industrial design), as we are still writing software and even a relatively simple prototype made with code takes thought and time to create.

- It's not a "click through prototype" made with design software like Figma. Click through prototypes have value for certain use cases beyond static mocks, for example conveying the proposed steps in a task completion workflow or how a website navigation might work. They tend to fall short in other areas such as data driven interfaces (e.g. dashboards, geographic maps, etc.) that consume real world data to evaluate whether a design holds up.

This last point exemplifies why we prefer using web standards such as semantic HTML, CSS, JavaScript, browser APIs, etc. for UX prototyping. It allows us to get "closer to the metal" and uncover pitfalls we might not have thought of or discovered using design software alone when investigating a problem space or a new feature for a product. It's extremely helpful and time saving to uncover problems with a proposed design concept in a UX prototype than in production code since generally speaking it's more costly to iterate on production code than with "throw away" prototype code.

The time differential of prototyping inside or outside of production codebases is a by product of the checks and processes that are enforced in production codebases. Automated code linting, formatting, type checking, tests, code reviews, and CI/CD pipelines are great for preventing breaking changes from being introduced into the production codebase and for giving your team an opportunity to give feedback on new work. However, this all comes at a cost: making changes to production code takes more time, and as the saying goes, "time is money". Making further changes or reverting previous changes to production code after learning that the user experience or accessibility of a new feature is poor is even more costly. By discovering unforeseen technical, accessibility, or UX issues in a prototype you can address them early and quickly. This is invaluable for saving time and resources, especially within larger production codebases.

It's worth noting that while code quality isn't a primary concern of UX prototyping, it doesn't mean you can't or shouldn't have good code quality when prototyping, especially if you sense that the prototype may grow more elaborate and complex after it has been shared and reviewed.

I want to make it absolutely clear that the most important aspect of UX prototyping is solving for the _user experience_. We want to make sure what we're thinking about building makes sense, that it is what people expect or will want to use (e.g. from usability testing), and/or to get various interested parties (internally and/or externally) on the same page on what is being built. The phrase _"build the right thing" vs "build the thing right"_ was one thrown around at Google's UX division a lot when I was working there that I think succinctly gets this point across. Only focusing on _how to build the thing_ (e.g. framework, architecture, etc.) is moot if _what you're building_ (the end product) isn't what your target audience wants to use and ends up frustrating them, resulting in them abandoning your product.

## Types of UX Prototypes

Let's talk about different types of UX prototypes that exist in the wild and that you might reach for in the prototyping process. Here are some examples:

- **Animation & motion**: investigating what's possible with CSS or JavaScript animation to delight users, as well as to make sure there is still a good user experience when the animation or motion is turned off for users who have the [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting in their device enabled.

- **Data focused / driven**: e.g. with an interactive dashboard or geographic mapping application, this could be verifying that the design concept works with the real world data the product will be using. Avoid using mock / made up data if at all possible in these types of prototypes as it won't give you the same results.

- **Visual fidelity**: responsive design falls in this category, but generally this is about making things look aesthetically pleasing and professionally designed. How pixel perfect are we concerned with when implementing the design? What is the margin of error we have to accommodate the plethora of devices and browsers people use? Does it need to look good on a wide screen television or large touch interface at a museum? Does it need to be legible on a small wearable device such as an Apple watch? How does the device or viewport size affect the overall user experience?

- **Interaction / task completion**: for example, evaluating a user interface for customizing keyboard shortcuts for a web application or searching for various types of government services available near where one lives.

- **Accessibility**: evaluating whether or not a proposed UI design or workflow is [accessible for users with disabilities](https://www.w3.org/WAI/fundamentals/accessibility-intro/). Given that an [estimated 1.3 billion people or 16% of the global population currently experience a significant disability](https://www.who.int/health-topics/disability#tab=tab_1:~:text=1.3%20billion%20people%20%E2%80%93%20about%2016%25%20of%20the%20global%20population), we should be striving to make digital products inclusive as possible.

- **The "kitchen sink"**: this means combining most or all of the above into a single prototype. This should generally be avoided, however at times it has value and can be warranted.

### More on the kitchen sink approach

A bit more on why it's best to avoid the kitchen sink, but also why it can be useful in certain times:

- There is a risk of the prototype too closely mirroring the production code. As a result it requires frequent upkeep to be kept up to date with the actual product.

- The prototype becomes unwieldy to maintain due to code bloat. Prototype code is generally written in a "quick and dirty" manner in comparison to production code, so it doesn't scale well unless you're maintaining code quality from the start or have additional time for refactoring.

- Using the kitchen sink approach may be a sign that the scope of the prototype's accompanying research is too broad and should be narrowed. UX Design research is most often qualitative in nature, so too many mixed signals can make the research data unwieldy to decode and analyze.

That being said, there is a place and time for the kitchen sink prototyping approach. Maybe it's mimicing a desktop or mobile application with a web app that's easier to make changes to. Often in UX Prototyping we need to give the illusion that the prototype is the product to convince testers that is what they are using "is real" in a user testing setting. After all, updating prototype code is still less costly then production code churn.

## Benefits of UX prototyping

Some benefits of UX prototyping have already been covered in this post but I feel that it's worth listing them for easy reference.

- **Saving engineering time** by bringing clarity and certainty prior to building the feature in the production code.

- **Avoiding redoing production code** after determining a feature needs to be reworked because of a less than desirable user experience.

- **Risk mitigation** by identifying if something is or isn't working before shipping it.

- **Aligning interested parties** on what is being built to reduce ambiguity and gain buy in.

- **Addressing the rift between design and engineering**. For example, prototyping can be an effective means to advocate for user experience to engineering and/or better convey technical constraints to designers.

- **Utilizing both of one's design and development skills**. Too often we are siloed into a strict role (developer or designer) and don't get to flex our complimentary skills. UX prototyping is an opportunity to do just that.

- **Iterating quickly** without being hindered by slow build processes, code reviews, tests, type safety, code linting, etc. In my personal experience this has often felt like a breath of fresh air after working in production codebases that have established patterns and processes for integrating new code.

- **Evaluating the accessibility** of a proposed design concept, workflow, new user interface component, chart or data visualization, etc. Since design tools such as Figma do not output accessible code, it's the responsibility of those of us who write and understand front-end code to make sure we are delivering code that follows [best practices for accessibility](https://www.a11yproject.com/checklist/) and meets the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/). When using code to prototype we can run automated accessibility checks on the code as well as test it using screen reader software and the keyboard only. We can enlarge the font size and zoom the browser to see how things hold up or don't. We can even do user testing with people who have disabilities to verify the level accessibility and usability of the design concept.

- **Internationalization (i18n) & localization (l10n):** what happens to the design when it is translated to different languages? Especially when "right to left" (RTL) languages such as Arabic and Hebrew are used in the design in place of English? When translating any written text, whether it's labels, instructional text, placeholder text, etc. from English to other languages we have to be mindful that the space requirements for text will most likely be greater. Our design should plan for this to ensure that users of non-English languages are still able to use our product. Luckily for developers there are JavaScript libraries, CSS features, and browser APIs for handling i18n and l10n that make this a problem UX prototyping can effectively address.

Again, the largest benefit of UX prototyping is improving the usability of the product you are working on. It's about making sure that the design concept is robust and accomplishing the product goal(s). UX prototyping provides an opportunity to have deeper and more nuanced conversations with your team on what is being built and why, as well as re-evaluating and iterating on design concepts early and more quickly.

## Potential Drawbacks of UX Prototyping

I honestly have not found there to be too many drawbacks from going through the process of UX Prototyping when _it is warranted._ That being said, at times things may go awry or have unintended consequences. So I'll play devil's advocate and give some examples.

### Misalignment

If the purpose or goal(s) of the prototyping process are not clear or well defined, then the end results may not be fruitful or could become misaligned with the product goals. It's important for establishing a clear set of goals for UX prototyping _from the start_ so that it's distinguishable from a "proof of concept" prototype or technical prototype. Again, the primary purpose of **UX prototyping** is to assist with answering _"are we building the **right thing**?"_, not so much as _"are we building the **thing right**?"_. Determining technical feasibility may certainly be part of the process, but it is not the primary goal. The focus should be on usability and whether a concept acheives the product goals.

### The prototype becomes the product

The most likely reason for this happening is running out of time and/or resources. This isn't necessarily a bad thing and could be totally fine given the situation. In the past when I've worked at smaller companies that focus on delivering client project work, the initial prototype often ends up becoming the final product due to budget constraints and more attention given to pleasing the client then the maintainability or scalability of the code that was written.

For "greenfield" projects (meaning projects where you are starting from a clean slate) the prototype being the final product is often okay, as long as it isn't (too) buggy and meets the requirements for the project. It might even be "good enough" to sell to people as a pitch for a more long term project, such as in a start up or business venture. However, if the prototype does become the final project and resources are never devoted to refactoring and cleaning up the code to make it more scalable, secure, and performant, then technical debt from the prototype will likely come back to haunt you later.

### Prototyping in the production codebase

Sometimes it can be more productive to do prototyping work in the production codebase and then refactor and/or clean up the code after the prototype is approved. At times it may even be too difficult to prototype outside of the production codebase for some reason. For example if you need to incorporate an existing system that is only available in the production codebase to make the prototype functional.

Prototyping in the production codebase requires that you are very comfortable with at least the area of the codebase you are working in, as well as are able to work within the constraints of the architecture and processes your team has put in place. There's nothing wrong with doing this, so if this works for you by all means go for it! My personal preference has been to break down problems into smaller pieces and work outside production code when prototyping so that I don't feel bogged down by things like technical debt, complex architecture, slow build times, and processes such as automated tests, code quality adherence, and code reviews. If I'm also building the production feature, I'm usually okay with refactoring prototype code I wrote outside of the production codebase back into it.

### Not having a design job title

I will acknowledge that prototyping with code for UX purposes as someone with a design degree but without a design job title takes self advocacy, building raport with others, and a little persuasion. In the tech industry we tend to be siloed into very narrow roles such as "designer" and "engineer." We often aren't given room for stepping outside of what our day to day responsibilities are, which can make pitching the UX prototyping process difficult if you are not a designer.

Building a strong case for why UX prototyping can improve both the design process and the end product will help win over people who are skeptical about allocating time and resources for it. Setting a time limit on prototyping work can also help, for example 10-20% of your time for however many weeks. Typically once you show the finished prototype (or at least first iteration of it) and people are able to interact with it, they will see the value in it and tend to be more receptive to doing it in the future. It's hard to convince people of something that's valuable when they haven't yet experienced it, but it can be done.

On the other hand, if you are a designer who can code you will probably make a bigger impression, at least in organizations that have more of an engineering culture.

## My personal experience with UX prototyping

My experience with UX prototyping has over a decade long history at this point. I feel that it's worth highlighting a couple experiences from my career thus far that relates to this: working at Google as a UX Engineer and in my current role as a Senior Software Development Engineer at Environmental Systems Research Inc (Esri).

### Prototyping full time as a UX Engineer at Google

Working as a UX Engineer (UXE) at Google was a very unique experience and I feel privileged for having been able to do it. In a nutshell, my entire day was centered around prototyping and not writing any production code! I'm sure this is surprising to some people reading this, but yes I assure you that this type of role actually exists. It usually resides in larger companies that have resources to dedicate to it. However, this doesn't mean you need to have a dedicated prototyping role to do this type of work, as I'll discuss when I get to my current role at Esri.

My prototyping work at Google as a UXE ninety-five percent of the time involved using HTML, CSS, JavaScript or TypeScript; various front-end frameworks such as React, Angular, Vue, and Lit / Web Components; and build tools like Webpack or Google's internal ones like blaze. Occassionally I would reach for design software such as Sketch or Figma to do wireframes. Other times I might utilize Collab (Jupyter) Notebooks for data analysis and transformation when a project was data heavy.

The choice of tech used to prototype wasn't so important as finished prototypes were viewed as design artifacts and the code written to create them was viewed as "throw away code" that would never see the light of day (other than perhaps a usability test). At Google the software engineers building the final product would write production code as they saw fit with the tech they felt was best suited using Google's various front-end tools and frameworks. From my experience, and from what I heard from other UXEs at Google, this mismatch between prototyping tech and production tech didn't typically cause problems as UXEs were expected to effectively communicate any technical details to software engineers if needed. Again, the primary purpose of a prototype was to help everyone involved in the product lifecycle better understand what was to be made before making it and iron out any ambiguities. Writing code purely for creating design artifacts wasn't seen as problematic or a waste of resources.

While working as a UXE I was embedded in Google's UX Design org and worked closely with folks in different types of roles, mostly in the UX realm. This included UX designers and visual designers, UX researchers (both quantitative and qualitative), product managers, content writers, and occassionally software engineers. It was a very collaborative environment to say the least! I've found that I thrive in a healthy and open collaborative environment; it's much more enjoyable to me than being siloed as a front-end engineer working only on production code related tasks and not being able to give input into the design process.

One example of prototype work I did while at Google was for creating a keyboard shortcut user interface that allowed users of Google Cloud to remap keys for various commands in the Cloud console. The prototype I created was intended to be evaluated for accessibility by keyboard users and screen reader users. I was lucky enough to sit in on some usability testing with a researcher to see how the prototype held up to users' expectations. It was a very eye opening experience and helped me understand the importance of digital accessibility and its impact on everyday people.

### Prototyping the Activity Map Block

In my current role as a Senior Software Engineer at [Esri](https://www.esri.com/) my work hasn't strictly focused on UX prototyping, but I leverage it whenever I feel that a problem space or design concept would benefit from it. At this point I feel I have a fairly good intuition for this and can justify it to others when needed.

A particularly successful prototyping example from my tenure at Esri is when I prototyped the "Activity Map" block for [StoryMaps.com](https://storymaps.com), a web and mobile application for, ahem, telling stories with (or without) maps. Unfortunately, StoryMaps.com was sunsetted in July of 2025, so this feature is no longer available to view live. However, you may [view a screen recording of the Activity Map block](/work/storymaps-activity-map-block/) in my portfolio.

The concept of a "block" in StoryMaps is similar to a building block for a larger structure. When creating a story, authors may choose from various block types such as rich text, image galleries, video embeds, interactive geographic maps, and map tours to make their story media rich and immersive. The Activity Map block was a new block type that allowed an author to upload activity data (in the form of a [GPX file](https://en.wikipedia.org/wiki/GPS_Exchange_Format)) from apps such as [Strava](https://www.strava.com) or [Ride With GPS](https://ridewithgps.com) to create a preconfigured dashboard showing a map of an activity (like a bicycle ride, hike, or run) along with some summary statistics and an elevation profile chart.

{% set caption %}
The Activity Map block was a pre-configured dashboard that incorporated a geographic map showing the gpx track of the activity, an elevation profile chart, statistics for total distance, elapsed time, and elevation gain. Its style (basemap, colors, and typography) matched the theme of the story it was embedded in and could be customized by the user.
{% endset %}

{% figure caption %}
{% image 'activity-map-01.jpg', 'Screenshot of the Activity Map block with a caption that reads a Sunday afternoon bike ride in the East Bay hills.' %}
{% endfigure %}

In the prototyping process for the Activity Map block I uncovered some gaps in the preliminary design concept such as:

- **Making sure that the dashboard layout worked on different viewport sizes.** By leveraging [intrinsic web design](https://www.youtube.com/watch?v=AMPKmh98XLY) patterns using [CSS flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/) and/or [CSS Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/), I enabled the various parts of the dashboard rows to stack vertically when the ideal amount of horizontal space was not available. This meant that the information dense components such as the map and chart wouldn't look squished and become difficult to read or use. Using Flexbox and Grid for the design's layout allowed it to be responsive without relying on CSS media queries, which made the layout more resilient for the wide variety of device sizes and different ways users size their browser windows.

- **Testing how the design concept held up to real data**. Building a web prototype capable of loading various GPX data created by real people helped our team evaluate how the design concept held up to real world data. Typically static design mocks created to represent data heavy UI such as dashboards depict a best case scenario and don't account for common variations in data such as outliers and number of data points. This is where prototyping using real data can serve as a sanity check to a data driven design concept.

- **Proposing design improvements to the elevation profile chart**. The original design of the chart was quite minimal, so I suggested minor design adjustments to help make the chart more readable which were incorporated into the final design. Small tweaks such as adding y axis grid lines and incorporating the units of the x and y axes helped make the chart more understandable to the user. Proposing how we could programatically generate "alt text" (an accessible name and description) for the chart to help make it more accessible to users of assistive tech was another win.

- **Verifying that the design met baseline accessibility standards**. Prototyping with code meant I used semantic HTML for the block's layout, determined what parts required accessible names, ensured there was a logical focus order, tested interacting with it via keyboard only and screen reader software such as NVDA, Voice Over, and JAWS. This is a crucial part of designing for the web and for meeting the Web Content Accessibility Guidelines that design software and static design mocks tend to fall short in. Generally speaking, developers tend to be more knowledgable about how HTML and CSS can be used to make design concepts more accessible. It's our duty to relay this information to the designer(s) we are working with and to the rest of our team to ensure what we're making is more accessible and inclusive.

While going through the UX protoyping process with the Activity Map, there were technical learnings I took away and incorporated into the final production code, such as:

- Determining how to utilize the ArcGIS JS SDK's [`ElevationProfileViewModel`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ElevationProfile-ElevationProfileViewModel.html) with [D3JS](http://d3js.org/) and [ReactJS](https://react.dev) to create a customized elevation profile chart that aligned with the Activity Map's overall design. I also uncovered an undocumented constraint of the `ElevationProfileViewModel` that relates to the maximum amount of data points it can consume which saved us from having to fix a potential bug later.

- Addressing data transformation and storage, including reducing the amount of activity GPX / JSON data stored for the elevation profile and map, which improved performance when the Activity Map loaded but still kept the feature usable and useful.

In total I created _three separate prototypes_ before building out the production code to address various levels of uncertainty in the original design concept. Putting in the extra bit of time to prototype ahead of writing production code made the software development process go much more quickly with fewer unknowns and less uncertainty. It also helped get everyone involved with the project (designers, product engineers, myself, tech lead, and CTO) on the same page about what we were building and how it intended to function, _before we released it into the wild_. We had very few issues after releasing the feature and did not have to rewrite or redesign any part of it. I think that's proof enough of demonstrating the value of UX prototyping and prototyping in general!

## Frequently Asked Questions on Prototyping

### How do I get my organization to green light prototyping?

When unsure whether your organization will buy into UX prototyping, ask if there is room for more design and product thinking. Although it has the potential to save time down the road and improve the usability of a product, UX prototyping is an investment and requires additional time in the product lifecycle. It can be helpful to identify a clear set of pain points that prototyping is meant to address and to reiterate that addressing them outside of the production codebase will likely save time and money by avoiding churn.

In my own work I've found there is usually a correlation between ambiguity and risk in design and opportunity for reducing risk and uncertainty with UX prototyping. In other words, the more ambiguity and risk there is in a proposed design, it's more likely that UX prototyping will be a beneficial part of the design process and lead to a better outcome in the finished product.

There's always the business case to be made for UX prototyping as you'll likely be saving your company money in the long run. This is not only from avoiding production code churn and reworking design concepts after shipping a feature, but also by delivering an improved and accessible user experience which will win over and retain more customers.

You might propose a trial run or pilot UX prototyping process. Evaluate the outcome of it to see if it saved your organization time and money, while delivering an improved and hopefully more accessible user experience.

### Does writing my own prototypes make sense now that we can use Generative AI for it?

To me, UX prototyping is one of those fun and joyful activities, almost like making art or music, that I enjoy doing and get a lot of value out of. It's meaningful work to me and is not something that I want to automate with Generative AI. Thanks to modern front-end tools like [Vite](https://vite.dev), it's pretty easy to get a [starter project](https://vite.dev/guide/#scaffolding-your-first-vite-project) set up to prototype with your front-end framework of choice (or no framework at all!). I even have my own starter project template for [Svelte and the ArcGIS JS SDK](https://github.com/clhenrick/svelte-arcgis-map-components-demo) that I use as my starting point for new prototype projects at Esri.

It might sound like I'm contradicting myself here as previously I've stated that UX prototype code is typically considered "throw away" code and viewed as a design artifact, so prototype code quality is not a big concern. If this is the case, why should we care about the code an LLM or Generative AI tool outputs for a prototype?

One reason is so we can have greater control over adjusting and updating the prototype. As we iterate on it while incorporating feedback from designers and others on our team, we may want to minutely tweak things, go in a another direction in a separate git branch, and then scrap it and come back to where we were previously. We can make deliberate, intentional choices about the code we write for the problem at hand and do it the way we want it to be done, knowing the trade offs and benefits all the while.

Reason two that I don't use Generative AI for UX prototyping: I always learn from the prototyping process, in particular when I'm writing code. Although it's UX focused, there are always technical learnings I gain that I can relay to an engineer who is building the finished product (including myself!). Automating the creation of prototype code may still result in technical learnings, but I find that I learn best when I'm writing code, rather than reading or reviewing it. Repetition is also how I learn best; the more times I have to write a `fetch()` call to load some data and handle the asynchronous chain of events from it, the more ingrained that pattern becomes in my head and the easier it is to do the next time.

Lastly, many of the prototypes I've created are for design concepts that LLMs are likely to struggle with translating into code, and honestly I would rather just write the code myself then battle the AI tool to get it to do what I want. The [ArcGIS JS SDK](https://developers.arcgis.com/javascript/latest/), a library I use daily at my job, is a very large JavaScript library that is not super popular outside of Esri and its related technology domains (e.g. interactive geographic maps, Geographic Information Systems, etc.). There isn't much public, production code for it to be trained on and its API is structured a bit differently than similar web mapping libraries such as LeafletJS or MapBoxGLJS, or the Google Maps API. I've learned this library fairly well after using it for three years, but there are still parts of it I'm learning about as it continues to mature. See for instance the fairly new [`@arcgis/map-components`](https://developers.arcgis.com/javascript/latest/references/map-components/) library that is part of the ArcGIS JS SDK.

That being said, if you are going to prototype using Generative AI tools to write code for you, then it's important to be aware of things that AI tools may fall short on. One of these is accessibility; much of the code LLMs have been trained on has accessibility issues or is out right inaccessible. Yes, you can instruct an LLM to pay attention to accessibility, and it will do better, but like any LLM output it should be evaluated and tested the same as human written code. Being knowledgable of accessibility can help you course correct here, but why not write the code to be accessible from the start, especially if it's a requirement of building the final product?

### What types of tools should I use for UX Prototyping?

The answer to this question is simple and straightforward: the ones you're comfortable with. This could be a simple [Codepen](https://codepen.io/) using only HTML and CSS. Maybe that gets augmented using a component library from your organization's design system to keep things looking polished and to avoid rewriting your own UI components. If you're more comfortable with modern front-end tooling, I've found [Vite starter projects](https://vite.dev/guide/#scaffolding-your-first-vite-project) to a be perfect way to get going with a framework of your choice. In the past I've reached for [Observable Notebooks](https://observablehq.com/documentation/notebooks/) for prototypes that rely on data transformation and manipulation and/or data visualization. I've found the reactive programming nature of Observable Notebooks to be a productivity boost and more scalable than a Codepen for solving certain problems.

Lately I've been pretty happy using Vite, TypeScript, and Svelte for UX prototyping. For my day to day protoyping work at Esri I use a [template I've created](https://github.com/clhenrick/svelte-arcgis-map-components-demo) that incorporates these tools as well as the Esri JS SDK, map components, and Calcite (design system) components. The template includes a git pre-commit hook for linting and formatting code using ESLint and Prettier, which helps me keep my code neat from the start. It also has some boilerplate features I tend to use across different prototypes such as reading URL query parameters to load the prototype in a specific state or for enabling feature flags that make it behave differently.

I tend to deploy my prototypes as static websites (meaning no backend code that runs on a server) to free website hosting services like [Netlify](https://www.netlify.com) or [Github Pages](https://docs.github.com/en/pages) when I need to share them with others. Usually the prototyping work I'm doing doesn't contain any sensitive data or intellectual property so it isn't a concern for these sites to be public. When that is a concern I'll deploy in a way that is only accessible internally to folks at Esri.

## Further Reading and Watching

Thanks for reading! Be sure to remember that _"a prototype is worth a thousand meetings"_, another bit of wisdom thrown around by Google's UX Engineers. Here is a list of articles and videos I recommend that speak more about prototyping for UX Design.

- [Designing Intrinsic Layouts by Jen Simmons](https://www.youtube.com/watch?v=AMPKmh98XLY)
- [Prototyping 101: The difference between low-fidelity and high-fidelity prototypes and when to use each by Nick Babich](https://blog.adobe.com/en/publish/2017/11/29/prototyping-difference-low-fidelity-high-fidelity-prototypes-use)
- [Web Design Engineering With the New CSS, by Matthias Ott](https://www.youtube.com/watch?v=su6WA0kUUJE)
- [Prototyping a Smoother Map by Antin Harasymiv](https://medium.com/google-design/google-maps-cb0326d165f5)
- [Why Google Needs UXEs by Jordan Kushins](https://design.google/library/why-google-needs-ux-engineers)
