import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 82 + i);
let totalSum = 0;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const seed of seeds) {
    const url = `https://ds-iitm.github.io/webscrape-seed/${seed}.html`;
    await page.goto(url);

    const tableSums = await page.$$eval('table td', tds =>
        tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );
    totalSum += tableSums.reduce((a, b) => a + b, 0);
}

console.log("✅ Total sum:", totalSum);
await browser.close();
