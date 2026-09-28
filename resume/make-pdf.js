// Renders Zhornyak_Resume.html to ../Zhornyak_Resume.pdf (one US Letter page).
// Usage: npm i playwright-core && node resume/make-pdf.js [path/to/chromium]
const path = require('path');
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch(process.argv[2] ? { executablePath: process.argv[2] } : {});
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'Zhornyak_Resume.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(__dirname, '..', 'Zhornyak_Resume.pdf'),
    width: '8.5in',
    height: '11in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });
  await browser.close();
})();
