import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { isNumeric, randomInteger, randomNumber, wait } from "../helper";
import * as constants from "../config";
import { AccountGoogle } from "../interface";
import {
  checkIsDialogCapcha,
  checkIsHomePageTikTok,
  checkIsSelectedAccountGoogle,
  checkIsSignUpModalFillBirthDay,
  checkPositionTikTok,
} from "./checkPosition";
import {
  clickBtnLoginTikTok,
  clickBTNTikTok,
  clickHandleDialog,
  selectAccountGoogleLogin,
  selectDOBTikTok,
} from "./actions";

// https://goo.gl/aqsW6D
const registerTikTokAccount = async (
  browser: BrowserContext,
  page: Page,
  account: AccountGoogle
) => {
  console.log(
    "🚀 ~ file: registerTiktokAccount.ts ~ line 19 ~ account",
    account
  );
  try {
    let checkSuccess = true;
    let check = false;
    // let timeRun = 0;
    let step = 0;
    // nhap thong tin user naem, pass...
    // nhap mail verification, date of birth
    // privaciry wait 15 20
    // checkIsLoginGoogleSuccess
    if (
      !account.isRegisterGoogleAccountSuccess &&
      account.isLoginGmailGoogleSuccess
    ) {
      await page
        .goto(constants.REGISTER_TIK_TOK_URL, {
          waitUntil: "domcontentloaded",
        })
        .catch((e) => console.error(e));
      await wait(randomInteger(8, 10) * 1000);
      if (!check) {
        let newPage: Page;
        check = await checkPositionTikTok(page, constants.HOME_PAGE_TIK_TOK);
        await clickBTNTikTok(page, constants.LOG_IN_TIK_TOK_BTN);
        do {
          check = await checkPositionTikTok(page, constants.FORM_LOGIN_TIK_TOK);
          if (check) {
            newPage = await clickHandleDialog(browser, page);
          }
          check = await checkIsSelectedAccountGoogle(newPage);
          console.log(
            "🚀 ~ file: registerTiktokAccount.ts ~ line 57 ~ check",
            check
          );
          if (check) {
            await selectAccountGoogleLogin(newPage, account);
            await wait(randomInteger(8, 10) * 1000);
          }
          await page.bringToFront();
          check = await checkIsSignUpModalFillBirthDay(page);
          console.log(
            "🚀 ~ file: registerTiktokAccount.ts ~ line 68 ~ check",
            check
          );
          if (check) {
            console.log("select date of birth tiktok");
            await selectDOBTikTok(page, account);
          }
          check = await checkIsDialogCapcha(page);
          console.log(
            "🚀 ~ file: registerTiktokAccount.ts ~ line 73 ~ check",
            check
          );
          if (check) {
            console.log("Vuot qua capcha");
          }
          //   check = await checkIsPersonalInforAccountGoogle(page);
          //   if (check) {
          //     await fillPersonalInforAccountGoogle(page, account);
          //   }

          //   check = await checkIsPrivacyAndTermGoogle(page);
          //   if (check) {
          //     await clickButtonNext(page);
          //     await wait(randomInteger(15, 20) * 1000);
          //   }

          //   check = await checkIsLoginGoogleSuccess(page, account);
          //   if (check) {
          //     checkSuccess = true;
          //     console.log("Thanh cong");
          //     break;
          //   }
          await wait(300000);
          //   step += 1;
          //   if (step >= 3) {
          //     checkSuccess = false;
          //     break;
          //   }
        } while (true);
      } else {
        checkSuccess = true;
      }
    }
    if (checkSuccess) {
      account.isRegisterGoogleAccountSuccess = true;
    }
    return checkSuccess;
  } catch (error: any) {
    console.error(`Error when google: ${error.message}`);
    return false;
  }
};
// eslint-disable-next-line
export { registerTikTokAccount };
