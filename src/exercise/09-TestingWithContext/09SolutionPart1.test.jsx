import EasyButton from "../sharedComponent/EasyButton";
import { ThemeProvider } from "../sharedComponent/theme";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';

function LightWrapper({ children }) {
    return <ThemeProvider initialTheme="light">{children}</ThemeProvider>;
}
  
// Custom wrapper component for dark theme
function DarkWrapper({ children }) {
    return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>;
}

describe("Theme Render", () => {
  beforeEach(() => {
    cleanup();
  })
  test("renders white background and black text when set to light",() => {

    render(<EasyButton />, { wrapper: LightWrapper });

    const button = screen.getByRole("button");

    expect(button).toHaveStyle({
      backgroundColor: "white",
      color: "black",
    });

  });

  test("renders white background and black text when set to light",() => {

    render(<EasyButton />, { wrapper: DarkWrapper});

    const button = screen.getByRole("button");
    
    expect(button).toHaveStyle({
        backgroundColor: "black",
        color: "white",
    });
  });
});