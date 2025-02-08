/**
 * superheroes.test.js
 *
 * A simple integration test using Jest + supertest.
 */

const request = require("supertest");
const createApp = require("./app");

const app = createApp();

describe("Humble Superheroes API (Integration)", () => {
  it("should add a new superhero and retrieve the updated list", async () => {
    const newHero = {
      name: "TestHero",
      superpower: "Testing",
      humilityScore: 9,
    };

    // POST /superheroes
    const postResponse = await request(app).post("/superheroes").send(newHero);
    expect(postResponse.status).toBe(201);
    expect(postResponse.body).toEqual(newHero);

    // GET /superheroes
    const getResponse = await request(app).get("/superheroes");
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toContainEqual(newHero);
  });

  it("should return 400 for invalid humility score", async () => {
    const invalidHero = {
      name: "InvalidHero",
      superpower: "Being invalid",
      humilityScore: 15,
    };

    const response = await request(app).post("/superheroes").send(invalidHero);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
