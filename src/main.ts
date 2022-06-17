import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { AccountGoogle } from "./interface";
import path from "path";
import fs from "fs";
import { initializeBrowser } from "./browser";
import { upsertOneProfile } from "./tasks/updateValue";
import { actionGmailGoogle } from "./tasks";
const config = require("../config.json");

async function main() {
  try {
    const arr = Object.values(config) as AccountGoogle[];
    for (const item of arr) {
      const context = await initializeBrowser(false, item);
      if (context) {
        console.log("Co context");
        await actionGmailGoogle(context, item);
      }
    }
    // const listItems = await Promise.all(
    //   arr.map(async (item: any, i: number) => {
    //     const updateValue = await upsertOneProfile(item);
    //     return {
    //       ...updateValue,
    //     };
    //   })
    // );
    // console.log("🚀 ~ file: main.ts ~ line 38 ~ main ~ listItems", listItems);

    // for (let i = 0; i < 1; i++) {
    //   let page: Page;
    //   const context = await initializeBrowser(true);
    // }
    // const data = await readFile(__dirname + "./db/config.json");
    // console.log("🚀 ~ file: main.ts ~ line 21 ~ main ~ data", data);
    // for account of accounts
  } catch (error) {}
}

main().finally(async () => {
  console.log("Close");
});
