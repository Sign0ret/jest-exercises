import React from "react";
import { render, fireEvent, screen, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom"; // Add this import
import Login from "../sharedComponent/Login";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";

describe('Render login', () => {

  const buildLoginForm = build({
    fields: {
      username: fake((faker) => faker.internet.userName()),
      password: fake((faker) => faker.internet.password()),
    },
  });
 test('handles login form inputs and onSubmit button', () => {
    const handleSubmit = jest.fn();

    render(<Login onSubmit={handleSubmit} />);

    const { username, password } = buildLoginForm();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: username },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      username,
      password,
    });
  });
});