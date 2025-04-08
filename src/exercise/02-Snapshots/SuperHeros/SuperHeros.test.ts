/* Exercise 2: Test using snapshots */

/* Mock the function using jest.fn().
Write three tests inside a describe block. You should use import the superHeros[] and getFlyingSuperHeros function.

1. First Test: 
Test should return an empty array if no superheros have the 'Fly' power"
2. Second Test:
Test should return an array of superHeros that have the 'Fly' power"
3. Third Test:
Test should match the snapshot of flying superheros.
The snapshot file should contain the expected output of the test.
The snapshot should be saved in a __snapshots__ directory next to the test file.
The snapshot file should be named SuperHeros.test.ts.snap.
*/

import { superHeros } from './superHeros.ts'
import { getFlyingSuperHeros, ISuperHero } from './getFlyingSuperHeros.ts';

test("dummy test", () => {
  expect(true).toBe(true);
});

describe("SuperHeros Testing", () => {

  it("should match an empty array", () => {
    const nonFlyingHeros: ISuperHero[] = [
      { name: "SpiderMan", power: ["Agility", "Spider-Sense"] },
      { name: "CaptainAmerica", power: ["Leadership", "Super Strength"] }
    ]
    const flyingSuperHeros = getFlyingSuperHeros(nonFlyingHeros);
    expect(flyingSuperHeros).toEqual([]);
  });

  it("should match the array of flyingSuperHeros", () => {
    const flyingHeros = [
      { name: "Superman", power: ["Fly", "Super Strength"] },
      {
        name: "IronMan",
        power: ["Intelligence", "Technology", "Fly", "Billionaire"],
      },
      { name: "GreenLantern", power: ["Energy Manipulation", "Fly"] },
    ];
    
    const flyingSuperHeros = getFlyingSuperHeros(superHeros);
    expect(flyingSuperHeros).toEqual(flyingHeros);
  });

  it("should match the snapshot for an array of flying heros", () => {
    const flyingSuperHeros = getFlyingSuperHeros(superHeros);
    expect(flyingSuperHeros).toMatchSnapshot();
  });
});