/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import { BrowserContext } from 'playwright';

export const addStealth = async (browserContext: BrowserContext) => {
  const fileNames = [
    'js-stealth/utils.txt',
    'js-stealth/generate.magic.arrays.txt',
    'js-stealth/chrome.app.txt',
    'js-stealth/chrome.csi.txt',
    'js-stealth/chrome.hairline.txt',
    'js-stealth/chrome.load.times.txt',
    'js-stealth/chrome.runtime.txt',
    'js-stealth/iframe.contentWindow.txt',
    'js-stealth/media.codecs.txt',
    'js-stealth/navigator.hardwareConcurrency.txt',
    'js-stealth/navigator.languages.txt',
    'js-stealth/navigator.permissions.txt',
    'js-stealth/navigator.platform.txt',
    'js-stealth/navigator.plugins.txt',
    'js-stealth/navigator.userAgent.txt',
    'js-stealth/navigator.vendor.txt',
    'webdriver',
    'js-stealth/window.outerdimensions.txt',
    'js-stealth/webgl.vendor.txt',
  ];

  await Promise.all(
    fileNames.map(async (filename) => {
      let script = '';
      if (filename === 'webdriver') {
        script = 'delete Object.getPrototypeOf(navigator).webdriver';
      } else {
        script = await fs.promises.readFile(
          path.resolve(__dirname, filename),
          'utf-8'
        );
        // eslint-disable-next-line
      }
      await browserContext.addInitScript(script);
    })
  );

  return browserContext;
};
