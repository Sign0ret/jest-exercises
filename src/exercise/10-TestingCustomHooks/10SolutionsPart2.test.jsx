// 10SolutionsPart2.test.jsx
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCounter from "../sharedComponent/useCounter"; // ajusta la ruta si es necesario

// Componente de prueba que usa el hook
function UseCounterHook({ initialCount = 0, step = 1 }) {
  const { count, increment, decrement } = useCounter({ initialCount, step });
  return (
    <div>
      <h1 data-testid="count">{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

describe("useCounter hook via UseCounterHook component", () => {
  beforeEach(() => {
    cleanup();
  });

  it("starts at 0 by default and increments / decrements by 1", async () => {
    const user = userEvent.setup();
    render(<UseCounterHook />);

    // valor inicial
    expect(screen.getByTestId("count").textContent).toBe("0");

    // incrementa
    await user.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByTestId("count").textContent).toBe("1");

    // decrementa
    await user.click(screen.getByRole("button", { name: "Decrement" }));
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("accepts an initialCount and custom step", async () => {
    const user = userEvent.setup();
    render(<UseCounterHook initialCount={5} step={2} />);

    // inicia en el initialCount dado
    expect(screen.getByTestId("count").textContent).toBe("5");

    // incrementa por step (2)
    await user.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByTestId("count").textContent).toBe("7");

    // decrementa por step (2)
    await user.click(screen.getByRole("button", { name: "Decrement" }));
    expect(screen.getByTestId("count").textContent).toBe("5");
  });
});