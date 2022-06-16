import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { isNumeric, randomInteger, randomNumber, wait } from "../helper";
import * as constants from "../config";
import { AccountGoogle } from "../interface";
import {
  checkIsCreateAccountGoogle,
  checkIsLoginGoogleSuccess,
  checkIsPersonalInforAccountGoogle,
  checkIsPrivacyAndTermGoogle,
} from "./checkPosition";
import {
  clickButtonNext,
  fillCreateAccountGoogle,
  fillPersonalInforAccountGoogle,
} from "./actions";

// https://goo.gl/aqsW6D
const loginGmailGoogle = async (page: Page, account: AccountGoogle) => {
  try {
    let checkSuccess = true;
    let check = false;
    // let timeRun = 0;
    let step = 0;
    // nhap thong tin user naem, pass...
    // nhap mail verification, date of birth
    // privaciry wait 15 20
    // checkIsLoginGoogleSuccess
    if (!account.isRegisterGoogleAccountSuccess) {
      await page
        .goto(constants.REGISTER_GOOGLE_URL, {
          waitUntil: "domcontentloaded",
        })
        .catch((e) => console.error(e));
      await wait(randomInteger(8, 10) * 1000);
      check = await checkIsLoginGoogleSuccess(page, account);
      if (!check) {
        do {
          check = await checkIsCreateAccountGoogle(page);
          if (check) {
            await fillCreateAccountGoogle(page, account);
          }
          check = await checkIsPersonalInforAccountGoogle(page);
          if (check) {
            await fillPersonalInforAccountGoogle(page, account);
          }

          check = await checkIsPrivacyAndTermGoogle(page);
          if (check) {
            await clickButtonNext(page);
            await wait(randomInteger(15, 20) * 1000);
          }

          check = await checkIsLoginGoogleSuccess(page, account);
          if (check) {
            checkSuccess = true;
            console.log("Thanh cong");
            break;
          }
          step += 1;
          if (step >= 3) {
            checkSuccess = false;
            break;
          }
        } while (true);
      } else {
        checkSuccess = true;
      }
    }
    return checkSuccess;
  } catch (error: any) {
    console.error(`Error when google: ${error.message}`);
    return false;
  }
};
// eslint-disable-next-line
export { loginGmailGoogle };
