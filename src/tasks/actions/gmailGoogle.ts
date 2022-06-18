import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import * as constants from "../../config";
import { AccountGoogle } from "../../interface";
import { isNumeric, randomInteger, randomNumber, wait } from "../../helper";

const clickButtonSignInGmail = async (page: Page) => {
  const btn = await page.$(constants.BUTTON_SIGN_IN);
  const isVisible = btn ? await btn.isVisible() : false;
  if (btn && isVisible === true) {
    await page
      .click(constants.BUTTON_SIGN_IN, {
        force: true,
        noWaitAfter: true,
        delay: 60,
      })
      .catch((e) => console.error(e));
    await page.waitForLoadState("domcontentloaded");
  }
};
const clickButtonNext = async (page: Page) => {
  const btn = await page.$(constants.BUTTON_NEXT_ACCOUNT_GOOGLE);
  const arrContent = ["Next", "I agree"];
  const content = btn ? await btn.textContent() : "";
  if (btn && content && arrContent.includes(content)) {
    await btn.scrollIntoViewIfNeeded();
    await btn
      .click({
        force: true,
        delay: 60,
      })
      .catch((e) => console.error(e));
    await page.waitForLoadState("networkidle");
  }
};

const fillEmailInput = async (page: Page, account: AccountGoogle) => {
  const emailField = await page.$(constants.EMAIL_INPUT);
  if (emailField) {
    await page.type(constants.EMAIL_INPUT, account.gmail, { delay: 100 });
    await emailField.dispose();
    await wait(randomInteger(1, 2) * 1000);
    await clickButtonNext(page);
  }
};

const fillPassWordInput = async (page: Page, account: AccountGoogle) => {
  const passwordField = await page.$(constants.PASSWORD_INPUT);
  if (passwordField) {
    await page.fill(constants.PASSWORD_INPUT, account.pass);
    await passwordField.dispose();
    await wait(randomInteger(1, 2) * 1000);
    await clickButtonNext(page);
  }
};

const fillGoogleLoginAccount = async (page: Page, account: AccountGoogle) => {
  const url = await page.url();
  if (url && url.includes("https://www.google.com/gmail/about/")) {
    console.log("Dang o trang chu an nut sign in de dang nhap");
    await clickButtonSignInGmail(page);
    await wait(randomInteger(5, 7) * 1000);
  }
  console.log("Dang o trang dang nhap dien thong tin gmail va password");
  await fillEmailInput(page, account);
  await wait(randomInteger(5, 7) * 1000);
  await fillPassWordInput(page, account);
  await page.waitForLoadState("domcontentloaded");
  await wait(randomInteger(20, 30) * 1000);
};
const clickVerifyAccountWithMailKP = async (
  page: Page,
  account: AccountGoogle
) => {
  const paths = await page.$$(constants.CONFIRM_RECOVERY_EMAIL);
  let i = paths.length - 1;
  if (paths && paths.length > 0) {
    // eslint-disable-next-line
    for (i; i >= 0; i--) {
      // eslint-disable-next-line
      const pathSVG = await paths[i].$eval("div svg path", (e) =>
        e.getAttribute("d")
      );
      if (
        pathSVG &&
        pathSVG.includes(
          "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
        )
      ) {
        break;
      }
    }
    if (i > 0) {
      await paths[i]
        .click({
          force: true,
          delay: 70,
        })
        .catch((e) => console.error(e));
    }
  }
};

const verifyAccountWithPassword = async (
  page: Page,
  account: AccountGoogle
) => {
  const passwordField = await page.$(constants.PASSWORD_INPUT);
  if (passwordField) {
    await wait(2000);
    await page.type(constants.PASSWORD_INPUT, account.pass, {
      delay: 100,
    });
    await passwordField.dispose();
    await wait(randomInteger(1, 2) * 1000);
    await clickButtonNext(page);
    await page.waitForLoadState("domcontentloaded");
  }
};
const clickConfirmAccountProtect = async (page: Page) => {
  // CONFIRM_PROTECT_ACCOUNT
  const btnC = await page.$(constants.CONFIRM_PROTECT_ACCOUNT);
  if (btnC) {
    await btnC
      .click({
        force: true,
        delay: 60,
      })
      .catch((e) => console.error(e));
    await page.waitForLoadState("domcontentloaded");
  }
};
const fillVerifyMailKP = async (page: Page, account: AccountGoogle) => {
  const emailField = await page.$(constants.RECOVERY_EMAIL_ADDRESS_INPUT);
  if (emailField) {
    await page.type(constants.RECOVERY_EMAIL_ADDRESS_INPUT, account.mailKP, {
      delay: 100,
    });
    await emailField.dispose();
    await wait(randomInteger(1, 2) * 1000);
    await clickButtonNext(page);
  }
};
const clickBtnNotNow = async (page: Page) => {
  // check if page not now
  const btns = await page.$$("button");
  if (btns && btns.length > 0) {
    // eslint-disable-next-line
    for (const btn of btns) {
      // eslint-disable-next-line
      const isVisible = await btn.isVisible();
      // eslint-disable-next-line
      if (isVisible === true) {
        // eslint-disable-next-line
        await btn
          .click({
            force: true,
            delay: 60,
          })
          .catch((e) => console.error(e));
        // eslint-disable-next-line
        await page.waitForLoadState("domcontentloaded");
      }
    }
  }
};
// change language
const clickBTNChangeLanguage = async (page: Page) => {
  const btn = await page.$(constants.SELECT_CHANGE_LANGUAGE_BTN);
  const isVisible = btn ? await btn.isVisible() : false;
  if (btn && isVisible === true) {
    await btn
      .click({
        delay: 80,
        force: true,
      })
      .catch((e) => console.error(e));
  }
};

