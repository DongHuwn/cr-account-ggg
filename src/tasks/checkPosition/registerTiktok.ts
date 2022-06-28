import { Browser, BrowserContext, Page } from "playwright";
import { AccountGoogle } from "../../interface";
import * as constants from "../../config";

const checkPositionTikTok = async (page: Page, selector: string) => {
  const ele = await page.$(selector);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    return true;
  }
  return false;
};

const checkIsHomePageTikTok = async (page: Page) => {
  const ele = await page.$("svg[alt='TikTok']");
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    return true;
  }
  return false;
};

const checkIsSelectedAccountGoogle = async (page: Page) => {
  const ele = await page.$("img[src^='https://lh3.googleusercontent.com/']");
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    return true;
  }
  return false;
};

const checkIsSignUpModalFillBirthDay = async (page: Page) => {
  const ele = await page.$("div.tiktok-nql5k7-DivTitle");
  const isVisible = ele ? await ele.isVisible() : false;
  const content = ele ? await ele.textContent() : "";
  if (isVisible === true && content && content.includes("your birthday")) {
    return true;
  }
  return false;
};
const checkPositionWithContentTikTok = async (
  page: Page,
  selector: string,
  ct: string
) => {
  const ele = await page.$(selector);
  const isVisible = ele ? await ele.isVisible() : false;
  const content = ele ? await ele.textContent() : "";
  if (isVisible === true && content && content.includes(ct)) {
    return true;
  }
  return false;
};

const checkIsDialogCapcha = async (page: Page) => {
  const ele = await page.$(
    "div#captcha_container div.captcha_verify_container"
  );
  const isVisible = ele ? await ele.isVisible() : false;
  const content = ele ? await ele.textContent() : "";
  if (isVisible === true) {
    return true;
  }
  return false;
};

// const checkIsLoginFormTiktok = async (page: Page) => {
//   // FORM_LOGIN_INTO_TIKTOK
// };

export {
  checkIsHomePageTikTok,
  checkPositionTikTok,
  checkIsSelectedAccountGoogle,
  checkIsSignUpModalFillBirthDay,
  checkPositionWithContentTikTok,
  checkIsDialogCapcha,
};
