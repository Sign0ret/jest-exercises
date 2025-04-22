import EasyButton from "../sharedComponent/EasyButton";
import { ThemeProvider } from "../sharedComponent/theme";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';

function renderWithProviders(ui, theme) {
    function Wrapper({ children }) {
      return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
    }
    return render(ui, { wrapper: Wrapper });
} 

describe("Theme Render", () => {
  test("renders white background and black text when set to light",() => {

    const { rerender } = renderWithProviders(<EasyButton />, 'light');

    rerender(<EasyButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveStyle({
      backgroundColor: "white",
      color: "black",
    });

  });
  test("renders black background and white text when set to dark",() => {

    const { rerender } = renderWithProviders(<EasyButton />, 'dark');

    rerender(<EasyButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveStyle({
      backgroundColor: "black",
      color: "white",
    });

  });
});