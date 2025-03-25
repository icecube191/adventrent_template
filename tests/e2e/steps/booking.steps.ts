import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage, login } from '../support/helpers';

Given('I am logged in as a renter', async function() {
  await login({
    email: 'test@example.com',
    password: 'password123',
    role: 'renter'
  });
});

Given('I am on the home screen', async function() {
  const page = await getPage();
  await page.goto('/');
  await page.waitForSelector('[data-testid="home-screen"]');
});

When('I search for {string} vehicles', async function(vehicleType) {
  const page = await getPage();
  await page.fill('[data-testid="search-input"]', vehicleType);
  await page.keyboard.press('Enter');
  await page.waitForSelector('[data-testid="search-results"]');
});

When('I select the first vehicle from the results', async function() {
  const page = await getPage();
  await page.click('[data-testid="vehicle-card"]:first-child');
  await page.waitForSelector('[data-testid="vehicle-details"]');
});

When('I choose rental dates from {string} to {string}', async function(startDate, endDate) {
  const page = await getPage();
  await page.fill('[data-testid="start-date"]', startDate);
  await page.fill('[data-testid="end-date"]', endDate);
});

When('I enter valid payment information', async function(dataTable) {
  const page = await getPage();
  const [paymentInfo] = dataTable.hashes();
  
  await page.fill('[data-testid="card-number"]', paymentInfo.cardNumber);
  await page.fill('[data-testid="expiry-date"]', paymentInfo.expiryDate);
  await page.fill('[data-testid="cvc"]', paymentInfo.cvc);
});

When('I confirm the booking', async function() {
  const page = await getPage();
  await page.click('[data-testid="confirm-booking-button"]');
});

Then('I should see a booking confirmation', async function() {
  const page = await getPage();
  await page.waitForSelector('[data-testid="booking-confirmation"]');
  const confirmationText = await page.textContent('[data-testid="confirmation-message"]');
  expect(confirmationText).toContain('Booking Confirmed');
});

Then('the booking should appear in my trips', async function() {
  const page = await getPage();
  await page.click('[data-testid="trips-tab"]');
  await page.waitForSelector('[data-testid="trips-list"]');
  const bookingExists = await page.isVisible('[data-testid="booking-item"]');
  expect(bookingExists).toBe(true);
});