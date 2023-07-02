module.exports = {
  name: "helltide-app",
  slug: "helltide-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    backgroundColor: "#2f4858",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_TOKEN,
        },
      },
    ],
  },
  notification: {
    icon: "./assets/notification_icon.png",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/helltide_rises.png",
      backgroundColor: "#000",
    },
    package: "com.igorwessel.helltideapp",
  },
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/notification_icon.png",
        color: "#ffffff",
      },
    ],
    "sentry-expo",
  ],
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "f7f3fd17-1d4e-446b-bcd9-98c88af5616e",
    },
  },
  owner: "igorwessel",
};
