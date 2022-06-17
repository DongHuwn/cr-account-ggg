import { chromium, Browser, BrowserContext, Page } from "playwright";
import fs from "fs";
import path from "path";
import { AccountGoogle } from "../interface";
import { spoofing } from "./fingerprint";
import { addStealth } from "./stealth";
import { getCookiesFilter } from "./getCookies";
import { randomInteger, randomNumber, wait } from "../helper";

// const chromePaths = require("chrome-paths");
console.log(path.resolve(__dirname, "../../assets/bin/chrome-win/chrome.exe"));
const CHROMIUM_WIN_PATH = path.resolve(
  __dirname,
  "../../assets/bin/chrome-win/chrome.exe"
);

process.setMaxListeners(0);

export const initializeBrowser = async (
  headless: boolean,
  profile: AccountGoogle
): Promise<any | undefined> => {
  const proxy = profile?.proxy
    ?.replace("https://", "")
    .replace("http://", "")
    .split(":");
  // eslint-disable-next-line
  profile.userAgent = profile.userAgent
    ? profile.userAgent
    : "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.50";

  if (profile.userAgent) {
    const options = {
      headless,
      ignoreHTTPSErrors: true,
      viewport: null,
      locale: "en-US",
      ignoreDefaultArgs: [
        "--enable-automation",
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
      ],
      chromiumSandbox: false,
      userAgent: profile.userAgent,
      executablePath: CHROMIUM_WIN_PATH,

      // slowMo: 80,
      //
      args: [
        // `--window-size=${width || 0 + chrome.x},${height || 0 + chrome.y}`,
        // `--window-position=${getX || 0},${getY || 0}`,
        // '--no-sandbox',
        // '--disable-setuid-sandbox',
        "--enable-webgl",
        "--use-gl=desktop",
        // `--user-agent=${profile.userAgent}`,
        "--disable-dev-shm-usage",
        "--shm-size=4gb",
      ],
    };

    if (profile.latitude && profile.latitude) {
      // @ts-ignore
      options.geolocation = {
        latitude: profile.latitude,
        longitude: profile.longitude,
      };
    }
    if (profile.timezone) {
      // @ts-ignore
      options.timezoneId = profile.timezone;
    }

    profile.isProfileExisted = fs.existsSync(
      `${
        profile.profilePath ||
        `${process.env.PORTABLE_EXECUTABLE_DIR || "."}/profile_path`
      }/${profile.id}/Default`
    );

    console.log("Profile existed: ", profile.isProfileExisted);

    // await wait(20000);

    if (proxy) {
      const proxyServer = proxy[0];
      const proxyPort = proxy[1];
      const proxyUser = proxy[2];
      const proxyPassword = proxy[3];
      // ${args.headless}
      console.log(
        `Start browser headless: alo with proxy: `,
        profile.proxy,
        proxyServer,
        proxyPort,
        proxyUser,
        proxyPassword
      );
      // @ts-ignore
      options.proxy = {
        server: `${proxyServer}${proxyPort ? `:${proxyPort}` : ""}`,
        username: proxyUser,
        password: proxyPassword,
      };
    }
    profile.profilePath = profile.profilePath
      ? profile.profilePath: path.resolve(
        __dirname,
        "../../profile"
      );
    try {
      const context = await chromium.launchPersistentContext(
        path.join(`${profile.profilePath}`, `${profile.id}`),
        options
      );

      (async function () {
        if (profile.cookies) {
          let { cookies } = profile;
          if (typeof cookies === "string") {
            console.log("Cookies in db: ", cookies);
            cookies = JSON.parse(cookies);
          }
          if (cookies.length > 0) {
            // @ts-ignore
            await context.addCookies(cookies);
            profile.cookies = "";
          }
        }
        await addStealth(context).catch((e) =>
          console.error(`error add stealth ${e}`)
        );

        if (!profile.fingerprintSeed) {
          profile.fingerprintSeed = `${profile.name
            ?.toString()
            .replace(/[^\w\s]/gi, "")
            .substring(0, 6)
            .toLowerCase()}_${Math.round(Math.random() * 1000)}`;
        }
        context.setDefaultNavigationTimeout(0);

        await addStealth(context).catch((e) =>
          console.error(`error add stealth ${e}`)
        );

        await context
          .addInitScript(spoofing, profile.fingerprintSeed)
          .catch((e) => console.error(`error evaluate ${e}`));

        console.log("Inject xong");
      })();

      return context;
    } catch (error: any) {
      console.error("Error when init browser: ", error);
      return undefined;
    }
  }
  return undefined;
};

// export const exportCookies = async (
//   profile: AccountGoogle,
//   context: BrowserContext
// ): Promise<any | undefined> => {
//   if (!context) {
//     const proxy = profile?.proxy
//       ?.replace('https://', '')
//       .replace('http://', '')
//       .split(':');
//     const options = {
//       headless: false,
//       ignoreHTTPSErrors: true,
//       viewport: null,
//       locale: 'en-US',
//       geolocation: {
//         latitude: profile.latitude,
//         longitude: profile.longitude,
//       },
//       ignoreDefaultArgs: [
//         '--enable-automation',
//         '--disable-extensions',
//         '--disable-component-extensions-with-background-pages',
//       ],
//       userAgent: profile.userAgent,
//       args: [
//         // `--proxy-server=${proxyServer}${proxyPort ? `:${proxyPort}` : ''}`,
//         `--window-position=${width},${height}`,
//       ],
//     };
//     if (proxy) {
//       const proxyServer = proxy[0];
//       const proxyPort = proxy[1];
//       const proxyUser = proxy[2];
//       const proxyPassword = proxy[3];
//       options.proxy = {
//         server: `${proxyServer}${proxyPort ? `:${proxyPort}` : ''}`,
//         username: proxyUser,
//         password: proxyPassword,
//       };
//     }
//     if (os.platform() === 'win32') {
//       options.executablePath = CHROMIUM_WIN_PATH;
//     } else if (os.platform() === 'darwin') {
//       options.executablePath = CHROMIUM_MAC_PATH;
//     }

//     if (profile.timezone) {
//       options.timezoneId = profile.timezone;
//     }

//     try {
//       const context = await chromium.launchPersistentContext(
//         path.join(`${profile.profilePath}`, `${profile.id}`),
//         options
//       );
//       const cookies = await context.cookies();

//       // console.log('Cookies open browser: ', cookies);
//       await context.close();
//       // return cookies;
//       const cookiesFiltered = getCookiesFilter(
//         [
//           'https://mail.google.com/',
//           'https://admob.google.com/',
//           'https://ads.google.com/',
//         ],
//         cookies
//       );
//       return cookiesFiltered;
//     } catch (error) {
//       console.error('Error when init browser to save cookies: ', error);
//       log.error('Error when init browser to save cookies: ', error);
//       return undefined;
//     }
//   } else {
//     const cookies = await context.cookies();
//     // console.log('Cookies keep browser: ', cookies);
//     const cookiesFiltered = getCookiesFilter(
//       [
//         'https://mail.google.com/',
//         'https://admob.google.com/',
//         'https://ads.google.com/',
//       ],
//       cookies
//     );
//     return cookiesFiltered;
//   }
// };
