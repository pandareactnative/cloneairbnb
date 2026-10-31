# Airbnb UI clone

A React Native recreation of the Airbnb guest app: Explore feed with Homes, Experiences and Services, the Where/When/Who search flow, listing details, Wishlists, Trips, Messages and Profile.

Follow [@pandathedeveloper](https://www.instagram.com/pandathedeveloper/) on Instagram for more React Native UI clones.

## Run locally

Use Node 22.22.2 (`nvm use`) and npm. iOS requires Xcode and CocoaPods. Android requires Android Studio, SDK/Build Tools 37, JDK 17 and NDK 27.1.12297006.

```sh
npm ci
cd ios && pod install && cd ..
npm start
```

In another terminal with a simulator or emulator open:

```sh
npm run ios
# or
npm run android
```

Checks: `npm run typecheck`, `npm run lint`, `npm test -- --runInBand`.

## Demo notes

No API keys or accounts are needed. Listings, prices and destinations are bundled sample data. Bookings are demo-only and are never charged; they are kept in session state and appear in Trips. There is no real sign-in, messaging or payment. The Trips map is an illustrated SVG.

An independent UI study, not an official Airbnb app. Trademarks belong to their respective owners.
