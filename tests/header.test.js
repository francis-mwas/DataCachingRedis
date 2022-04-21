const puppeteer = require('puppeteer');


test('Adds two numbers together', () => {
  const sum = 1 + 5;
  expect(sum).toEqual(6);
});

test('launch the browser', ()=>{
    const browser = await = puppeteer.launch({});
})