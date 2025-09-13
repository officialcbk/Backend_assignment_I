import request from "supertest";
// import supertest request object

import { Response } from "supertest";
// import supertest Response type

import app from "../src/app";
// import express application and server

describe("GET /", () => {
    it("should return Hello, world!", async () => {
        // create GET request to root endpoint
        const response: Response = await request(app).get("/");

        // assert that response status is OK, response text is "Hello, world!"
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, world!");
    });
});

describe("API Endpoints", () => {
  it("should return health check data", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("version");
  });

  it("should return portfolio performance", async () => {
    const res = await request(app).get("/api/v1/portfolio/performance");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("initialInvestment");
    expect(res.body).toHaveProperty("currentValue");
    expect(res.body).toHaveProperty("percentageChange");
    expect(typeof res.body.percentageChange).toBe("number");
  });

  it("should return the largest holding", async () => {
    const res = await request(app).get("/api/v1/portfolio/largest-holding");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("value");
  });

  it("should return asset allocation", async () => {
    const res = await request(app).get("/api/v1/portfolio/allocation");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("APPLE");
    expect(res.body).toHaveProperty("GOOGLE");
    expect(typeof res.body.APPLE).toBe("number");
  });
});