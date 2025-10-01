import request from "supertest";
import { expect } from "chai";
import fs from "fs";
import path from "path";

const baseUrl = "https://restful-booker.herokuapp.com";

// load JSON booking data
const bookingDataPath = path.join("bookingData.json");
const tempDataPath = path.join("tempData.json");
const bookingData = JSON.parse(fs.readFileSync(bookingDataPath, "utf-8"));

describe("Create Booking API", function () {
  this.timeout(10000);

  it("Create Booking", async function () {
    const res = await request(baseUrl)
      .post("/booking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(bookingData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("bookingid");

    // simpan bookingId
    let temp = {};
    if (fs.existsSync(tempDataPath)) {
      temp = JSON.parse(fs.readFileSync(tempDataPath, "utf-8"));
    }
    temp.bookingId = res.body.bookingid;
    fs.writeFileSync(tempDataPath, JSON.stringify(temp, null, 2));

    // validasi isi booking
    expect(res.body.booking).to.deep.include(bookingData);

    // log ID ke console
    console.log("Created BookingId:", res.body.bookingid);
  });
});