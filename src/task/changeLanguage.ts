import { Browser, BrowserContext, Page } from "playwright";

import { AccountGoogle } from "../interface";
import * as constants from "../config";
import { isNumeric, randomInteger, randomNumber, wait } from "../helper";
import {
  checkIsEnglishLanguageSuccess,
  checkIsFillEnglishLanguage,
  checkIsSelectEnglishType,
} from "./checkPosition";
import {
  clickAcceptChangeLanguage,
  clickBTNChangeLanguage,
  fillInputEnglishLanguage,
  selectEnglishLanguage,
  selectEnglishUSLanguage,
} from "./actions";

// change language
const changeLanguageEnglishUSPageGoogle = async (
  page: Page,
  account: AccountGoogle
) => {
  try {
    let checkSuccess = true;
    let check = false;
    let timeRun = 0;
    let step = 0;
    if (!account.isChangeLanguageEnglishUSSuccess) {
      await page
        .goto(constants.CHANGE_LANGUAGE_GOOGLE_URL, {
          waitUntil: "domcontentloaded",
        })
        .catch((e) => console.error(e));
      await wait(randomInteger(15, 20) * 1000);
      check = await checkIsEnglishLanguageSuccess(page);
      if (!check) {
        console.log("Change language");
        do {
          await clickBTNChangeLanguage(page);
          await wait(randomInteger(8, 10) * 1000);
          check = await checkIsFillEnglishLanguage(page);
          if (check) {
            await fillInputEnglishLanguage(page);
            await wait(randomInteger(2, 3) * 1000);
            await selectEnglishLanguage(page);
            await wait(randomInteger(3, 5) * 1000);
          }
          check = await checkIsSelectEnglishType(page);
          if (check) {
            await selectEnglishUSLanguage(page);
            await wait(randomInteger(3, 5) * 1000);
            await clickAcceptChangeLanguage(page);
            await wait(randomInteger(5, 7) * 1000);
          }
          check = await checkIsEnglishLanguageSuccess(page);
          if (check) {
            break;
          } else {
            const timeWait = randomInteger(5, 7);
            timeRun += timeWait;
            await wait(timeWait * 1000);
            checkSuccess = false;
          }
          if (step >= 4 || timeRun >= 300) {
            checkSuccess = false;
            break;
          }
          step += 1;
        } while (true);
      }
      checkSuccess = await checkIsEnglishLanguageSuccess(page);
    }
    return checkSuccess;
  } catch (error: any) {
    console.error(`Error when change language: ${error.message}`);
    return false;
  }
};
// eslint-disable-next-line
export { changeLanguageEnglishUSPageGoogle };
