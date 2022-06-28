// import { Browser, BrowserContext, Page } from 'playwright';
// import log from 'electron-log';
// import * as constants from '../../config';
// import { AccountGoogle } from '../../interface';

// const clickButtonNext = async (page: Page) => {
//   const btnC = await page.$(constants.BUTTON_NEXT_ACCOUNT_GOOGLE);
//   if (btnC) {
//     await page
//       .click(constants.BUTTON_NEXT_ACCOUNT_GOOGLE, {
//         force: true,
//         delay: 60,
//       })
//       .catch((e) => log.error(e));
//     await page.waitForLoadState('domcontentloaded');
//   }
// };
// const clickNextOrCheckEligibilityLocalService = async (page: Page) => {
//   const btns = await page.$$(constants.CHECK_ELIGIBILITY_OR_NEXT_BUTTON);
//   const arrText = ['NEXT', 'CHECK ELIGIBILITY', 'CONTINUE'];
//   if (btns && btns.length > 0) {
//     for (const btn of btns) {
//       const isVisible = (await btn.isVisible()) || false;
//       const text = btn ? await btn.textContent() : '';
//       if (isVisible === true && text && arrText.includes(text)) {
//         await btn
//           .click({
//             force: true,
//             delay: 80,
//           })
//           .catch((e) => log.error(e));
//         await page.waitForLoadState('domcontentloaded');
//       }
//     }
//   }
// };
export * from "./gmailGoogle";
export * from './registerTiktok'
export * from './captChaSolver'
// export * from './actionBusinessDetails';
// export * from './actionBusinessHours';
// export * from './actionContinueExistingAccount';
// export * from './actionSetupYourServiceTypes';
// export * from './actionWelcomeEligibility';
// export { clickButtonNext };
