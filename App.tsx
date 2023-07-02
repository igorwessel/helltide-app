import Helltide from "@core/helltide";
import NotificationsManager from "@core/notifications";
import Banner from "@ui/banner";
import HelltideTimer from "@ui/helltide";
import { colors } from "@ui/theme";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Sentry from "sentry-expo";

NotificationsManager.configureHandler();
SplashScreen.preventAutoHideAsync();
Sentry.init({
  dsn: "https://f9e7942065b6415c86f8907abebe1dcf@o4505419154194432.ingest.sentry.io/4505460181368832",
});

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Helltide.init();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style="auto" />
      <Banner />
      <HelltideTimer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