const fillInputEnglishLanguage = async (page: Page) => {
  const inputField = await page.$(constants.INPUT_LANGUAGE_CHANGE);
  if (inputField) {
    await page.type(constants.INPUT_LANGUAGE_CHANGE, "English", { delay: 100 });
    await inputField.dispose();
    await wait(randomInteger(1, 2) * 1000);
  }
};

const selectEnglishLanguage = async (page: Page) => {
  const english = await page.$(constants.SELECT_ENGLISH_LANGUAGE);
  const isVisible = english ? await english.isVisible() : false;
  if (english && isVisible === true) {
    await english
      .click({
        delay: 80,
        force: true,
      })
      .catch((e) => console.error(e));
  }
};

const selectEnglishUSLanguage = async (page: Page) => {
  const englishUS = await page.$(constants.SELECT_ENGLISH_US_LANGUAGE);
  const isVisible = englishUS ? await englishUS.isVisible() : false;
  if (englishUS && isVisible === true) {
    await englishUS
      .click({
        delay: 80,
        force: true,
      })
      .catch((e) => console.error(e));
    await wait(randomInteger(3, 4) * 1000);
  }
};

const clickAcceptChangeLanguage = async (page: Page) => {
  const btns = await page.$$(constants.SELECT_CHANGE_LANGUAGE_ACCEPT);
  if (btns && btns.length > 0) {
    // eslint-disable-next-line
    for (const btn of btns) {
      // eslint-disable-next-line
      const isVisibleBTN = await btn.isVisible();
      if (isVisibleBTN === true) {
        // eslint-disable-next-line
        await btn
          .click({
            force: true,
            delay: 80,
          })
          .catch((e) => console.error(e));
        // eslint-disable-next-line
        await page.waitForLoadState("domcontentloaded");
      }
    }
  }
};
const clickBTNConfirmRecoveryEmailOther = async (page: Page) => {
  console.log("verify");
  const btnC = await page.waitForSelector(
    constants.BUTTON_RECOVERY_EMAIL_PAGE_OTHER
  );
  if (btnC) {
    console.log("verify2");
    await page
      .click(constants.BUTTON_RECOVERY_EMAIL_PAGE_OTHER, {
        force: true,
        delay: 60,
      })
      .catch((e) => console.error(e));
    // await Promise.all([
    //   page
    //     .click(constants.BUTTON_RECOVERY_EMAIL_PAGE_OTHER, {
    //       force: true,
    //       delay: 60,
    //     })
    //     .catch((e) => console.error(e)),
    //   page.waitForLoadState('networkidle'),
    // ]);
  }
};
const clickBTNNextOther = async (page: Page) => {
  const btnC = await page.$(constants.BUTTON_NEXT_PAGE_OTHER);
  if (btnC) {
    await page
      .click(constants.BUTTON_NEXT_PAGE_OTHER, {
        force: true,
        delay: 60,
      })
      .catch((e) => console.error(e));
    // await Promise.all([
    //   page
    //     .click(constants.BUTTON_NEXT_PAGE_OTHER, {
    //       force: true,
    //       delay: 60,
    //     })
    //     .catch((e) => console.error(e)),
    //   page.waitForLoadState('networkidle'),
    // ]);
  }
};
const clickBTNSubmitOther = async (page: Page) => {
  const btnC = await page.$(constants.BUTTON_SUBMIT_PAGE_OTHER);
  if (btnC) {
    await page
      .click(constants.BUTTON_SUBMIT_PAGE_OTHER, {
        force: true,
        delay: 60,
      })
      .catch((e) => console.error(e));
    // await Promise.all([
    //   page
    //     .click(constants.BUTTON_SUBMIT_PAGE_OTHER, {
    //       force: true,
    //       delay: 60,
    //     })
    //     .catch((e) => console.error(e)),
    //   page.waitForLoadState('networkidle'),
    // ]);
  }
};

