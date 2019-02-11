const puppeteer = require('puppeteer');

const baseUrl = process.env.BASE_URL || "http://localhost:8008";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${baseUrl}`);
  await page.screenshot({path: 'output/example.png'});

  await browser.close();
})();
