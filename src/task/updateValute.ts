import got from "got";
import { HttpsProxyAgent, HttpProxyAgent } from "hpagent";
async function upsertOneProfile(value: any) {
  try {
    const proxy = value?.proxy
      ?.replace("https://", "")
      .replace("http://", "")
      .split(":");
    const proxyServer = proxy[0];
    const proxyPort = proxy[1];
    const proxyUser = proxy[2];
    const proxyPassword = proxy[3];

    const locationAndTimeZone =
      ((await got
        .get(`https://whoer.net/v2/geoip2-city`, {
          agent: {
            https: new HttpsProxyAgent({
              keepAlive: true,
              keepAliveMsecs: 1000,
              maxSockets: 256,
              maxFreeSockets: 256,
              scheduling: "lifo",
              proxy: `http://${proxyUser}:${proxyPassword}@${proxyServer}:${proxyPort}`,
              // ? `${value.proxy.split(':')[0]}${value.proxy.split(':')[1]}`
              // : '',
            }),
          },
        })
        .json()) as any) ||
      ((await got
        .get(`https://whoer.net/v2/geoip2-city`, {
          agent: {
            http: new HttpProxyAgent({
              keepAlive: true,
              keepAliveMsecs: 1000,
              maxSockets: 256,
              maxFreeSockets: 256,
              scheduling: "lifo",
              proxy: `http://${proxyUser}:${proxyPassword}@${proxyServer}:${proxyPort}`,
              // ? `${value.proxy.split(':')[0]}${value.proxy.split(':')[1]}`
              // : '',
            }),
          },
        })
        .json()) as any);
    value.timezone = locationAndTimeZone.time_zone || value.timezone;
    value.latitude = locationAndTimeZone.latitude || value.latitude;
    value.longitude = locationAndTimeZone.longitude || value.longitude;
  } catch (error: any) {
    console.error(`update-profile-error when get timezone\t${error.message}`);
  }

  // value.profilePath =
  //   value.profilePath ||
  //   `${process.env.PORTABLE_EXECUTABLE_DIR || "."}/profile_path`;

  return {
    ...value,
    id: value.id,
  };
}
