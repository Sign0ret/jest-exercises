import React from "react";
import { render, fireEvent, screen, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom"; // Add this import
import Login from "../sharedComponent/Login";
import userEvent from "@testing-library/user-event";

describe('Render login', () => {
 test('handles login form inputs and onSubmit button', () => {
    const handleSubmit = jest.fn();

    render(<Login onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/username/i), { 
        target: { value: 'testuser' } 
    });

    fireEvent.change(screen.getByLabelText(/password/i), { 
        target: { value: 'password123' } 
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'password123'
  });
});
});