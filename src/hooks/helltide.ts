import Helltide from "@core/helltide";
import { useSyncExternalStore } from "react";

export function useHelltideEvent() {
  const helltideEvent = useSyncExternalStore(
    (cb) => Helltide.subscribe(cb),
    () => Helltide
  );

  return helltideEvent;
}
