import { createRequire } from 'module';

const log = require('electron-log');
const tld = require('tldjs');
const tough = require('tough-cookie');
const { uniqBy } = require('lodash');
// const request = require('request');
// const bigInt = require('big-integer');
const url = require('url');

const filterUrl = (urls: string[]) => {
  const result = urls
    .map((e) => {
      // const parsedUrl = url.parse(e);
      const domain = tld.getDomain(e);
      if (!domain) {
        return '';
      }
      return domain;
    })
    .filter((e) => e !== '');
  return uniqBy(result);
};

const getCookiesFilter = (urls: string[], cookies: any) => {
  if (urls && urls.length > 0 && cookies && cookies.length > 0) {
    const domains = filterUrl(urls);
    // console.log(
    //   '🚀 ~ file: getCookies.ts ~ line 32 ~ getCookiesFilter ~ domains',
    //   domains
    // );
    const cookiesReturn = [];
    // eslint-disable-next-line
    for (const domain of domains) {
      const validCookies = [];
      const regex = new RegExp(`^.*${domain}`);
      cookies.forEach(function (cookie) {
        if (regex.test(cookie.domain)) {
          validCookies.push(cookie);
        }
      });
      cookiesReturn.push(...validCookies);
    }
    return cookiesReturn;
  }
  return cookies;
};
// domain cookies are
// mail.google.com
// mail-ads.google.com
// admob.google.com
// accounts.google.com
export { getCookiesFilter, filterUrl };
