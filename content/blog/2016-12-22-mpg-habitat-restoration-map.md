---
title: "Habitat Restoration Map for MPG Ranch"
# layout: page
date: 2016-12-22
teaser: "An interactive web map to promote the work of environmental scientists and conservationists"
header: no
comments: true
tags:
  - Web Mapping
  - React JS
  - Leaflet JS
  - CARTO
  - AWS
  - NodeJS
  - Heroku
---

![the MPG Ranch Habitat Restoration Map app]({{site.urlimg}}mpg-habitat-01-overview.jpg)

> The MPG Ranch Habitat Restoration Map enables a team of environmental scientists to effectively
communicate ongoing management plans and actions with their stakeholders and provides
a venue for discussion of restoration research and practices through an interactive
web map application.

I created the [MPG Ranch Habitat Restoration Map](http://restorationmap.mpgranch.com/)
while working for the world renowned data visualization, interactive mapping, and design firm
[Stamen Design](http://stamen.com). The following post describes what the app
was built with as well as how it's various pieces, companion web app (*The Slide Builder*),
and shared React slides-component fit together.

## About MPG Ranch:
![photo of mpg-ranch]({{site.urlimg}}mpg-ranch-elk-herd.jpeg)
*An elk herd roaming over MPG Ranch in the winter, photo credit: Teagan Hayes*

> Set in the heart of Montana’s Bitterroot Valley, MPG Ranch lies on over
14,000 acres of rich undeveloped landscape. Established in 2009
and privately owned, MPG strives to preserve the natural
communities that make this area beautiful and focuses on research
to restore and protect native diversity.

This web app involved solving a multitude of technical problems, including integrating:

- a Shapefile of 60+ management unit polygons with environmental attribute data
- High resolution (10cm) aerial imagery of the ranch
- Raster GIS data representing [NDVI](https://en.wikipedia.org/wiki/Normalized_Difference_Vegetation_Index)
and [solar insolation](https://en.wikipedia.org/wiki/Solar_irradiance)
- Qualitative data on activities, management, plans, and research
- Professional photography of the ranch and activities
- Report slide decks that document research and restoration work on the ranch

To solve these development challenges a modern web stack was used that included
the following front-end libraries and tooling:

- **React** for building out UI components
- **Redux** for managing application state
- **Leaflet** for displaying geographic data and handling map interactions
- **EMCAScript 2015 (ES6)** for leveraging the latest features in Javascript
- **Gulp, Browserify,** and **Babel** as a front-end build system

and the following "backend" web services:

- **Google Forms** for allowing the client to enter qualitative data by management unit
- **[CARTO](https://carto.com)** for syncing tables generated from Google Forms
and for hosting vector geospatial data
- **CARTO's [SQL API](https://carto.com/docs/carto-engine/sql-api)** for
fetching data to load into the application
- The **[AWS Lambda Tiler](https://hi.stamen.com/stamen-aws-lambda-tiler-blog-post-76fc1138a145#.n8xuphpze)**
for serving tiles generated from aerial imagery and raster data

## Habitat Restoration Map Features

The map allows a user to view various information about the ranch as a whole as
well as individual "management units." Users may click on a management unit polygon
to bring up a detail pane which displays that unit's photo carousel, environmental data,
management activities, activities or "actions," and report slide decks.

![habitat map landing]({{site.urlimg}}mpg-habitat02.jpg)
*Default application state*

![habitat map mouseover and click on a mu polygon]({{site.urlimg}}mpg-habitat13.jpg)
*Mousing over a management unit polygon*

![habitat map detail pane]({{site.urlimg}}mpg-habitat14.jpg)
*Management Unit detail pane opens after clicking on a polygon*

#### Alternatively, a user may search for a management unit by typing in a text input field and browsing results in a list.

![habitat map search by unit name]({{site.urlimg}}mpg-habitat15.jpg)
*Searching by a management unit name via a text input and dropdown*

![]({{site.urlimg}}mpg-habitat16.jpg)
*Clicking a management unit list item brings up the detail pane*

#### Photo carousels may be opened in a lightbox mode to be viewed at a larger size.

![habitat map lightbox]({{site.urlimg}}mpg-habitat05.jpg)
*Photo carousel in lightbox mode*

#### Various map layers may be toggled as well, including high resolution satellite imagery, NDVI, solar radiation, and terrain.

![habitat map ndvi raster layer]({{site.urlimg}}mpg-habitat06.jpg)
*Toggling the NDVI raster layer*

![habitat map solar insolation raster layer]({{site.urlimg}}mpg-habitat07.jpg)
*Toggling the solar insolation raster layer*

![habitat map ndvi zoomed in]({{site.urlimg}}mpg-habitat08.jpg)
*Zoomed in view of the NDVI raster layer*

#### Clicking on a list item in the Recent Actions pane will zoom the map to the polygon and open the detail pane for that action item's corresponding management unit.

![habitat map clicking a recent action item]({{site.urlimg}}mpg-habitat17.jpg)
*Mousing over a list item in the Recent Actions pane in the lower left corner*

![habitat map detail pane opened to recent actions after clicking a recent action item]({{site.urlimg}}mpg-habitat18.jpg)
*Map pans and zooms, opens the detail pane's Actions section after clicking a Recent Action item*

## Slide Builder App
In addition to the Habitat Restoration Map, I built a fully separate web app, the
"Slide Builder App." This web app allows for MPG's habitat restoration team to streamline
the creation of research and progress reports, without using desktop software such as
MS Powerpoint. The habitat restoration team found that this new approach saved them a
great deal of time and frustration when creating reports, a task they previously had dreaded!

![slide builder app]({{site.urlimg}}mpg-slide-builder-overview.jpg)

The Slide Builder web app was built using:

- React & Redux
- React Bootstrap
- Marked
- Heroku
- NodeJS
- Express
- CARTO SQL API

Reports are generated through a simple interface; a form on the left lets the user select
a slide layout type (title, portrait, landscape, or text only) while a preview of the slide is displayed
on the right. The user may navigate through the slide deck as slides are created and edit
or remove slides as desired. Previously created slide decks may be loaded, edited, or deleted.
Using my imagination and the React Bootstrap library helped me develop the interface
fairly quickly without having to consult a wireframe or design mock up.

![slide builder app - landing screen]({{site.urlimg}}mpg-slide-builder01.jpg)
*Slide Builder app landing screen*

![slide builder app - creating a new report]({{site.urlimg}}mpg-slide-builder02.jpg)
*Creating a new report*

![slide builder app - filling out report metadata]({{site.urlimg}}mpg-slide-builder03.jpg)
*Filling out report metadata*

![slide builder app - editing the title slide]({{site.urlimg}}mpg-slide-builder04.jpg)
*Editing the title slide*

![slide builder app - publishing a slide deck]({{site.urlimg}}mpg-slide-builder05.jpg)
*Publishing a report slide deck*

![slide builder app - publishing success!]({{site.urlimg}}mpg-slide-builder06.jpg)
*Notifying the user that the deck was successfully published*

#### When saved, the reports are stored as JSON data in CARTO, then loaded into the Habitat Restoration Map.

Due to the Slide Builder App's requirement of POSTing data to MPG's CARTO account, a Node JS Express
proxy server is used to keep MPG's CARTO API Key secure. The Slide Builder App runs on [Heroku](https://www.heroku.com/)
as a private web app through Heroku's [wwwhisper](https://devcenter.heroku.com/articles/wwwhisper)
add on, there by only allowing MPG Ranch employees to access it. After a report has been created
and marked as "published", the report data will be fetched by the Habitat
Restoration Map web app. When the user clicks a link for a report, the report data
is rendered as a slide deck and displayed within a lightbox:

![habitat map displaying a report slide deck 1]({{site.urlimg}}mpg-habitat09.jpg)

![habitat map displaying a report slide deck 2]({{site.urlimg}}mpg-habitat10.jpg)

![habitat map displaying a report slide deck 3]({{site.urlimg}}mpg-habitat11.jpg)

![habitat map displaying a report slide deck 4]({{site.urlimg}}mpg-habitat12.jpg)

## React Slides Component

In order to integrate and maintain consistency with the slide deck code shared by
the two separate web applications, I created a Slides Component in React which consumes
JSON data for a report and renders a slide show from that data. Using
[NPM](https://www.npmjs.com/) and Github, the slides component can be
installed as a private module in both applications, as well as developed locally
separate from either application for debugging and development purposes. I found the
process of using Github with NPM far less painful then attempting to develop the
Slides Component as a local NPM module.

![slides component placeholder]({{site.urlimg}}mpg-slides-component01.jpg)

#### A slide deck is represented by an array of objects, where each object represents a particular slide:

```json
{
	"id": "e0731c66-104a-4a0f-9e9f-c15e0bbdf1a5",
	"saved": true,
	"slideTitle": "TEST REPORT DECK",
	"slideText": "Lorem ipsum dolor. Sit amet ornare...",
	"imgToken": "Ae10uZmnq",
	"slideType": "title",
	"reportTitle": "Test Report",
	"authors": "Chuck Norris"
}
```

The source code for the Slides Component is compiled to a single file and made UMD friendly
via Webpack and Babel, allowing for it to be loaded as its own
module in both the Habitat Restoration Map and Slides Builder App. In order to
enable Heroku to install the private git module for the Slides Builder App,
`preinstall` and `postinstall` Bash scripts are used to create and then destroy
an SSH environment, keeping credentials out of Git while not having to go the
potentially painstaking route of using a custom Heroku Build Pack.
[This answer on Stack Overflow](http://stackoverflow.com/questions/10869796/npm-private-git-module-on-heroku/29677091#29677091)
describes the process, and it worked well each time I deployed the Slide Builder
App on Heroku.

## Conclusion

Overall, this was a challenging project due to its many requirements and moving parts.
Working closely with [Nicolette Hayes](http://stamen.com/about/who/nicolette-hayes/),
a talented UI/UX designer at Stamen Design, made it possible to rapidly prototype
various features of and iterate on building the applications. The client, the habitat restoration
team at MPG Ranch, ended up being very pleased with both the Habitat Restoration Map and
Slide Builder app. Both apps are still under development and continue to serve the
restoration team, enabling them to share their work with the general public, colleagues, and ranch owner.
This app could very well serve as a prototype for a platform that allows rural land owners
and/or environmental restoration advocates to coordinate and share their work and research.
