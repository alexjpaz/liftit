const puppeteer = require('puppeteer');

const baseUrl = process.env.BASE_URL || "http://localhost:8008";

const assert = require('assert');

let browser;

before(async () => {
  browser = await puppeteer.launch({ headless: false });
});

after(async () => {
  if(browser) {
    try {
      await browser.close()
    } catch(e) {
      console.debug("Could not close browser", e);
    }
  }
});

it('should load a profile', async () => {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/login.html`);

  await page.evaluate(() => {
    var expires_at = new Date();
    expires_at.setMinutes(expires_at.getMinutes() + 30);

    localStorage.setItem('identity.google', 'FAKE');
    localStorage.setItem('identity.google.auth', `{"id_token":"FAKE", "expires_at": ${expires_at.getTime()}}`);
    localStorage.setItem('identity.google.profile', '{"ig":"Fake Profile"}');
  });

  await page.goto(`${baseUrl}/#/profile`);

  const html = await page.evaluate(() => document.body.innerHTML);

  assert(html.includes("Build Info"));
  assert(html.includes("Fake Profile"));

  await page.screenshot({path: 'output/example.png'});

  await browser.close();
});
