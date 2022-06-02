const puppeteer = require('puppeteer');
let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();

  await page.goto('localhost:3000');
});
afterEach(async () => {
  await browser.close();
});

test('launch the browser', async () => {
  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

  expect(text).toEqual('Blogster');
});
test('clicking login starts oauth flow', async () => {
  await page.click('.right a');
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, show loguot button', async () => {
  const id = '108786613707153034564';
  const Buffer = require('safe-buffer').Buffer;
  const sessionObject = {
    passport: {
      user: id,
    },
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );
  const Keygrip = require('keygrip');
  const keys = require('../config/keys');
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString);
  console.log(sessionString, sig);
});
