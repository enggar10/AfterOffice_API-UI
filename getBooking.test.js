import request from "supertest";
import { expect } from "chai";
import fs from "fs";
import path from "path";

const baseUrl = "https://restful-booker.herokuapp.com";

// path ke file JSON
const tempDataPath = path.join(process.cwd(), "tempData.json");
const bookingDataPath = path.join(process.cwd(), "bookingData.json");

describe("Get Booking API", function () {
  this.timeout(10000);

  it("Get Booking by ID", async function () {
    // baca bookingId dari tempData.json
    const temp = JSON.parse(fs.readFileSync(tempDataPath, "utf-8"));
    const bookingId = temp.bookingId;

    // baca bookingData untuk validasi
    const bookingData = JSON.parse(fs.readFileSync(bookingDataPath, "utf-8"));

    console.log("Testing Get Booking with ID:", bookingId);

    const res = await request(baseUrl)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    // cek status code
    expect(res.status).to.equal(200);

    // validasi isi body sesuai bookingData
    expect(res.body.firstname).to.equal(bookingData.firstname);
    expect(res.body.lastname).to.equal(bookingData.lastname);
    expect(res.body.totalprice).to.equal(bookingData.totalprice);
    expect(res.body.depositpaid).to.equal(bookingData.depositpaid);
    expect(res.body.bookingdates.checkin).to.equal(bookingData.bookingdates.checkin);
    expect(res.body.bookingdates.checkout).to.equal(bookingData.bookingdates.checkout);
    expect(res.body.additionalneeds).to.equal(bookingData.additionalneeds);
  });
});
