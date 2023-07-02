import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

class Storage implements IStorage {
  get(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  set(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }

  remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

export default Storage;
