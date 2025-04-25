import { renderHook, act, cleanup } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; // adjust path if needed

describe("useCounter - Part 3", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should allow customization of the initial count", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 10 }));

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(10);
  });

  it("should allow customization of the step", () => {
    const { result } = renderHook(() => useCounter({ step: 5 }));

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
});