const fillEmailPassWordGooglePageOther = async (
  page: Page,
  account: AccountGoogle
) => {
  // dien gmail
  console.log("Fill login Other 2");
  await wait(2000);
  const emailField = await page.$(constants.EMAIL_INPUT);
  if (emailField) {
    await page.type(constants.EMAIL_INPUT, account.gmail, { delay: 100 });
    await emailField.dispose();
    await page.waitForTimeout(1000);
    await clickBTNNextOther(page);
  }

  const passwordField = await page.$(constants.PASSWORD_INPUT);
  if (passwordField) {
    await wait(2000);
    console.log(account.pass, "pass");
    await passwordField.fill(account.pass, {
      force: true,
    });
    await passwordField.dispose();
    await wait(randomNumber(1, 3) * 1000);
    await clickBTNSubmitOther(page);
  }
  await wait(randomNumber(1, 3) * 1000);
  const check = await page.$(constants.BUTTON_RECOVERY_EMAIL_PAGE_OTHER);
  if (check) {
    await clickBTNConfirmRecoveryEmailOther(page);
    console.log("email recovery");
    const emailRecoveryField = await page.$(constants.EMAIL_INPUT);
    if (emailRecoveryField) {
      console.log("email recovery 2");

      await page.type(constants.EMAIL_INPUT, account.mailKP, { delay: 100 });
      await emailRecoveryField.dispose();
      await wait(randomNumber(1, 3) * 1000);
      await clickBTNSubmitOther(page);
    }
  }

  // button BUTTON_NEXT_PAGE_OTHER
  // dien password
  // BUTTON_SUBMIT_PAGE_OTHER
  // nhap recovery email  EMAIL_INPUT
  // BUTTON_SUBMIT_PAGE_OTHER
};

const fillInput = async (page: Page, selector: string, inputText: string) => {
  const field = await page.$(selector);
  const isVisible = field ? await field.isVisible() : false;
  if (field && isVisible === true) {
    await page.evaluate(function (selector) {
      // @ts-ignore
      document.querySelector(selector).value = "";
    }, selector);
    console.log("Fill " + inputText);
    if (inputText.includes("@gmail.com")) {
      inputText = inputText.split("@")[0];
    }
    await page.type(selector, inputText, { delay: 80 });
    await field.dispose();
    await wait(randomInteger(3, 5) * 1000);
  }
};
const fillCreateAccountGoogle = async (page: Page, account: AccountGoogle) => {
  console.log(
    "🚀 ~ file: gmailGoogle.ts ~ line 363 ~ fillCreateAccountGoogle ~ account",
    account
  );
  const firstName = account.name.split(" ")[0];
  const lastName = account.name.split(" ")[1];
  await fillInput(page, "input[name='firstName']", firstName);
  await fillInput(page, "input[name='lastName']", lastName);
  await fillInput(page, "input[name='Username']", account.gmail);
  await fillInput(page, "input[name='Passwd']", account.pass);
  await fillInput(page, "input[name='ConfirmPasswd']", account.pass);
  await clickButtonNext(page);
  await wait(randomInteger(8, 10) * 1000);
};
const selectOption = async (page: Page, selector: string, value: string) => {
  const selections = await page.$(selector);
  await selections?.selectOption(value);
  await wait(randomInteger(3, 5) * 1000);
};
// recoveryEmail
const fillPersonalInforAccountGoogle = async (
  page: Page,
  account: AccountGoogle
) => {
  // select#month  1 -12
  // select#gender 1-2-3-4
  const dob = account.dateOfBirth?.split("/");
  const day = dob && dob.length > 0 ? dob[0] : randomInteger(1, 27).toString();
  const month =
    dob && dob.length > 0 ? dob[1] : randomInteger(1, 12).toString();
  const year =
    dob && dob.length > 0 ? dob[1] : randomInteger(1990, 2003).toString();
  await fillInput(page, "input[name='recoveryEmail']", account.mailKP);
  await fillInput(page, "input[name='day']", day);
  await selectOption(page, "select#month", month);
  await fillInput(page, "input[name='year']", year);
  await selectOption(
    page,
    "select#gender",
    account.gender || randomInteger(1, 2).toString()
  );
  await clickButtonNext(page);
  await wait(randomInteger(8, 10) * 1000);
};

export {
  fillCreateAccountGoogle,
  fillPersonalInforAccountGoogle,
  clickButtonSignInGmail,
  fillGoogleLoginAccount,
  clickConfirmAccountProtect,
  clickVerifyAccountWithMailKP,
  fillVerifyMailKP,
  verifyAccountWithPassword,
  clickBtnNotNow,
  clickBTNChangeLanguage,
  fillInputEnglishLanguage,
  selectEnglishLanguage,
  selectEnglishUSLanguage,
  clickAcceptChangeLanguage,
  fillEmailPassWordGooglePageOther,
  clickButtonNext,
};
