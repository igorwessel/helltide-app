import Storage from "@core/storage";

jest.useFakeTimers();
jest.mock("@core/storage");

const mockedStorage = jest.mocked(Storage);

it("should next helltide is correctly based in current time", async () => {
  jest.setSystemTime(new Date("2023-06-25T17:15:00.00Z"));

  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue(null);

  await helltide.init();

  expect(helltide.next).toEqual(new Date("2023-06-25T19:15:00.00Z"));
});

it("should current helltide is correctly based in current time", async () => {
  jest.setSystemTime(new Date("2023-06-25T17:18:00.00Z"));

  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue(null);

  await helltide.init();

  expect(helltide.current).toEqual(new Date("2023-06-25T17:00:00.00Z"));
  expect(helltide.end).toEqual(new Date("2023-06-25T18:00:00.00Z"));
});

it("should get current offset from storage and sync event correctly", async () => {
  jest.setSystemTime(new Date("2023-06-25T19:30:00.00Z"));

  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue("2023-06-25T17:00:00.00Z");

  await helltide.init();

  expect(helltide.current).toEqual(new Date("2023-06-25T19:15:00.000Z"));
  expect(helltide.end).toEqual(new Date("2023-06-25T20:15:00.000Z"));
  expect(helltide.next).toEqual(new Date("2023-06-25T21:30:00.000Z"));
});

it("should get next event when finish current", async () => {
  jest.setSystemTime(new Date("2023-06-25T19:14:00.000Z"));

  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue(null);

  await helltide.init();

  expect(helltide.current).toEqual(new Date("2023-06-25T17:00:00.000Z"));
  expect(helltide.end).toEqual(new Date("2023-06-25T18:00:00.000Z"));
  expect(helltide.next).toEqual(new Date("2023-06-25T19:15:00.000Z"));

  const ONE_MINUTE_10_SECONDS = 70000;

  jest.advanceTimersByTime(ONE_MINUTE_10_SECONDS);

  expect(helltide.current).toEqual(new Date("2023-06-25T19:15:00.000Z"));
  expect(helltide.end).toEqual(new Date("2023-06-25T20:15:00.000Z"));
  expect(helltide.next).toEqual(new Date("2023-06-25T21:30:00.000Z"));
});

it("should update storage with new offset", async () => {
  jest.setSystemTime(new Date("2023-06-25T19:14:00.000Z"));

  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue(null);

  await helltide.init();

  expect(storage.set).toHaveBeenCalled();
});

it("should 'inProgress' return true when current event is occuring", async () => {
  jest.setSystemTime(new Date("2023-06-25T17:15:00.00Z"));
  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue(null);

  await helltide.init();

  expect(helltide.inProgress).toBe(true);
});

it("should 'inProgress' return false when current event is finished", async () => {
  jest.setSystemTime(new Date("2023-06-25T19:00:00.00Z"));

  const helltide = require("./helltide").default;

  const storage = mockedStorage.mock.instances[0] as jest.Mocked<Storage>;

  storage.get.mockResolvedValue(null);

  await helltide.init();

  expect(helltide.inProgress).toBe(false);
});
