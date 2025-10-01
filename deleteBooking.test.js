import request from "supertest";
import { expect } from "chai";
import fs from "fs";
import path from "path";

const baseUrl = "https://restful-booker.herokuapp.com";
const tempDataPath = path.join(process.cwd(), "tempData.json");

describe("Delete Booking API", function () {
  this.timeout(10000);

  it("Delete Booking by ID", async function () {
    const temp = JSON.parse(fs.readFileSync(tempDataPath, "utf-8"));
    const { token, bookingId } = temp;

    const res = await request(baseUrl)
      .delete(`/booking/${bookingId}`)
      .set("Cookie", `token=${token}`);

    expect(res.status).to.equal(201);
  });

  it("Verify Booking Deleted", async function () {
    const temp = JSON.parse(fs.readFileSync(tempDataPath, "utf-8"));
    const bookingId = temp.bookingId;

    const res = await request(baseUrl)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(404);
  });
});