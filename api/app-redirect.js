module.exports = (req, res) => {
  const userAgent = req.headers["user-agent"] || "";
  const host = req.headers.host || "sunnah-way-web.vercel.app";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const websiteUrl = `${protocol}://${host}`;

  const config = {
    androidAppId: "com.sunnahway.app",
    iosAppId: "6761305443",
    websiteUrl,
  };

  let redirectUrl = config.websiteUrl;

  if (userAgent.toLowerCase().includes("android")) {
    redirectUrl = `https://play.google.com/store/apps/details?id=${config.androidAppId}`;
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    redirectUrl = `https://apps.apple.com/us/app/sunnah-way/id${config.iosAppId}`;
  }

  res.setHeader("Cache-Control", "no-cache");
  res.writeHead(302, { Location: redirectUrl });
  res.end();
};
