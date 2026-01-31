# ✍️ Singlish to Sinhala Automation Suite

## Project Overview

This is a robust automation framework developed with **Playwright** and **TypeScript**. Its primary goal is to perform high-accuracy validation of phonetic Singlish-to-Sinhala translations on the [Swift Translator](https://www.swifttranslator.com/) web platform.

## Why This Project is Unique

Automating real-time translation tools is challenging because results are generated dynamically. This project overcomes these challenges using advanced automation techniques:

### 1. **Mimic Human Behavior**
Standard automation tools enter text instantly (`page.fill()`), which often fails to trigger translation engines. We use `.type()` with a **150ms delay** per character to simulate a real user, ensuring the website's JavaScript properly converts the text.

```typescript
await inputBox.type(data.input, { delay: 150 });
```

### 2. **Regex-Based Smart Waiting**
To prevent capturing "English" text before it turns into "Sinhala," we implemented a custom **Unicode Regex assertion**. The test specifically waits until it detects Sinhala characters (`/[\u0D80-\u0DFF]/`) in the output box.

```typescript
await expect(outputContainer).toContainText(/[\u0D80-\u0DFF]/, { timeout: 20000 });
```

### 3. **Data-Driven Scalability**
The entire test suite is driven by a `testData.json` file. This allows adding dozens of new test cases (Positive & Negative) without changing a single line of code.

## Technical Implementation

- **Language**: TypeScript
- **Framework**: Playwright v1.58.0+
- **Node.js**: LTS version
- **Test Data Format**: JSON

### Key Logic

**Sequential Input Simulation:**
```typescript
await inputBox.type(data.input, { delay: 150 });
```
Delays 150ms between each character to trigger real-time translation engine.

**Unicode Detection:**
```typescript
await expect(outputContainer).toContainText(/[\u0D80-\u0DFF]/, { timeout: 20000 });
```
Waits specifically for Sinhala Unicode characters (U+0D80 to U+0DFF range).

**Robust Assertion:**
```typescript
expect(actualOutput).toContain(data.expected.trim());
```
Uses substring matching to account for transliteration variations.

## Project Structure

```
.
├── tests/
│   └── singlish_test.spec.ts          # Core test script with intelligent sync logic
├── testData.json                       # External database for 30+ phonetic scenarios
├── playwright.config.ts                # Configured for Headed Mode, Screenshots, Tracing
├── .github/workflows/
│   └── playwright.yml                  # CI/CD automation with GitHub Actions
└── README.md                           # Documentation
```

## Test Coverage

- **Total Test Cases**: 34+
- **Positive Test Cases**: 30+
- **Test Categories**: 
  - Daily greetings and conversations
  - Meeting arrangements
  - Travel logistics
  - Health & medical inquiries
  - Educational topics
  - Emotional narratives
  - Weather information
  - Mixed language scenarios

### Input Types

| Type | Description | Example |
|------|-------------|---------|
| **S** (Short) | Daily greetings, simple phrases | `api adha gedhara yamudha?` |
| **M** (Medium) | Sentences with mixed language | `Api adha havasata topic ekak select...` |
| **L** (Long) | Multi-sentence paragraphs | `nishini rata yanne adha nisaa api...` |

## Getting Started

### Prerequisites
- Node.js (LTS)
- npm (v7+)

### Quick Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Execute Tests**
   ```bash
   npx playwright test --project=chromium
   ```

3. **Generate Reports**
   ```bash
   npx playwright show-report
   ```

## Advanced Usage

### Run Tests in Headed Mode (see browser)
```bash
npx playwright test --headed
```

### Debug Single Test
```bash
npx playwright test -g "Pos_Fun_0001" --headed --debug
```

### Enable Detailed Logging
```bash
DEBUG=pw:api npx playwright test
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
```

### Run Single Test Case
```bash
npx playwright test -g "Pos_Fun_0001"
```

## Test Report

After running tests, an HTML report is automatically generated:

```bash
npx playwright show-report
```

The report displays:
- ✅ Passed tests with execution time
- ❌ Failed tests with error details
- 📸 Screenshots and page snapshots
- ⏱️ Test duration breakdown
- 📋 Step-by-step test execution logs


## Test Implementation Details

### Test Flow

1. **Navigate** to the Singlish translator application
2. **Locate** the input textbox using playwright locators
3. **Type** Singlish text with 150ms delay (triggers real-time transliteration)
4. **Wait** for Sinhala Unicode characters to appear (30s timeout)
5. **Verify** the output contains expected Sinhala text
6. **Assert** using robust substring matching for transliteration variations

### Key Locators

```typescript
// Input box
const inputBox = page.getByPlaceholder('Input Your Singlish Text Here.');

// Output container (Sinhala section)
const outputContainer = page
  .getByText('Sinhala', { exact: true })
  .locator('xpath=ancestor::div[contains(@class,"grid")]')
  .locator('div.w-full.h-80.whitespace-pre-wrap')
  .first();
```

### Assertion Strategy

The tests use **robust substring matching** that checks if the output contains the expected text, accounting for transliteration system variations and unicode rendering differences:

```typescript
expect(actualOutput).toContain(data.expected.trim());
```

## Continuous Integration

The project is configured with **GitHub Actions** (`.github/workflows/playwright.yml`) to:

- ✅ Automatically run tests on push and pull requests
- ✅ Test on Ubuntu latest environment
- ✅ Generate and upload HTML reports as artifacts
- ✅ Retain reports for 30 days
- ✅ Run tests in parallel for faster execution

### GitHub Actions Workflow Stages

```yaml
1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Install Playwright browsers
5. Run tests
6. Upload HTML report as artifact
7. Archive test results
>>>>>>> 56fd099a676debf9aae2f6c971beb79c522cf457
```

## Configuration

Edit `playwright.config.ts` to customize:

```typescript
// Test timeout
timeout: 30000,

// Retries on CI
retries: process.env.CI ? 2 : 0,

// Base URL
use: {
  baseURL: 'https://swifttranslator.com',
}
```

## Continuous Integration

Automated testing via **GitHub Actions**:
- Runs on every push and pull request
- Tests on Ubuntu latest
- Generates HTML reports
- Uploads artifacts for 30 days

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout or check site availability |
| Selectors not found | Run with `--headed --debug` |
| Unicode not appearing | Verify browser language settings |
| Network errors | Check internet connection |

## Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.58.0",
    "typescript": "^5.0.0"
  }
}
```

## Application Under Test

- **Name**: Singlish to Sinhala Translator
- **URL**: https://www.swifttranslator.com
- **Purpose**: Real-time phonetic-to-Unicode transliteration

## License

ISC License - BSc (Hons) Information Technology, Year 3 (IT3040 - ITPM)

## Author

IT23699458

## Repository

https://github.com/Lochana02/IT23699458 ✅ **Public**

---

**Last Updated**: January 31, 2026
