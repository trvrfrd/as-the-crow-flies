# As the Crow Flies

behold! a half-finished ugly-ass coding challenge from a company I won't name but that you can probably figure out with detective work!

## prompt

"Create a web app that calculates the distance (in nautical miles) between two airports. The app should auto-
complete the airports and should feature all airports in the U.S. only. Bonus: plot the trip on Google maps."

## how to run it

you can't just open index.html because that messes up the JSON data fetching  because of origins or whatever and i'm too lazy to have any kind of build process. so:

1. have npm installed
2. `$ npx http-server`
3. navigate to `localhost:8080` in you browser of choice

or if you have a favorite method of serving a local directory over HTTP, just do that

## todo

- tests!!! oops
- make it not look bad
- desktop/non-mobile styling
- better focus/tab-ing behavior
- actual autocomplete (rather than manually clicking the thing you want)
- refactor/modularize/make not terrible
- have a build process with tools and things
- learn what a nautical mile is

## stretch goals

- google maps integration
- "smart" ordering of autocomplete matches somehow
