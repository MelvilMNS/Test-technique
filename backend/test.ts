import request from "supertest";
import { app, tables, initTables } from "./app";

beforeEach(() => {
  initTables([2, 5, 4, 3, 2]);
});

describe("Tests des tables", () => {
  it("GET /tables retourne toutes les tables", async () => {
    const res = await request(app).get("/tables");
    expect(res.status).toBe(200);
    console.log(res.body)
    expect(res.body.length).toBe(5);
  });

  it("POST /reservation réserve une table disponible", async () => {
    const res = await request(app)
      .post("/reservation")
      .send({ size: 3 });
    expect(res.status).toBe(200);
    expect(res.body.table.capacity).toBeGreaterThanOrEqual(3);
    expect(res.body.table.occupied).toBe(true);
  });

  it("POST /reservation retourne une erreur si aucune table n'est disponible", async () => {
    tables.forEach(t => t.occupied = true);
    const res = await request(app)
      .post("/reservation")
      .send({ size: 2 });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Pas de place disponible");
  });

  it("POST /liberation libère une table occupée", async () => {
    tables[0].occupied = true;
    const res = await request(app)
      .post("/liberation")
      .send({ id: 0 });
    expect(res.status).toBe(200);
    expect(tables[0].occupied).toBe(false);
  });
});