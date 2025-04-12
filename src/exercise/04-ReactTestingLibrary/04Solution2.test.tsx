import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../sharedComponents/Counter";

describe("Render Counter and fire events called increment and decrement", () => {
  test("counter increments and decrements when the buttons are clicked", () => {
    // Render the Counter component using React Testing Library
    const { container } = render(<Counter />);
    // container is the div that your component has been mounted onto.
    // Get a reference to the increment and decrement buttons:
    const [increment, decrement] = container.querySelectorAll("button");
    // Get a reference to the message div:
    const message = container.firstElementChild?.querySelector("h1");

    // Check the initial count
    expect(message).toHaveTextContent("Counter: 0");
    // Simulate a click event on the increment and decrement button
    fireEvent.click(increment);
    expect(message).toHaveTextContent("Counter: 1");
    fireEvent.click(decrement);
    expect(message).toHaveTextContent("Counter: 0");
  });
});
