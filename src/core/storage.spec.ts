import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "./storage";

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

it("should get a item", async () => {
  mockAsyncStorage.getItem.mockResolvedValue("1");

  const storage = new Storage();

  const item = await storage.get("key");

  expect(item).not.toBeNull();
});

it("should return null when not have a item", async () => {
  mockAsyncStorage.getItem.mockResolvedValue(null);

  const storage = new Storage();

  const item = await storage.get("key");

  expect(item).toBeNull();
});

it("should update item", async () => {
  mockAsyncStorage.getItem
    .mockResolvedValueOnce("1")
    .mockResolvedValueOnce("2");
  mockAsyncStorage.setItem.mockResolvedValue();

  const storage = new Storage();

  const item = await storage.get("key");

  expect(item).toBe("1");

  await storage.set("key", "2");

  const updateItem = await storage.get("key");

  expect(updateItem).toBe("2");
});
