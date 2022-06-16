import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { changeLanguageEnglishUSPageGoogle } from "./changeLanguage";
import { AccountGoogle } from "../interface";
import path from "path";
import fs from "fs";

const actionGmailGoogle = async (
  browser: BrowserContext,
  page: Page,
  account: AccountGoogle
) => {
  try {
    //   readfile json
    
    // let checkSuccess = await loginGmailGoogle(page, account, store);
    // console.log("🚀 ~ file: index.ts ~ line 17 ~ checkSuccess", checkSuccess);
    // if (checkSuccess) {
    //   const newPage = await browser.newPage();
    //   checkSuccess = await changeLanguageEnglishUSPageGoogle(
    //     newPage,
    //     account,
    //     store
    //   );
    //   console.log("🚀 ~ file: index.ts ~ line 21 ~ checkSuccess", checkSuccess);
    // }
    // return checkSuccess;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
};
// eslint-disable-next-line
export { actionGmailGoogle };
