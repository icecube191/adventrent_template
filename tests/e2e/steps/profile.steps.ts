import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage, login } from '../support/helpers';

Given('I am logged in', async function() {
  await login({
    email: 'test@example.com',
    password: 'password123'
  });
});

Given('I am on the profile screen', async function() {
  const page = await getPage();
  await page.click('[data-testid="profile-tab"]');
  await page.waitForSelector('[data-testid="profile-screen"]');
});

When('I tap on {string}', async function(menuItem) {
  const page = await getPage();
  await page.click(`text=${menuItem}`);
});

When('I enter a new phone number {string}', async function(phoneNumber) {
  const page = await getPage();
  await page.fill('[data-testid="phone-input"]', phoneNumber);
});

When('I save the changes', async function() {
  const page = await getPage();
  await page.click('[data-testid="save-button"]');
});

When('I select the {string} role', async function(role) {
  const page = await getPage();
  await page.click(`[data-testid="role-${role}"]`);
});

Then('I should see a success message', async function() {
  const page = await getPage();
  await page.waitForSelector('[data-testid="success-message"]');
  const message = await page.textContent('[data-testid="success-message"]');
  expect(message).toContain('Successfully updated');
});

Then('my phone number should be updated to {string}', async function(phoneNumber) {
  const page = await getPage();
  const displayedNumber = await page.textContent('[data-testid="phone-display"]');
  expect(displayedNumber).toBe(phoneNumber);
});

Then('I should see the rentee features', async function() {
  const page = await getPage();
  await page.waitForSelector('[data-testid="rentee-features"]');
});

Then('my role should be updated to {string}', async function(role) {
  const page = await getPage();
  const activeRole = await page.getAttribute('[data-testid="active-role"]', 'data-role');
  expect(activeRole).toBe(role);
});