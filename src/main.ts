import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { AccountGoogle } from "./interface";
import path from "path";
import fs from "fs";
import { USERS } from "./task/generateAccountInformation";
import { initializeBrowser } from "./browser";
async function readFile(path: string) {
  return new Promise((resolve, reject) => {
    console.log("readfile");
    fs.readFile(path, "utf8", function (err, data) {
      console.log("🚀 ~ file: main.ts ~ line 10 ~ data", data);
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
async function main() {
  try {
    console.log(USERS.length);
    for (let i = 0; i < 1; i++) {
      let page: Page;
      const context = await initializeBrowser(
        
      );
      if (page === undefined) {
        console.log("Page undefined");
        continue;
      }
    }
    // const data = await readFile(__dirname + "./db/config.json");
    // console.log("🚀 ~ file: main.ts ~ line 21 ~ main ~ data", data);
    // for account of accounts
  } catch (error) {}
}

main().finally(async () => {
  console.log("Close");
});
