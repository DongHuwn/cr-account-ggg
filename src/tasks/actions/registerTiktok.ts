import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import * as constants from "../../config";
import { AccountGoogle } from "../../interface";
import { isNumeric, randomInteger, randomNumber, wait } from "../../helper";

const clickBtnLoginTikTok = async (page: Page) => {
  const ele = await page.$(constants.LOG_IN_TIK_TOK_BTN);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    await ele.click({
      delay: 80,
      force: true,
    });
    await page.waitForLoadState();
  }
  await wait(randomInteger(3, 5) * 1000);
};

const clickBTNTikTok = async (page: Page, selector: string) => {
  const ele = await page.$(selector);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    await ele.click({
      delay: 80,
      force: true,
    });
    await page.waitForLoadState();
  }
  await wait(randomInteger(3, 5) * 1000);
};
// const [newPage] = await Promise.all([
//     browser.waitForEvent('page'),
//     btn
//       .click({
//         force: true,
//         delay: 60,
//       })
//       .catch((e) => log.error(e)),
//   ]);
//   await newPage.waitForLoadState('domcontentloaded');
//   return newPage;

const clickHandleDialog = async (browser: BrowserContext, page: Page) => {
  const btn = await page.$(constants.SELECT_LOGIN_GOOGLE);
  const isVisible = btn ? await btn.isVisible() : false;
  if (isVisible === true) {
    const [newPage] = await Promise.all([
      browser.waitForEvent("page"),
      btn
        .click({
          force: true,
          delay: 60,
        })
        .catch((e) => console.error(e)),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }
  return undefined;
};

export { clickBtnLoginTikTok, clickBTNTikTok, clickHandleDialog };
