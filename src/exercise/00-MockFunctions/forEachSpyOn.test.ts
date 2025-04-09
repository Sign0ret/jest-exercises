/* Exercise 0: Test the function by using a spyOn function */

/* Mock the function using spyOn
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
// forEach.test.ts (archivo de tests)
import { forEach } from './forEach';

describe('Test de la función forEach con spyOn', () => {
  let callbackObj: { callback: (num: number) => number };
  let spy: jest.SpyInstance<number, [number]>;

  beforeEach(() => {
    callbackObj = {
      callback: (num: number): number => num + 6
    };
    spy = jest.spyOn(callbackObj, 'callback');
  });

  test('Primer Test: La función callback debe ser llamada 3 veces', () => {
    const array = [0, 1, 4];
    forEach(array, callbackObj.callback);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('Segundo Test: La función callback debe ser llamada con los argumentos correctos', () => {
    const array = [0, 1, 4];
    forEach(array, callbackObj.callback);
    expect(spy).toHaveBeenNthCalledWith(1, 0);
    expect(spy).toHaveBeenNthCalledWith(2, 1);
    expect(spy).toHaveBeenNthCalledWith(3, 4);
  });

  test('Tercer Test: Verificar valores retornados de las llamadas', () => {
    const array = [0, 1, 4];
    forEach(array, callbackObj.callback);
    expect(spy.mock.results[0].value).toBe(6);
    expect(spy.mock.results[1].value).toBe(7);
  });

  test('Cuarto Test: Validar la tercera llamada: argumento es 4 y resultado es distinto a 9', () => {
    const array = [0, 1, 4];
    forEach(array, callbackObj.callback);
    expect(spy.mock.calls[2][0]).toBe(4);
    expect(spy.mock.results[2].value).not.toBe(9);
  });
});
