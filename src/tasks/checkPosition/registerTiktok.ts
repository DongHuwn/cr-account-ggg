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

// const checkIsLoginFormTiktok = async (page: Page) => {
//   // FORM_LOGIN_INTO_TIKTOK
// };

export { checkIsHomePageTikTok, checkPositionTikTok };
