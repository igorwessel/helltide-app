import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import sub from "date-fns/sub";
import format from "date-fns/formatDuration";

import add from "date-fns/add";

const hellTiderEvent = 3600; // 1 hour (unix timestamp)
const nextHelltiderEvent = 8100; // 2 hour and 15 min

/**
 * 24:45 - 02:00
 * 02:00 - 04:15
 * 04:15 - 06:30
 * 06:30 - 08:30
 * 08:45 - 10:00
 * 10:00 - 12:15
 * 12:15 - 14:30
 * 14:30 - 16:45
 * 16:45 - 19:00
 * 19:00 - 21:15
 * 21:15 - 23:30
 */

const timer = new Date();

function getNextHelltide(date: Date) {
  return add(date, { hours: 2, minutes: 15 });
}

export default function App() {
  const [currentTimer, setCurrentTimer] = useState(
    getNextHelltide(new Date("August 14, 2023 08:30:00 UTC"))
  );

  console.log(currentTimer);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimer((prev) => sub(prev, { seconds: 1 }));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Helltide is active!</Text>
      <View>
        <Text>Time remaining</Text>
        <Text>
          {format(
            {
              hours: currentTimer.getHours(),
              minutes: currentTimer.getMinutes(),
              seconds: currentTimer.getSeconds(),
            },
            { delimiter: ", " }
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
