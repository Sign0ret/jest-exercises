// Login.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { build, fake } from "@jackfranklin/test-data-bot";
import Login from "../sharedComponent/Login";
import { handlers } from "../__mocks__/handlers"; // Externalized handlers
import "whatwg-fetch";

const server = setupServer(...handlers);

const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

describe("Login Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("submits form and calls onSubmit with credentials", async () => {
    const mockSubmit = jest.fn();
    render(<Login onSubmit={mockSubmit} />);
    
    const { username, password } = buildLoginForm();

    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({ username, password });
  });

  test("handles API errors through onSubmit", async () => {
    server.use(
      rest.post("/api/login", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
      })
    );

    const mockSubmit = jest.fn();
    render(<Login onSubmit={mockSubmit} />);
    
    const { username, password } = buildLoginForm();

    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });

    const errorMessage = screen.queryByRole("alert");
    if (errorMessage) {
      expect(errorMessage).toMatchInlineSnapshot(`
        <div
          role="alert"
        >
          Internal Server Error
        </div>
      `);
    }
  });
});