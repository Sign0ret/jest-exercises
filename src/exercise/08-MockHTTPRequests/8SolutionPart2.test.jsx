import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";
import LoginSubmission from "../sharedComponent/LoginSubmission"; 
import { handlers } from "./Handlers"; 


const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginSubmission Component", () => {
  test("successful login: displays welcome message after valid credentials", async () => {
    render(<LoginSubmission />);

    await userEvent.type(screen.getByLabelText(/username/i), "testuser");
    await userEvent.type(screen.getByLabelText(/password/i), "testpassword");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByText(/welcome/i)).toHaveTextContent("testuser");
  });

  test("handles server error (500) and displays error message", async () => {
    server.use(
      rest.post(
        "https://auth-provider.example.com/api/login",
        async (req, res, ctx) => {
          return res(
            ctx.delay(150),
            ctx.status(500),
            ctx.json({ message: "Internal Server Error" })
          );
        }
      )
    );

    render(<LoginSubmission />);

    await userEvent.type(screen.getByLabelText(/username/i), "testuser");
    await userEvent.type(screen.getByLabelText(/password/i), "testpassword");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Internal Server Error"`
    );
  });

  test("displays validation error when username is missing", async () => {
    render(<LoginSubmission />);

    await userEvent.type(screen.getByLabelText(/password/i), "somepassword");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Username required"`
    );
  });

  test("displays validation error when password is missing", async () => {
    render(<LoginSubmission />);

    await userEvent.type(screen.getByLabelText(/username/i), "someuser");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Password required"`
    );
  });
});
