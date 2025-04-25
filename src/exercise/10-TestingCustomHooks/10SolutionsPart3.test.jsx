import React from "react";
import { render, act, cleanup } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; // adjust path if needed

// 💡 Setup function that encapsulates the hook result logic
function setup(props = {}) {
  const result = { current: null };

  function TestComponent() {
    result.current = useCounter(props);
    return null;
  }

  render(<TestComponent />);
  return result;
}

describe("useCounter - Part 3", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should allow customization of the initial count", () => {
    const result = setup({ initialCount: 10 });

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
    const result = setup({ step: 5 });

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