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

const selectAccountGoogleLogin = async (page: Page, account: AccountGoogle) => {
  const ele = await page.$(
    `div[data-identifier^='${account.gmail.toLowerCase()}']`
  );
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    await ele
      .click({
        force: true,
        delay: 80,
      })
      .catch((e) => console.error(e));
    await page.waitForLoadState("domcontentloaded");
  }
};

const clickSelect = async (page: Page, type: string) => {
  const items = await page.$$("div.tiktok-p7ttbo-DivSelector");
  for (const item of items) {
    const content = item ? await item.textContent() : "";
    if (content && content.length > 0 && content.includes(type)) {
      await item.click({
        force: true,
        delay: 80,
      });
    }
  }
};
const checkSelectedSuccess = async (page: Page, value: string) => {
  const items = await page.$$(
    "div.tiktok-p7ttbo-DivSelector div.tiktok-1ifahq-DivSelectLabel"
  );
  for (const item of items) {
    const isVisible = item ? await item.isVisible() : false;
    const content = item ? await item.textContent() : "";
    if (isVisible === true && content && content.includes(value)) {
      return true;
    }
  }
  return false;
};

const checkSelectedDOBSuccess = async (page: Page, values: string[]) => {
  const items = await page.$$(
    "div.tiktok-p7ttbo-DivSelector div.tiktok-1ifahq-DivSelectLabel"
  );
  let i = 0;
  for (const item of items) {
    const isVisible = item ? await item.isVisible() : false;
    const content = item ? await item.textContent() : "";
    if (isVisible === true && content && values.includes(content)) {
      i++;
    }
  }
  if (i === items.length) {
    return true;
  }
  return false;
};

// 13 tuoi tro len
const selectOptionValue = async (page: Page, value: string) => {
  // January, February,March,April,May,June,July,August,September,October,November,December
  // Month: 1,2,3,..12,
  // Year 2021 > 1900
  const items = await page.$$(
    "div.tiktok-10ffgad-DivOptionsWarpper div.tiktok-73c114-DivOption"
  );
  for (const item of items) {
    const isVisible = item ? await item.isVisible() : false;
    const content = item ? await item.textContent() : "";
    if (isVisible === true && content && content.includes(value)) {
      await item.scrollIntoViewIfNeeded();
      await wait(randomInteger(2, 3) * 1000);
      await item.click({
        force: true,
        delay: 80,
      });
    }
  }
};

const clickButtonNextSignUp = async (page: Page) => {
  const btn = await page.$(
    "div[data-e2e='login-modal'] div#loginContainer button[type='button']"
  );
  const isVisible = btn ? await btn.isVisible() : false;
  if (btn && isVisible === true) {
    await btn.click({
      force: true,
      delay: 80,
    });
    await page.waitForLoadState("domcontentloaded");
  }
};
const selectDOB = async (page: Page, type: string, value: string) => {
  await clickSelect(page, type);
  await selectOptionValue(page, value);
  await wait(randomInteger(4, 5) * 1000);
};
// nhap birthday an next
// check xem co capcha hay keys
const selectDOBTikTok = async (page: Page, account: AccountGoogle) => {
  do {
    await selectDOB(page, "Month", "January");
    await selectDOB(page, "Day", "5");
    await selectDOB(page, "Year", "2000");
    let check = await checkSelectedDOBSuccess(page, ["January", "5", "2000"]);
    console.log(
      "🚀 ~ file: registerTiktok.ts ~ line 159 ~ selectDOBTikTok ~ check",
      check
    );
    if (check) {
      await clickButtonNextSignUp(page);
      break;
    }
  } while (true);
};

const byPassCaptcha = async (page: Page, account: AccountGoogle)=>{
  
}

export {
  clickBtnLoginTikTok,
  clickBTNTikTok,
  clickHandleDialog,
  selectAccountGoogleLogin,
  selectDOBTikTok,
};
