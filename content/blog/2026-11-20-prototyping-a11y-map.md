---
title: "Prototyping keyboard accessibility for web maps"
date: 2026-11-20
teaser: ""
tags:
  - Frontend
  - Design
  - Maps
  - Prototyping
  - A11Y
---

{% from "components/callout.njk" import callout %}

## Introduction

Last year I was fortunate enough to assist with research for keyboard accessible maps at [Esri][Esri] (where I'm currently employed) through creating a set of web prototypes using the [ArcGIS JavaScript SDK][JS SDK] and [SvelteJS][Svelte]. Just recently this week the production version of this feature landed in the [5.2 release][5.2 release post] of the SDK. You may read more about the keyboard accessibility feature in a separate [Esri blog post][Navigate Maps Your Way: New Keyboard Accessibility Features].

This post discuss the problem of keyboard accessibility in geographic maps, why it was important and difficult to solve, and how the prototypes I developed helped inform the final feature that was just released.

## Accessibility in Web Maps

Interactive, geographic web maps as we think of them today were not designed with people with disabilities in mind. Perhaps it stems from traditional cartographic design being a primarily visual medium (although braille maps do exist) and well, abelism.

Web maps have primarily been usable by people who have the ability to use a mouse to interact with them and by those of us whom are sighted (web maps may have so called "alt text" associated with them as an alternative to viewing them). More recently, attempts have been made to make web maps more accessible to a wider population, including those with disabilities.

For people who are unable to use a mouse or other pointer device, interacting with web maps may not be possible if that is the only way one may interact with them. **By including keyboard support for interactions such as navigation and querying what is on the map, we enable the map to be accessible to a wider audience, not to mention potentially reduce repetitive stress injuries associated with prolonged mousing.**

There are plenty of other issues pertaining to the accessibility of web maps such as use of color alone to convey meaning, sufficient color contrast, and their compatibility with assistive technologies such as screen readers, braille displays, voice control software, and screen magnification software. While addressing all of these accessibility and their related usability issues are important, it would be a hefty endeavor to attempt to solve for them all in this post.

Unfortunately it is next to impossible to make something accessible for everyone, but we can do our best to follow guidelines and standards such as WCAG to ensure what we build is more inclusive.

{%- set calloutContent %}
Pssst, for an interesting take on this topic be sure to checkout [Audium][Audium], an accessible interactive mapping platform developed by and for folks with vision impairments.
{%- endset %}

{{ callout("FYI", calloutContent) }}

## Concepts

Prior to contributing to the research, the UX/UI designer and UX researcher I worked with, [Klara Schmitt](https://portfolio.klaraschmitt.com), had created two different user interface concepts to explore. We wanted to prototype both of them so that we could A/B test them and determine which concept users preferred. While we were primarily focused with 2D maps, we were also interested in 3D maps since the ArcGIS JS SDK supports both 2D and 3D experiences.

In both concepts the goal is to enable keyboard users to query features overlaid on the map, not the underlying "base map" (base maps consist of contextual information such as roads, labels, buildings, etc). A single "feature" could be anything, such as a point of interest or other geographic data and includes all types of geometries (e.g. points, lines, and polygons).

It's worth mentioning that prior to this research the ArcGIS JS SDK already supported map navigation (zooming and panning) using the arrow keys and plus / minus keys when the map has keyboard focus. That meant we could narrow the prototypes to only querying features on the map.

### "The Square"

The "Square" concept overlays a square shape with a semi transparent fill color in the middle of the map area. When the user performs a query, any features overlapping with it are included in a pop over. Focus is moved to the popover after the query is performed so that the user may navigate the query results which are presented in a list. Selecting a list item updates the popover to show more information about that feature.

The size of the square may be adjusted as well as the overlay color and transparency.

### "The Grid"

The "Grid" concept involved overlaying a uniform grid on the map area and allowing users to navigate it using the arrow keys. When a query is performed by pressing space or enter, any features overlapping with the active grid cell are included in a pop over.

## The Prototypes

Here I've included some screen shots of the prototypes of the Grid and Square concepts.

## The Final Result

The productionized version of this feature uses the Square concept with an "oreo" style outline and no fill color. The colors and size of the overlay may be customized by the developer. The feature is referred to as a "focus region" and can be toggled on and off via a keyboard shortcut.

Enabling panning the map more granularly was another result.

<!-- links -->

[5.2 release post]: https://www.esri.com/arcgis-blog/products/js-api-arcgis/announcements/arcgis-maps-sdk-for-javascript-whats-new-in-5-2
[Audium]: https://www.audiom.net
[Esri]: https://www.esri.com
[JS SDK]: https://developers.arcgis.com/javascript/latest/
[Svelte]: https://svelte.dev
[Navigate Maps Your Way: New Keyboard Accessibility Features]: https://www.esri.com/arcgis-blog/products/js-api-arcgis/developers/navigate-maps-your-way-new-keyboard-accessibility-features
