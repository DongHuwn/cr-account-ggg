import { AccountGoogle, UserObject } from "../interface";
import * as constants from "../config";
import { isNumeric, randomInteger, randomNumber, wait } from "../helper";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
const USERS: AccountGoogle[] = [];
const userObject: UserObject = {};
export function createRandomUser(): AccountGoogle {
  return {
    id: faker.datatype.number(),
    nameAccount: faker.name.findName(),
    gmail: faker.internet.email(),
    pass: faker.internet.password(8),
    dateOfBirth: faker.date.birthdate({}).toString(),
    userAgent: faker.internet.userAgent(),
    proxy: "",
    mailKP: "",
    gender: faker.name.gender(),
  };
}
const generateInformation = () => {
  for (let i = 0; i < 3; i++) {
    USERS.push(createRandomUser());
  }
  for (const user of USERS) {
    userObject[user.id?.toString()] = user;
  }
  const json = JSON.stringify(userObject);
  if (!fs.existsSync(path.join(__dirname + "../db"))) {
    try {
      fs.mkdirSync(path.join(__dirname + "../db/"), { recursive: true });
    } catch (e) {
      console.log("Cannot create folder ", e);
    }
    fs.writeFileSync(path.join(__dirname + "../db/config.json"), json, "utf8");
  }
};

generateInformation();
