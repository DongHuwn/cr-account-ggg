// puppeteer-extra is a drop-in replacement for puppeteer,

import { AccountGoogle } from "./interface";
import { registerTikTokAccountPP } from "./tasks/registerTT";

// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
const path = require("path");
const config = require("../config.json");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const chromePaths = require("chrome-paths");
puppeteer.use(
  StealthPlugin({
    enabledEvasions: new Set(["navigator.webdriver"]),
  })
);

// puppeteer usage as normal
puppeteer
  .launch({
    headless: false,
    ignoreDefaultArgs: true,
    defaultViewport: null,
    executablePath: chromePaths.chrome,
    args: [
      "--no-default-browser-check",
      "--no-first-run",
      `--user-data-dir=${path.resolve(__dirname, "../../profile")}`,
    ],
  })
  .then(async (browser) => {
    const arr = Object.values(config) as AccountGoogle[];
    const page = await browser.newPage();
    await registerTikTokAccountPP(browser, page, arr[0]);
    // await page.waitForTimeout(5000);
    // await page.goto("https://iphey.com/");
    // await page.waitForTimeout(5000);
    // await page.goto("https://iphey.com/");
    console.log(`All done, check the screenshot. ✨`);
  });
