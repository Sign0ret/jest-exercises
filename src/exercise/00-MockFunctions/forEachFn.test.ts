/* Exercise 0: Test the function by using a mock function */

import { forEach } from "./forEach";

/* Mock the function using jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
The mock function receives a prop of type number. The mocked function adds a 6 to the number.
1. First Test: 
The forEach function should be called 3 times
2. Second Test:
The forEach function should be called with the correct arguments.
3. Third Test:
Test the first argument of the first call to the function was 0 and the result is 6.
Test the first argument of the second call to the function was 1  and the result is 7.
4. Forth Test:
Test the first argument of the third call to the function was 4 and the result is not 9.
*/

test("dummy test", () => {
  expect(true).toBe(true);
});

describe("Test functions using mock function", () =>{
  let mockFunction: jest.Mock;
  const array = [0, 1, 4];
  beforeEach(() => {
    mockFunction = jest.fn((number: number) => number + 6);
  })  

  it("calls forEach function 3 times", () => {
    forEach(array, mockFunction);
    expect(mockFunction).toHaveBeenCalledTimes(3);
  });

  it("calls forEach function with correct arguments", () => {
    forEach(array, mockFunction);

    expect(mockFunction).toHaveBeenNthCalledWith(1, 0);
    expect(mockFunction).toHaveBeenNthCalledWith(2, 1);
    expect(mockFunction).toHaveBeenNthCalledWith(3, 4);
  });

  it("the callback adds 6 to the passed item", () => {
    forEach(array, mockFunction);
    
    expect(mockFunction.mock.calls[0][0]).toBe(0);
    expect(mockFunction.mock.results[0].value).toBe(6);

    expect(mockFunction.mock.calls[1][0]).toBe(1);
    expect(mockFunction.mock.results[1].value).toBe(7);

  });

  it("the callback does not adds 5 to the input. ", () => {    
    forEach(array, mockFunction);
    
    expect(mockFunction.mock.calls[2][0]).toBe(4);
    expect(mockFunction.mock.results[2].value).not.toBe(9);
  });

})