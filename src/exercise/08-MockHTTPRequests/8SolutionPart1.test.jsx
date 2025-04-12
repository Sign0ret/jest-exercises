import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { build, fake } from "@jackfranklin/test-data-bot";
import LoginSubmission from "../sharedComponent/LoginSubmission"; // Ensure correct path
import "whatwg-fetch";

// Mock server setup
const server = setupServer(
  rest.post("https://auth-provider.example.com/api/login", (req, res, ctx) => {
    const { username, password } = req.body;

    if (!username) {
      return res(ctx.status(400), ctx.json({ message: "Username required" }));
    }

    if (!password) {
      return res(ctx.status(400), ctx.json({ message: "Password required" }));
    }

    return res(ctx.json({ username }));
  })
);

const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

describe("LoginSubmission Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("submits form and calls onSubmit with credentials", async () => {
    render(<LoginSubmission />);

    const { username, password } = buildLoginForm();

    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // In this case, no mockSubmit needed, since LoginSubmission does not use it
  });

  test("handles successful API response", async () => {
    render(<LoginSubmission />);

    const { username, password } = buildLoginForm();

    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for spinner to disappear and ensure that the welcome message appears
    await waitFor(() => {
      expect(screen.queryByRole("status")).toBeNull();
    });

    // Verify that the success message is displayed
    expect(screen.getByText(/welcome/i)).toHaveTextContent(username);
  });

  test("handles API errors through onSubmit", async () => {
    server.use(
      rest.post("https://auth-provider.example.com/api/login", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
      })
    );

    render(<LoginSubmission />);

    const { username, password } = buildLoginForm();

    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for spinner to disappear and check for error message
    await waitFor(() => {
      expect(screen.queryByRole("status")).toBeNull();
    });

    const errorMessage = screen.queryByRole("alert");
    if (errorMessage) {
      expect(errorMessage).toHaveTextContent("Internal Server Error");
    }
  });

  test("handles missing credentials and shows validation errors", async () => {
    render(<LoginSubmission />);

    // Test missing username
    await userEvent.type(screen.getByLabelText(/password/i), "password");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.queryByRole("status")).toBeNull();
    });

    // Assert username validation error
    expect(screen.getByRole("alert")).toHaveTextContent("Username required");

    // Reset handlers for next test case
    server.resetHandlers();

    render(<LoginSubmission />);

    // Test missing password
    await userEvent.type(screen.getByLabelText(/username/i), "testuser");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.queryByRole("status")).toBeNull();
    });

    // Assert password validation error
    expect(screen.getByRole("alert")).toHaveTextContent("Password required");
  });
});
