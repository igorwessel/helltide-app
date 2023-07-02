import * as Notifications from "expo-notifications";

import { NotificationMessage } from "../types";

class NotificationsManager {
  static configureHandler() {
    return Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  static scheduleLocal(
    { body }: NotificationMessage,
    scheduledDate: Date = null
  ) {
    return Notifications.scheduleNotificationAsync({
      content: {
        title: "Helltide",
        body,
      },
      trigger: scheduledDate,
    });
  }
}

export default NotificationsManager;
