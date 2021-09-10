# ☀️ Find The Sun UI ☀️

This app is built with:

-   [https://nextjs.org/](Next.js)
-   [https://www.mapbox.com/](Mapbox)
-   [https://tailwindcss.com/](TailwindCSS)
-   [https://www.typescriptlang.org/](Typescript)

### 🚧 Installation Locally

1. Make sure you have Node installed on your system
2. Clone this repository
3. `npm install` or `yarn i`
4. `npm run dev` or `yarn dev`
5. Open a web browser to http://localhost:3000

### ⚙️ Deployment to Vercel

This app is deployed with [https://vercel.com/](Vercel). You can fork this repo and add your fork'd repo to your own Vercel config to automatically deploy on pushing changes to the repository.

### Considerations

Some of the Mapbox stuff really cut into my time here, so I limited the scope of features to make sure I stayed within an 8-hour window.

Some changes I would make given more time:

-   Separate out the `Home` component into a few smaller components to clean up the HTML a bit
-   Have a cleaner-looking error screen that's more descriptive
-   Ensure that the Sun can't be marked off the map (can control this with map zoom levels and some more testing to see thresholds properly)
-   Add some fancier animation especially to showing the map result
-   Make the maps dynamic instead of static images
-   Not commit my Mapbox API key into the repo (this is a toy example and I can kill the token after showing this off)
