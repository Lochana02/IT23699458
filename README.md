# Singlish to Sinhala Translator - Playwright Test Suite

## Overview

This project contains an automated test suite for the **Singlish ↔ English Translator** application, specifically focusing on testing the Singlish-to-Sinhala transliteration functionality using Playwright.

The application allows users to input text in Singlish (phonetic Sinhala) and automatically converts it to Sinhala Unicode characters in real-time.

## Project Structure

```
.
├── tests/
│   └── singlish_test.spec.ts          # Main test file with all test cases
├── testData.json                       # Test data with positive and negative test cases
├── playwright.config.ts                # Playwright configuration
├── playwright-report/                  # HTML test report
├── test-results/                       # Test execution results and snapshots
├── package.json                        # Project dependencies
├── .github/workflows/
│   └── playwright.yml                  # CI/CD workflow for GitHub Actions
└── README.md                           # This file
```

## Technology Stack

- **Test Framework**: Playwright (v1.58.0+)
- **Language**: TypeScript
- **Node.js**: LTS version
- **CI/CD**: GitHub Actions
- **Test Data Format**: JSON

## Test Data Overview

The project includes **34+ test cases** covering:
- **30+ Positive Test Cases**: Valid Singlish inputs with expected Sinhala outputs
- **4+ UI Test Cases**: User interface and interaction testing
- **Input Types**: S (Short), M (Medium), L (Long) paragraphs

### Test Data Structure

Each test case contains:
- **TC_ID**: Unique test identifier (e.g., `Pos_Fun_0001`, `Pos_UI_001`)
- **Test_case_name**: Descriptive name of the test scenario
- **Input_length_type**: S/M/L for Short/Medium/Long inputs
- **Input**: Singlish text to be converted
- **Expected_output**: Expected Sinhala Unicode output

### Sample Test Cases

| TC_ID | Input | Expected Output | Type |
|-------|-------|-----------------|------|
| Pos_Fun_0001 | `api adha gedhara yamudha?` | `අපි අද ගෙදර යමුද?` | Daily Greeting |
| Pos_Fun_0002 | `Api adha havasata topic ekak select...` | `අපි අද හවසට topic එකක්...` | Meeting Arrangement |
| Pos_Fun_0007 | `mama pebaravari 02 train ekata yanavaa...` | `මම පෙබරවරි 02 train එකට යනවා...` | Travel Details |
| Pos_Fun_0027 | `heta dhivayinee godak paLaath valata...` | `හෙට දිවයිනේ ගොඩක් පළාත්...` | Weather Warning |
| Pos_Fun_0034 | `nishini rata yanne adha nisaa api...` | `නිශිනි රට යන්නෙ අද නිසා අපි...` | Long Narrative |

### Test Categories

**Positive Test Cases Cover:**
- Daily greetings and casual conversations
- Meeting arrangements and business communication
- Festival and holiday planning
- Health and medical inquiries
- Educational and exam-related topics
- Travel logistics and transportation
- Weather and geographical information
- Emotional narratives and personal experiences
- Formal instructions and guidelines
- Mixed language scenarios with English terms

## Setup Instructions

### Prerequisites

- Node.js (LTS version)
- npm (v7 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lochana02/IT23699458.git
   cd IT23699458
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode (see browser)
```bash
npx playwright test --headed
```

### Run Specific Test File
```bash
npx playwright test tests/singlish_test.spec.ts
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
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
- 🎥 Video recordings (if enabled)

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
```

## Configuration

Edit `playwright.config.ts` to customize:

```typescript
// Test timeout (default: 30s per test)
timeout: 30000,

// Retries on CI (default: 2 attempts)
retries: process.env.CI ? 2 : 0,

// Parallel workers
workers: process.env.CI ? 1 : undefined,

// Base URL for testing
use: {
  baseURL: 'https://swifttranslator.com',
}
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout in `playwright.config.ts` or check website availability |
| Selectors not found | Run tests in headed mode: `npx playwright test --headed --debug` |
| Unicode characters not appearing | Verify browser language settings and check page rendering |
| Network errors | Ensure stable internet connection to the application URL |
| Permission denied | Run with admin privileges or check file permissions |

### Enable Detailed Logging

```bash
DEBUG=pw:api npx playwright test
```

### Run Single Test for Debugging

```bash
npx playwright test tests/singlish_test.spec.ts -g "Pos_Fun_0001" --headed --debug
```

## Test Statistics

- **Total Test Cases**: 34+
- **Positive Test Cases**: 30+
- **UI Test Cases**: 4+
- **Input Categories**: 
  - Short (S): Daily greetings, simple phrases
  - Medium (M): Sentences with mixed language
  - Long (L): Multi-sentence paragraphs
- **Browser Coverage**: Chromium, Firefox, WebKit
- **Test Domains Covered**: 15+ different scenarios

## Application Under Test

- **Name**: Singlish to Sinhala Translator
- **URL**: https://swifttranslator.com
- **Purpose**: Real-time transliteration from Singlish (phonetic Sinhala) to Sinhala Unicode
- **Features Tested**: Input conversion, real-time processing, Unicode output validation

## Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.58.0",
    "typescript": "^5.0.0"
  }
}
```

## Documentation

- [Playwright Official Documentation](https://playwright.dev)
- [Test Configuration Guide](https://playwright.dev/docs/test-configuration)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

## Best Practices

- ✅ Run tests regularly before committing code
- ✅ Review HTML reports for failed tests
- ✅ Keep test data updated with new scenarios
- ✅ Use descriptive test case names
- ✅ Maintain consistent assertion patterns
- ✅ Document any new test additions


## Author

**IT23699458**

## Repository

https://github.com/Lochana02/IT23699458

---

**Last Updated**: January 31, 2026  
**Application Tested**: Singlish ↔ English Translator (swifttranslator.com)  
**Test Framework Version**: Playwright v1.58.0+

## License

This project is part of BSc (Hons) in Information Technology - Year 3, Assignment 1 (IT3040 - ITPM).

ISC License - See LICENSE file for details.

## Repository Access

This repository is **publicly accessible** at:
https://github.com/Lochana02/IT23699458

**Status**: ✅ Public Repository