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
    name: faker.name.findName(),
    gmail: faker.internet.email(),
    pass: faker.internet.password(8),
    dateOfBirth: faker.date.birthdate().toString(),
    userAgent: faker.internet.userAgent(),
    proxy: "",
    mailKP: "",
    gender: faker.name.gender(true).includes("Male") ? "1" : "2",
  };
}
const generateInformation = () => {
  for (let i = 0; i < 3; i++) {
    USERS.push(createRandomUser());
  }
  for (const user of USERS) {
    userObject[user.id?.toString()] = user;
  }
  fs.writeFile("config.json", JSON.stringify(userObject), function (err) {
    if (err) throw err;
    console.log("complete");
  });
};

generateInformation();
