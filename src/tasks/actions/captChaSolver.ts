import { Browser, BrowserContext, Page } from "playwright";
import got from "got";
import * as constants from "../../config";
import { AccountGoogle } from "../../interface";
import { isNumeric, randomInteger, randomNumber, wait } from "../../helper";

async function solveCaptcha(page: Page, options: any) {
  const sliderElement = await page.$(".captcha_verify_slide--slidebar");
  const sliderHandle = await page.$(".secsdk-captcha-drag-icon");
  const slider = await sliderElement.boundingBox();
  const handle = await sliderHandle.boundingBox();
  let currentPosition = options.startPosition;
  const target = {
    position: 0,
  };
  await wait(3000);
  await page.mouse.move(
    handle.x + handle.width / 2,
    handle.y + handle.height / 2
  );
  await page.mouse.down();
  while (currentPosition < slider.width - handle.width / 2) {
    await page.mouse.move(
      handle.x + currentPosition,
      handle.y + handle.height / 2 + Math.random() * 10 - 5
    );
    await wait(randomNumber(2, 3) * 1000);
    target.position = currentPosition;
    console.log(
      "🚀 ~ file: captChaSolver.ts ~ line 28 ~ solveCaptcha ~ target",
      target
    );
    currentPosition += options.positionIncrement;
    console.log(
      "🚀 ~ file: captChaSolver.ts ~ line 33 ~ solveCaptcha ~ currentPosition",
      currentPosition
    );
  }
  await wait(randomNumber(5, 7) * 1000);
  await page.mouse.move(
    handle.x + target.position,
    handle.y + handle.height / 2,
    {
      steps: 10,
    }
  );
  await page.mouse.up();
  return true;
}
const resolveCaptchaTikTok = async (page: Page) => {
  const options = { numAttempts: 3, startPosition: 25, positionIncrement: 5 };
  let isNotSolved = true;
  do {
    isNotSolved = await solveCaptcha(page, options);
  } while (true);
};

export { resolveCaptchaTikTok };
