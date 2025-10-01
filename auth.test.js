import request from "supertest";
import fs from "fs";
import path from "path";

const baseUrl = "https://restful-booker.herokuapp.com";
const tempDataPath = path.join(process.cwd(), "tempData.json");

describe("Auth API", function () {
  this.timeout(10000);
  it("Create Auth Token", async function () {
    const res = await request(baseUrl)
      .post("/auth")
      .set("Content-Type", "application/json")
      .send({
        username: "admin",
        password: "password123"
      });

    console.log("Auth response:", res.body);

    const temp = JSON.parse(fs.readFileSync(tempDataPath, "utf-8"));
    temp.token = res.body.token;
    fs.writeFileSync(tempDataPath, JSON.stringify(temp, null, 2));
  });
});