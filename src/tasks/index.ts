import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { changeLanguageEnglishUSPageGoogle } from "./changeLanguage";
import { AccountGoogle } from "../interface";
import path from "path";
import fs from "fs";
import { wait } from "../helper";
import { registerAccountGoogle } from "./registerGoogleAccount";

const actionGmailGoogle = async (
  browser: BrowserContext,
  account: AccountGoogle
): Promise<boolean | any> => {
  try {
    //   readfile json
    const tasks = [
      "whoer",
      "registerGoogleAccount",
      "loginTikTok",
      // 'signUpLocalService',
      // 'actionGoogleAdMob',
      // 'addBilling',
    ];
    let actionSuccess = false;
    let i = 0;
    // eslint-disable-next-line
    for (i; i < tasks.length; i++) {
      console.log(
        "🚀 ~ file: registerAdsAccount.ts ~ line 25 ~ task",
        tasks[i]
      );
      // eslint-disable-next-line
      let page = await browser.newPage();
      if (tasks[i] === "whoer") {
        console.log("Go to whoer");
        // eslint-disable-next-line
        actionSuccess = await registerAccountGoogle(page, account);
        await wait(300000);
      }
      // else if (tasks[i] === 'actionUsNews') {
      //   // eslint-disable-next-line
      //   actionSuccess = await actionUsNews(page, account, store);
      //   actionSuccess = true;
      // }
      if (!actionSuccess) {
        // eslint-disable-next-line
        await wait(300000);
        console.log(
          `Action run failed in task ${tasks[i]} with account ${account.id}`
        );
        // eslint-disable-next-line
        await browser.close();
        break;
      }
    }
    // if (i === tasks.length && actionSuccess === true) {
    //   console.log(`Close browser with account ${account.id} run successfully`);
    //   await browser.close();
    // }
    return actionSuccess;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
};
// eslint-disable-next-line
export { actionGmailGoogle };
