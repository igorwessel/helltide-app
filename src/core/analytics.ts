import Constants, { ExecutionEnvironment } from "expo-constants";
import type { Mixpanel } from "mixpanel-react-native";

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export interface IAnalytics {
  track(name: string, parameters?: Record<string, string>): void;
}

class Analytics implements IAnalytics {
  private _client: Mixpanel;

  constructor() {
    if (isExpoGo) {
      this._client = {
        track: (name, parameters) => {
          console.info("[ANALYTICS]:: ", name, parameters);
        },
      } as Mixpanel;

      return;
    }

    const { Mixpanel } = require("mixpanel-react-native");
    this._client = new Mixpanel(process.env.ANALYTICS_TOKEN, true);
    this._client.init();
  }

  track(name: string, parameters?: Record<string, string>) {
    this._client.track(name, parameters);
  }
}

export default new Analytics();
