import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import { isNumeric, randomInteger, randomNumber, wait } from "../helper";
import * as constants from "../config";
import { AccountGoogle } from "../interface";
import {
  checkIsLoginGmailOther,
  checkIsLoginGoogleSuccess,
  checkIsNotNowPageGoogle,
  checkIsProtectAccountPageGoogle,
  checkIsVerifyConfirmEmailPageGoogle,
  checkIsVerifyPageGoogle,
  checkIsVerifyPasswordPageGoogle,
} from "./checkPosition";
import {
  clickBtnNotNow,
  clickConfirmAccountProtect,
  clickVerifyAccountWithMailKP,
  fillEmailPassWordGooglePageOther,
  fillGoogleLoginAccount,
  fillVerifyMailKP,
  verifyAccountWithPassword,
} from "./actions";

/**
 *
 * @param browser
 * @param page
 * @param account
 * @param store
 * @returns boolean
 *
 *
 *
 */

/** login google
 * sub problem
 * Problem 1 nhap tai khoan, mat khau an nut next va check xem dang nhap hay chua
 * Problem 2: TH ma nhap tai khoan, mat khau ma van chua dang nhap vao la dang o check point
 * checkpoint1 : yeu cau verify account . chon confirm = email. Nhap email. xong ra checkpoint thi se click not now la dang nhap thanh cong
 * checkpoint2 : protect account sau do se dang nhap thanh cong
 */
const loginGmailGoogle = async (page: Page, account: AccountGoogle) => {
  try {
    let checkSuccess = true;
    let check = false;
    let timeRun = 0;
    let step = 0;
    if (!account.isLoginGmailGoogleSuccess) {
      await page
        .goto(constants.GMAIL_URL, {
          waitUntil: "domcontentloaded",
        })
        .catch((e) => console.error(e));
      await wait(randomInteger(8, 10) * 1000);
      check = await checkIsLoginGmailOther(page);
      console.log(
        "🚀 ~ file: taskRegisterAdsAccount.ts ~ line 563 ~ check",
        check
      );
      if (check) {
        console.log("Fill login Other 1");
        await fillEmailPassWordGooglePageOther(page, account);
      } else {
        console.log("Fill login");
        await fillGoogleLoginAccount(page, account);
      }
      do {
        check = await checkIsVerifyPasswordPageGoogle(page, account);
        if (check) {
          console.log("Nhap password de verify");
          await verifyAccountWithPassword(page, account);
        }
        check = await checkIsProtectAccountPageGoogle(page);
        if (check) {
          console.log("Confirm protect account");
          await clickConfirmAccountProtect(page);
        }

        check = await checkIsVerifyPageGoogle(page);
        if (check) {
          console.log("Verify account with mailKP");
          await clickVerifyAccountWithMailKP(page, account);
        }
        check = await checkIsVerifyConfirmEmailPageGoogle(page);
        if (check) {
          console.log("Nhap MailKP");
          await fillVerifyMailKP(page, account);
        }

        check = await checkIsNotNowPageGoogle(page);
        if (check) {
          console.log("Click not now");
          await clickBtnNotNow(page);
        }
        check = await checkIsLoginGoogleSuccess(page, account);
        if (check) {
          console.log("Login thanh cong");
          // store.set(`req-acc.${account.id}.isLoginGmailGoogleSuccess`, true);
          // store.set(`req-acc.${account.id}.progress`, 10);
          // checkSuccess = true;
          break;
        } else {
          const timeWait = randomInteger(5, 7);
          timeRun += timeWait;
          await wait(timeWait * 1000);
          checkSuccess = false;
        }
        if (step >= 6 || timeRun >= 300) {
          checkSuccess = false;
          break;
        }
        step += 1;
      } while (true);
      checkSuccess = await checkIsLoginGoogleSuccess(page, account);
      if (checkSuccess) {
        account.isLoginGmailGoogleSuccess = true;
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

// selectAccountGoogleLogin

// img[src="https://lh3.googleusercontent.com/gdcR9U4eBJiAXBQwm_rnaVGyGCVeBcM2xhvvfZN3R8-kPNA0QTI91JEOa3b0p4QnfNM"]
