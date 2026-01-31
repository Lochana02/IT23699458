import { test, expect } from '@playwright/test';
import testData from '../testData.json';

test.describe('Singlish to Sinhala Automation', () => {

  testData.forEach((data) => {
    test(`Testing Case: ${data.id}`, async ({ page }) => {

      // 1. Open site
      await page.goto('https://www.swifttranslator.com/', {
        waitUntil: 'domcontentloaded',
      });

      // 2. Locate input box
      const inputBox = page.getByPlaceholder('Input Your Singlish Text Here.');
      await inputBox.click();
      await inputBox.fill('');

      // 3. Type input slowly (triggers realtime transliteration)
      await inputBox.type(data.input, { delay: 150 });

      // 4. Locate Sinhala output container (STRICT-MODE SAFE)
      const outputContainer = page
        .getByText('Sinhala', { exact: true })
        .locator('xpath=ancestor::div[contains(@class,"grid")]')
        .locator('div.w-full.h-80.whitespace-pre-wrap')
        .first();

      // 5. Wait until Sinhala Unicode characters appear
      await expect(outputContainer).toContainText(
        /[\u0D80-\u0DFF]/,
        { timeout: 20000 }
      );

      // 6. Allow realtime output to stabilize
      await page.waitForTimeout(500);

      // 7. Read final output
      const actualOutput = (await outputContainer.innerText()).trim();

      console.log(`ID: ${data.id}`);
      console.log(`Expected: ${data.expected}`);
      console.log(`Actual  : ${actualOutput}`);

      // 8. Assertion (robust for transliteration systems)
      expect(actualOutput).toContain(data.expected.trim());
    });
  });

});