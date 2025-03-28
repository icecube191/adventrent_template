import { chromium, Page } from 'playwright';
import { config } from '../../../config';

let browser;
let page: Page;

interface LoginOptions {
  email: string;
  password: string;
  role?: string;
}

export async function getPage(): Promise<Page> {
  if (!browser) {
    browser = await chromium.launch({
      headless: process.env.HEADLESS === 'true'
    });
  }
  
  if (!page) {
    page = await browser.newPage();
    await page.goto(config.baseUrl);
  }
  
  return page;
}

export async function login(options: LoginOptions): Promise<void> {
  const page = await getPage();
  
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', options.email);
  await page.fill('[data-testid="password-input"]', options.password);
  await page.click('[data-testid="login-button"]');
  
  await page.waitForSelector('[data-testid="home-screen"]');
  
  if (options.role) {
    await page.click('[data-testid="profile-tab"]');
    await page.click(`[data-testid="role-${options.role}"]`);
    await page.click('[data-testid="home-tab"]');
  }
}

export async function cleanup(): Promise<void> {
  if (page) {
    await page.close();
    page = null;
  }
  
  if (browser) {
    await browser.close();
    browser = null;
  }
}