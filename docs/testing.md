# Testing Guide

This document outlines the testing setup and procedures for the Advenrent project.

## Test Structure

The project uses multiple testing approaches:

- Unit Tests: Uses Jest with `@testing-library/react-native`
- API Tests: Uses `supertest` for backend endpoints
- E2E Tests: Uses Cucumber with Playwright

## Running Tests

### Unit Tests
```bash
npm test
```

### API Tests
```bash
npm run test:server
```

### E2E Tests
```bash
# Run E2E tests in headed mode
npm run test:e2e

# Run E2E tests in headless mode
npm run test:e2e:headless
```

## E2E Testing

### Features
Located in `tests/e2e/features/`:
- booking.feature: Tests the vehicle booking flow
- profile.feature: Tests profile management

### Step Definitions
Located in `tests/e2e/steps/`:
- booking.steps.ts: Implements booking scenarios
- profile.steps.ts: Implements profile management scenarios

### Support Files
Located in `tests/e2e/support/`:
- helpers.ts: Common test utilities
- world.ts: Cucumber World configuration

### Writing Tests

1. Create a .feature file:
```gherkin
Feature: Example Feature
  Scenario: Example Scenario
    Given I am logged in
    When I do something
    Then I should see a result
```

2. Implement step definitions:
```typescript
import { Given, When, Then } from '@cucumber/cucumber';

Given('I am logged in', async function() {
  await login(testUser);
});
```

### Best Practices

1. Use data-testid attributes:
```tsx
<Button testID="submit-button">Submit</Button>
```

2. Keep scenarios focused:
- Test one flow at a time
- Use Background for common setup
- Avoid scenario interdependence

3. Use helper functions:
- Reuse common steps
- Handle setup/teardown
- Manage test data

4. Handle async operations:
- Wait for elements to appear
- Check for loading states
- Verify success/error messages

## Environment Setup

### Test Database
- Separate database for testing
- Cleaned before each test run
- Uses test-specific seeds

### Environment Variables
Create `.env.test`:
```
DATABASE_URL=postgresql://test_user:password@localhost:5432/advenrent_test
JWT_SECRET=test_jwt_secret
```

## Continuous Integration

Tests run automatically on:
- Pull requests
- Merges to main
- Release builds

### CI Configuration
```yaml
- name: Run Tests
  run: |
    npm test
    npm run test:server
    npm run test:e2e:headless
```

## Debugging Tests

### E2E Tests
1. Run in headed mode:
```bash
npm run test:e2e
```

2. Add debug points:
```typescript
When('something happens', async function() {
  console.log('Debug:', await this.page.content());
});
```

### Unit Tests
```bash
npm test -- --debug
```

## Coverage Requirements

- Unit Tests: 80% coverage
- API Tests: 90% coverage
- E2E Tests: Critical user flows

## Troubleshooting

Common issues and solutions:

1. Flaky Tests
- Add proper waits
- Check for race conditions
- Verify element visibility

2. Database Issues
```bash
# Reset test database
npm run test:reset-db
```

3. Timeout Errors
- Increase timeout in cucumber.js
- Add explicit waits
- Check for performance issues