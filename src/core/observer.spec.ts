import Observer from "./observer";

it("should fire listener when emit some event", () => {
  const observer = new Observer();

  const listener = jest.fn();

  observer.subscribe(listener);

  observer.emit(null);

  expect(listener).toHaveBeenCalledWith(null);
});

it("should return unsubscribe function when subcribe", () => {
  const observer = new Observer();

  const listener = jest.fn();

  const unsubscribe = observer.subscribe(listener);

  observer.emit(null);

  expect(listener).toHaveBeenCalledWith(null);

  unsubscribe();
  observer.emit("ok");

  expect(listener).toHaveBeenCalledTimes(1);
});

it("should unsubscribe listener ", () => {
  const observer = new Observer();

  const listener = jest.fn();

  observer.subscribe(listener);

  observer.emit(null);

  expect(listener).toHaveBeenCalledWith(null);

  observer.unsubscribe(listener);

  observer.emit("ok");

  expect(listener).toHaveBeenCalledTimes(1);
});
