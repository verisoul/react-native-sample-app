# react-native-sample-app

## Overview

This repo provides a working example of integrating Verisoul's webview into a React Native app built with Expo.

The app opens a hidden webview and loads the Verisoul webview page. The app then listens for a
secure `session_id` message and makes an API call to the Verisoul API to retrieve the account prediction. _The
API call is included as an example but in production this should be done on your backend._

To run the app a Verisoul API Key is required. Schedule a call [here](https://meetings.hubspot.com/henry-legard) to get started.

## Getting Started

1. Clone this repo

```bash
git clone https://github.com/verisoul/react-native-sample-app.git
cd react-native-sample-app
```

2. Configure the app by copying the `.env.example` file to `.env` and setting the correct environment variables

```bash
cp .env.example .env
```

- VERISOUL_ENV: {sandbox, prod}
- VERISOUL_API_KEY: your environment's API key, can be found in the Verisoul dashboard
- VERISOUL_PROJECT_ID: your environment's Project ID, can also be found in the Verisoul dashboard

__Note the Project ID are different between sandbox and production environments__

2. Install dependencies

```bash
npm install
```

3. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)


## Questions and Feedback
Comprehensive documentation about Verisoul's Javascript SDK and API can be found at [docs.verisoul.ai](https://docs.verisoul.ai). Additionally, reach out to Verisoul at [support@verisoul.ai](mailto:support@verisoul.ai) for any questions or feedback.