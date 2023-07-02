import { useHelltideEvent } from "@hooks/helltide";
import useInterval from "@hooks/interval";
import { formatDuration, intervalToDuration } from "date-fns";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function HelltideTimer() {
  const helltide = useHelltideEvent();

  const [timer, setTimer] = useState(new Date());

  const end = helltide.inProgress ? helltide?.end : helltide?.next;

  useInterval(() => {
    setTimer(new Date());
  }, 1000);

  if (!helltide?.end && helltide?.current && helltide?.next) {
    return null;
  }

  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.label}>
          {helltide.inProgress ? "Time remaining" : "Starts in"}
        </Text>
        <Text style={styles.event}>
          {formatDuration(
            intervalToDuration({
              start: timer,
              end,
            })
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
  },
  event: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginVertical: 6,
  },
});

export default HelltideTimer;
