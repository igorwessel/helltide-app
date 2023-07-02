import Analytics from "@core/analytics";
import NotificationsManager from "@core/notifications";
import Observer from "@core/observer";
import Storage, { IStorage } from "@core/storage";
import { HelltideEvent } from "@types";
import { add, isWithinInterval, sub, isPast, isEqual } from "date-fns";

class Helltide extends Observer {
  private _helltideSyncOffset = new Date("2023-06-26T21:15:00.00Z");
  private _helltideEventTime = { hours: 2, minutes: 15 };
  private _helltideEvent: HelltideEvent = {
    next: null,
    end: null,
    current: null,
  };

  private _storage: IStorage = new Storage();
  private _storageKey = "helltideEvent";

  async init() {
    const helltideOffset = await this._getFromStorage();

    if (helltideOffset) {
      this._helltideSyncOffset = helltideOffset;
    }

    this._syncEvent();
    this._scheduleNotifications();
    this._checkExistNewHelltide();
  }

  private async _getFromStorage(): Promise<Date> {
    const offset = await this._storage.get(this._storageKey);

    if (!offset) return null;

    return new Date(offset);
  }

  async removeFromStorage(): Promise<void> {
    await this._storage.remove(this._storageKey);
    console.info("Clear Helltide offset");
  }

  private _updateStorage(event: Date) {
    console.info("Updating Helltide offset");
    return this._storage.set(this._storageKey, event.toString());
  }

  private _next(event = this._helltideSyncOffset) {
    // Need to create a new date because "isPast" is impure (alter date passed by parameter).
    if (isPast(new Date(event))) {
      return this._next(add(event, this._helltideEventTime));
    }

    this._helltideEvent.next = event;
  }

  private _current() {
    const currentEvent = sub(this._helltideEvent.next, this._helltideEventTime);

    if (!isEqual(this._helltideSyncOffset, currentEvent)) {
      this._updateStorage(currentEvent);
    }

    this._helltideSyncOffset = currentEvent;
    this._helltideEvent.current = currentEvent;
  }

  private _end() {
    this._helltideEvent.end = add(this._helltideEvent.current, {
      hours: 1,
    });
  }

  private _syncEvent() {
    const _old = this._helltideEvent;

    // The order import because we can not know current event without know next event
    this._next();
    this._current();
    this._end();

    if (!isEqual(_old.next, this._helltideEvent.next)) {
      Analytics.track("Helltide", {
        next: this._next.toString(),
        end: this._end.toString(),
        current: this._current.toString(),
      });

      this._scheduleNotifications();
    }
  }

  private _scheduleNotifications() {
    const { end, next } = this._helltideEvent;

    if (!isPast(new Date(end))) {
      NotificationsManager.scheduleLocal({ body: "Is over!" }, end);
    }

    if (!isPast(new Date(next))) {
      NotificationsManager.scheduleLocal(
        {
          body: "It started!",
        },
        next
      );
    }
  }

  private _checkExistNewHelltide() {
    setTimeout(() => {
      this._syncEvent();
      this._checkExistNewHelltide();
    }, 1000);
  }

  get next() {
    return this._helltideEvent.next;
  }

  get current() {
    return this._helltideEvent.current;
  }

  get end() {
    return this._helltideEvent.end;
  }

  get inProgress() {
    return isWithinInterval(new Date(), {
      start: this._helltideEvent.current,
      end: this._helltideEvent.end,
    });
  }
}

export default new Helltide();
