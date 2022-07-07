import { Browser, Page } from "puppeteer";
import got from "got";
import { isNumeric, randomInteger, randomNumber, wait } from "../helper";
import * as constants from "../config";
import { AccountGoogle } from "../interface";

const checkPositionTikTok = async (page: Page, selector: string) => {
  const ele = await page.$(selector);
  if (ele) {
    return true;
  }
  return false;
};
const clickBTNTikTok = async (page: Page, selector: string) => {
  const ele = await page.$(selector);
  if (ele) {
    await ele.click({
      delay: 80,
    });
    await wait(randomInteger(8, 10) * 1000);
  }
  await wait(randomInteger(5, 8) * 1000);
};

const clickHandleDialog = async (browser: Browser, page: Page) => {
  const btn = await page.$(constants.SELECT_LOGIN_EMAIL);
  if (btn) {
    await btn.click({
      delay: 80,
    });
    await wait(randomInteger(8, 10) * 1000);
  }
  const pages = await browser.pages();
  console.log(pages.length);
  return pages[pages.length - 1];
};

const fillInput = async (page: Page, selector: string, value: string) => {
  const input = await page.$(selector);
  if (input) {
    await input.click();
    await input.type(value, {
      delay: 80,
    });
    await input.dispose();
  }
  await wait(randomInteger(4, 6) * 1000);
};
// https://goo.gl/aqsW6D
const registerTikTokAccountPP = async (
  browser: Browser,
  page: Page,
  account: AccountGoogle
) => {
  console.log(
    "🚀 ~ file: registerTiktokAccount.ts ~ line 19 ~ account",
    account
  );
  try {
    await page
      .goto(constants.REGISTER_TIK_TOK_URL, {
        waitUntil: "domcontentloaded",
      })
      .catch((e) => console.error(e));
    await wait(randomInteger(8, 10) * 1000);
    let check = await checkPositionTikTok(page, constants.HOME_PAGE_TIK_TOK);
    // await clickBTNTikTok(page, constants.LOG_IN_TIK_TOK_BTN);
    if (check) {
      await clickBTNTikTok(page, constants.LOG_IN_TIK_TOK_BTN);
      check = await checkPositionTikTok(page, constants.FORM_LOGIN_TIK_TOK);
      if (check) {
        await clickBTNTikTok(page, constants.SELECT_LOGIN_EMAIL);
        await wait(randomInteger(5, 8) * 1000);
        await clickBTNTikTok(page, "a[href^='/login/phone-or-email/email']");
        await wait(randomInteger(5, 8) * 1000);
        await fillInput(page, "input[name='username']", account.gmail);
        await fillInput(page, "input[type='password']", account.pass);
        await clickBTNTikTok(
          page,
          "button[type='submit'].tiktok-1jv3fsf-Button-StyledButton"
        );
      }
      await wait(300000);
    }
  } catch (error: any) {
    console.error(`Error when google: ${error.message}`);
    return false;
  }
};
// eslint-disable-next-line
export { registerTikTokAccountPP };
