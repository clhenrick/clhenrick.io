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

Last year I was fortunate enough to assist with research for keyboard accessible maps at [Esri][Esri] (where I'm currently employed) through creating a set of web prototypes using the [ArcGIS JavaScript SDK][JS SDK] and [SvelteJS][Svelte]. In the past week the production version of this feature landed in the [5.2 release][5.2 release post] of the SDK. You may read more about the keyboard accessibility feature in a separate [Esri blog post][Navigate Maps Your Way: New Keyboard Accessibility Features].

This post discuss the problem of keyboard accessibility in geographic maps, why it was important and difficult to solve, and how the prototypes I developed helped inform the final feature that was just released.

## Accessibility in Web Maps

Interactive, geographic web maps as we think of them today were most likely not originally designed with people with disabilities in mind. Perhaps it stems from traditional cartographic design being a primarily visual medium (although braille maps do exist) and well, abelism.

Web maps have primarily been usable by people who have the ability to use a mouse to interact with them and by those of us whom are sighted. Although it should be acknowledged that web maps may have so called "alt text" associated with them as an alternative to viewing them. Whether the alternative text provides an equivalent experience depends on the context of where and how the map is being used. More recently, attempts have been made to make web maps more accessible to a wider population, including those with disabilities.

For people who are unable to use a mouse or other pointer device, interacting with web maps is most likely not possible if that is the only way one may interact with them. **By including keyboard support for interactions such as navigation and querying what is on the map, we enable the map to be accessible to a wider audience.**

There are plenty of other issues pertaining to the accessibility of web maps such as use of color alone to convey meaning, ensuring sufficient color contrast, and their compatibility with assistive technologies such as braille displays, screen reader, voice control, and screen magnification software. While addressing all of these accessibility and their related usability issues in the domain of web maps are very important, it would be a hefty endeavor to attempt to solve for them all in this post.

Unfortunately it is next to impossible to make something accessible for everyone, but we can do our best to follow guidelines and standards such as WCAG to ensure what we build is more inclusive. This guiding principle is what lead us to add keyboard accessibility to web maps in the ArcGIS JS SDK.

{%- set calloutContent %}
Pssst, for an interesting take on this topic be sure to check out [Audium][Audium], an accessible interactive mapping platform _developed by and for_ folks with vision impairments and other disabilities.
{%- endset %}

{{ callout("FYI", calloutContent) }}

## Concepts

Prior to contributing to the research, UX/UI designer and UX researcher [Klara Schmitt](https://portfolio.klaraschmitt.com) had mocked two different user interface concepts to explore in Figma, what we ended up calling the "Square" and the "Grid" for lack of better naming conventions. We were interested in A/B testing the two concepts to determine which users preferred. While we were primarily focused testing the concpets with 2D maps, we were also interested in testing them with 3D maps since the ArcGIS JS SDK supports both 2D and 3D experiences.

In both concepts the goal is to enable keyboard users to query features overlaid on the map, not the underlying "base map" (a basemap consists of contextual information on the map such as roads, bodies of water, buildings, political boundaries, populated places, etc). A single "feature" could be almost anything in one or more layers that have been added by the map's author, such as a point of interest or other geographic data. This includes all types of geometries common in geospatial data (e.g. points, lines, and polygons).

It's worth mentioning that prior to this research the ArcGIS JS SDK already supported map navigation (zooming and panning) using the arrow keys and plus / minus keys when the map has keyboard focus. That meant we could narrow the prototypes interaction design to querying features on the map.

### "The Square"

The "Square" concept overlays a square shape with a semi transparent fill color in the middle of the map area. When the user performs a query by pressing the space or enter keys, any features overlapping with it are displayed in a pop over. Focus is moved to the popover after the query is performed so that the user may navigate the query results which are presented in a list along with the number of results. Selecting a list item updates the popover to show any available attribute information about that feature.

The size of the square may be adjusted as well as the overlay color and transparency. We also allowed users to change the query method but this seemed to be less of a concern to most folks.

<!-- TODO: name the different types of geospatial query methods -->

### "The Grid"

The "Grid" concept involved overlaying a uniform grid on the map area and allowing users to navigate it using the arrow keys. When a query is performed by pressing the space or enter keys, any features overlapping with the active grid cell are included in a pop over. Users may change the density of the grid as well as the color of the grid lines and fill color of the active grid cell.

## The Prototypes

I created eight stand alone prototypes, each of which were available at distinct URLs. These prototypes included both the Grid and Square concepts, using both a local dataset of vehicle collisions and a pre configured web map hosted on ArcGIS Online, using both 2D and 3D maps.

List of the prototype combinations (concept, map type, dataset):

1. Square 2D map with local dataset
2. Square 2D map with webmap
3. Square 3D map with local dataset
4. Square 3D map with webmap
5. Grid 2D map with local dataset
6. Grid 2D map with webmap
7. Grid 3D map with local dataset
8. Grid 3D map with webmap

We were primarily interested in testing the concepts with 2D maps but felt testing them with 3D would be beneficial for the ArcGIS JS SDK engineering team who would be implementing the production feature. If there were any edge cases that came up with 3D it would be beneficial to know in advance.

### Screenshots

Here are some screen shots of the prototypes of the Grid and Square concepts.

<!-- TODO: screenshots with alt text -->

### Technical details

Both the square and grid overlays were implemented by rendering a custom HTML Canvas layer in the web map's container above all other map layers. Using Svelte Kit (or was it Vite?) I created reusable Svelte components and other modular code that is shared among the prototypes to reduce the overall amount of code for each prototype. I leveraged existing functionality in the ArcGIS JS SDK's [FeatureLayer][FeatureLayer] to [query features][FeatureLayerCreateQuery] that overlapped with the geographic area of the square or active grid cell. The popover component is then programatically opened and populated after a query has successfully resolved. Keyboard focus is programatically moved to the popover when opened and then back to the map container when the popover is closed to enable browsing the query results without having to manually tab to the popover.

## The Final Result

The productionized version of this feature uses the Square concept with an "oreo" style outline and no fill color. The colors and size of the overlay may be customized by the developer using CSS custom properties (variables). The feature is referred to as a "focus region" and can be toggled on and off via a keyboard shortcut by the user. Based on user testing research, the Square concept was preferred over the Grid concept primarily because of its simplicity and less distracting UI. For example, navigating the Grid using the arrow keys conflicted with the existing arrow key panning for the map navigation, so when the grid was enabled the map could not be panned using the keyboard whereas the Square could.

Allowing for panning the map with more sensitivity was another outcome of the research. Keyboard users complained that the existing map navigation (panning) using the arrow keys moved the map area too much and wanted the ability to adjust the map view more incrementally. Using a modifier key with the arrow keys allows for more granular panning of the map area which solved this issue for keyboard users.

## Future Thinking

Both Klara and I are interested in improving the overall interactive web map user experience for assistive technology users. However, for the sake of getting an important accessibility improvement into the ArcGIS JS SDK in a timely manner, Klara and others involved in this project decided focusing solely on keyboard accessibility was a pragmatic first step. We knew that trying to solve for both keyboard users and assistive technology users would be a very large undertaking that would push back any incremental progress on accessibility we could make in the near term. My hope is that in the future we continue to improve the accessibility of web maps in the ArcGIS JS SDK to better support more users.

<!-- links -->

[5.2 release post]: https://www.esri.com/arcgis-blog/products/js-api-arcgis/announcements/arcgis-maps-sdk-for-javascript-whats-new-in-5-2
[Audium]: https://www.audiom.net
[Esri]: https://www.esri.com
[FeatureLayer]: https://developers.arcgis.com/javascript/latest/references/core/layers/FeatureLayer/#FeatureLayer
[FeatureLayerCreateQuery]: https://developers.arcgis.com/javascript/latest/references/core/layers/FeatureLayer/#createQuery
[JS SDK]: https://developers.arcgis.com/javascript/latest/
[LayerView]: https://developers.arcgis.com/javascript/latest/references/core/views/layers/LayerView/
[Svelte]: https://svelte.dev
[Navigate Maps Your Way: New Keyboard Accessibility Features]: https://www.esri.com/arcgis-blog/products/js-api-arcgis/developers/navigate-maps-your-way-new-keyboard-accessibility-features
