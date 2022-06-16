import { Browser, BrowserContext, Page } from "playwright";
import { AccountGoogle } from "../../interface";
import * as constants from "../../config";

const checkIsHomePageGmail = async (page: Page) => {
  const ele = await page.$(
    "img[src^='https://lh3.googleusercontent.com/A0azUqR4LXtIZAhqh7yPEihFjaPGeTZj0n1fLRWGtPkPlpoYCSu42R_dUp4OQEocrAnLq1r2_JC8pdwhgtQlTYQcMd8sLW1FDmgI9lCB']"
  );
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    return true;
  }
  return false;
};

const checkIsSignInPageGoogle = async (page: Page) => {
  const ele = await page.$(constants.IS_SIGN_IN_PAGE);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    return true;
  }
  return false;
};

const checkIsVerifyPageGoogle = async (page: Page) => {
  const ele = await page.$(constants.IS_VERIFY_PAGE);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    const isChoseHowYouWantToSignIn = await ele.$$("ul");
    if (isChoseHowYouWantToSignIn && isChoseHowYouWantToSignIn.length > 0) {
      return true;
    }
  }
  return false;
};

const checkIsProtectAccountPageGoogle = async (page: Page) => {
  // IS_PROTECT_ACCOUNT_PAGE
  const ele = await page.$(constants.IS_PROTECT_ACCOUNT_PAGE);
  if (ele) {
    return true;
  }
  return false;
};
const checkIsVerifyConfirmEmailPageGoogle = async (page: Page) => {
  const ele = await page.$(constants.IS_VERIFY_PAGE);
  if (ele) {
    const isChoseHowYouWantToSignIn = await ele.$("input[type='email']");
    if (isChoseHowYouWantToSignIn) {
      return true;
    }
  }
  return false;
};

const checkIsNotNowPageGoogle = async (page: Page) => {
  const listI = await page.$$(constants.IS_NOTNOW_PAGE);
  const arrTextContent = ["home", "check_circle", "lock_outline"];
  let count = 0;
  if (listI && listI.length > 0) {
    // eslint-disable-next-line
    for (const item of listI) {
      // eslint-disable-next-line
      const content = await item.textContent();
      if (content && arrTextContent.includes(content)) {
        count += 1;
      }
    }
  }
  if (count === listI.length) {
    return true;
  }
  return false;
};

const checkIsLoginGoogleSuccess = async (
  page: Page,
  account: AccountGoogle
) => {
  console.log("Check xem login hay chua");
  const ele = await page.$(constants.IS_LOGIN_GMAIL);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    const content = await ele.getAttribute("aria-label");
    console.log(
      "🚀 ~ file: checkPosition.ts ~ line 166 ~ isLoginGmailGoogle ~ content",
      content
    );
    if (content && content.includes(account.gmail.toLowerCase())) {
      return true;
    }
  }
  return false;
};

const checkIsEnglishLanguageSuccess = async (page: Page) => {
  const ele = await page.$(constants.IS_ENGLISH_US_LANGUAGE);
  const content = ele ? await ele.textContent() : "";
  if (
    ele &&
    content &&
    content.length > 0 &&
    content.includes("Preferred Language") &&
    content.includes("English") &&
    content.includes("United States")
  ) {
    return true;
  }
  return false;
};

const checkIsSelectEnglishType = async (page: Page) => {
  const ele = await page.$(constants.IS_SELECT_TYPE_ENGLISH_LANGUAGE);
  const content = ele ? await ele.textContent() : "";
  if (ele && content && content.includes("English")) {
    return true;
  }
  return false;
};

const checkIsFillEnglishLanguage = async (page: Page) => {
  const ele = await page.$(constants.IS_INPUT_ENGLISH_LANGUAGE);
  const content = ele ? await ele.textContent() : "";
  if (ele && content && content.includes("search")) {
    return true;
  }
  return false;
};

const checkIsLoginGmailOther = async (page: Page) => {
  const ele = await page.$(constants.IS_SIGN_IN_PAGE_OTHER);
  const isVisible = ele ? await ele.isVisible() : false;
  if (ele && isVisible === true) {
    const content = await ele.textContent();
    if (content) {
      return true;
    }
  }
  return false;
};
// ERROR_IDENTITY_ACCOUNT_GOOGLE
// const checkIsIdentityAccountGoogle = async (page: Page) => {
//   const ele = await page.$(constants.ERROR_IDENTITY_ACCOUNT_GOOGLE);
//   const isVisible = ele ? await ele.isVisible() : false;
//   if (ele && isVisible === true) {
//     return true;
//   }
//   return false;
// };

const checkIsVerifyPasswordPageGoogle = async (
  page: Page,
  account: AccountGoogle
) => {
  const ele = await page.$(constants.IS_VERIFY_PASSWORD_ADMOB_GOOGLE_PAGE);
  const textContent = ele ? await ele.getAttribute("aria-label") : "";
  console.log(
    "🚀 ~ file: checkPosition.ts ~ line 62 ~ textContent",
    textContent
  );
  if (textContent && textContent.includes(account.gmail.toLowerCase())) {
    return true;
  }
  return false;
};

const checkIsCreateAccountGoogle = async (page: Page) => {
  const ele = await page.$(
    "img[src^='https://ssl.gstatic.com/accounts/signup/glif/account.svg']"
  );
  const isVisible = ele ? await ele.isVisible() : false;
  if (isVisible === true) {
    return true;
  }
  return false;
};

const checkIsPersonalInforAccountGoogle = async (page: Page) => {
  const ele = await page.$(
    "img[src^='https://ssl.gstatic.com/accounts/signup/glif/personal.svg']"
  );
  const isVisible = ele ? await ele.isVisible() : false;
  if (isVisible === true) {
    return true;
  }
  return false;
};

const checkIsPrivacyAndTermGoogle = async (page: Page)=>{
  const ele = await page.$(
    "img[src^='https://ssl.gstatic.com/accounts/signup/glif/privacy.svg']"
  );
  const isVisible = ele ? await ele.isVisible() : false;
  if (isVisible === true) {
    return true;
  }
  return false;
}



export {
  checkIsCreateAccountGoogle,
  checkIsPersonalInforAccountGoogle,
  checkIsPrivacyAndTermGoogle,
  checkIsVerifyPasswordPageGoogle,
  checkIsHomePageGmail,
  checkIsSignInPageGoogle,
  checkIsVerifyPageGoogle,
  checkIsProtectAccountPageGoogle,
  checkIsVerifyConfirmEmailPageGoogle,
  checkIsNotNowPageGoogle,
  checkIsLoginGoogleSuccess,
  checkIsEnglishLanguageSuccess,
  checkIsSelectEnglishType,
  checkIsFillEnglishLanguage,
  checkIsLoginGmailOther,
};
