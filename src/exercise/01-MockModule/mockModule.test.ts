/* Mock Modules */

import { convertCase } from "./convertCase";
import { reverseString, toLowerCase, toUpperCase } from "./utils";

/* Mock the function using jest.mock() and jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
Mock the functions in the utils files, they are being used in the convertCase function.
Set up the mock functions before each test.

1. Test cases for the reverseString function
2. Test cases for the toLowerCase function
3. Test cases for the toUpperCase function
4. Test cases for the default case when it is unknown
5. Test cases for the empty string
*/
test("dummy test", () => {
  expect(true).toBe(true);
});

jest.mock('./utils', () => ({
  reverseString: jest.fn(),
  toLowerCase: jest.fn(),
  toUpperCase: jest.fn()
}));

describe('Render counter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("call reverseString with input", () => {
    (reverseString as jest.Mock).mockReturnValue('tset');
    const result = convertCase('test', 'reverse');
    expect(reverseString).toHaveBeenCalledWith('test');
    expect(result).toBe('tset');
  });

  it('call toLowerCase with input', () => {
    (toLowerCase as jest.Mock).mockReturnValue('test');
    const result = convertCase('TEST', 'lower');
    expect(toLowerCase).toHaveBeenCalledWith('TEST');
    expect(result).toBe('test');
  });

  it('call toUpperCase with input', () => {
    (toUpperCase as jest.Mock).mockReturnValue('TEST');
    const result = convertCase('test', 'upper');
    expect(toUpperCase).toHaveBeenCalledWith('test');
    expect(result).toBe('TEST');
  });

  it('return original string for unknown case type', () => {
    const result = convertCase('test', 'unknown');
    expect(result).toBe('test');
    expect(reverseString).not.toHaveBeenCalled();
    expect(toLowerCase).not.toHaveBeenCalled();
    expect(toUpperCase).not.toHaveBeenCalled();
  });

  it('handle empty string', () => {
    const result = convertCase('', 'upper');
    expect(result).not.toBe('');
  });

});