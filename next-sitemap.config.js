/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://devs7ud.io", // Change to the production URL
  changefreq: "daily",
  generateRobotsTxt: true,
  exclude: ["/sign-in", "/sign-up"],
}
