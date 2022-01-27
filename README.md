# Screener App

Scan and filter any data from where you want with custom titles, data, timeframes and tags


### Learn Libraries
[Firebase Hosting](https://firebase.google.com/docs) - Website

[Firebase Functions](https://firebase.google.com/docs/functions) - Backend

[Vue 3 With Vite](https://v3.vuejs.org/) - Frontend

[Tailwind CSS](https://tailwindcss.com/) - Frontend

[Vue + Tailwind](https://tailwindcss.com/docs/guides/vue-3-vite) - Frontend


# Setup
```
npm install
cd functions
npm install
firebase use your-target-project
```

Update the [Firebase Config](src/firebase.ts) with the details of your project
```
apiKey: YOUR_API_KEY,
projectId: YOUR_PROJECT_ID
```

# Running Dev Mode
## Dev Mode
### serve web app `vite`
### run back server  `firebase serve --only functions`

## Production Mode
### build app `npm run build && cd dist && move index.html ../functions && cd..`
### run server `firebase serve`

# Deploy to Hosting
`firebase deploy`