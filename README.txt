Instructions to run :
1. Run (pnpm i) or (npm i) command in the root of the project
2. Run (pnpm run dev) or (npm run dev) in the root of the project
*. I suggest using Los Angeles as a city to test the app. The API has limited data about less famous cities.

Design decisions :

This app was developed with request caching , error handling and some user preference choices in mind to provide a smooth user experience and dark mode to keep the app usable at all times. Multiple languages are also supported as a part of UX and user preferences. Theme and user preferences is persistent is using zustand state manager and can be expanded.

Challenges: 

The main challenge of the app was to keep location and weather data in sync and achieved using React-Query's query key.