import React from "react";
import { render, act, cleanup } from "@testing-library/react";
import useCounter from "../sharedComponent/useCounter"; // adjust path if needed

let result
function TestComponent(props) {
  result = useCounter(props);
  return null;
}

describe("useCounter hook tested directly via TestComponent", () => {
  beforeEach(() => {
    cleanup();
    result = { count: 0, increment: () => {}, decrement: () => {} };
  });

  it("starts at 0 by default and increments / decrements by 1", () => {
    render(<TestComponent />);

    // initial count
    expect(result.count).toBe(0);

    // increment
    act(() => {
      result.increment();
    });
    expect(result.count).toBe(1);

    // decrement
    act(() => {
      result.decrement();
    });
    expect(result.count).toBe(0);
  });

  it("accepts an initialCount and custom step", () => {
    render(<TestComponent initialCount={10} step={5} />);

    expect(result.count).toBe(10);

    act(() => {
      result.increment();
    });
    expect(result.count).toBe(15);

    act(() => {
      result.decrement();
    });
    expect(result.count).toBe(10);
  });
});