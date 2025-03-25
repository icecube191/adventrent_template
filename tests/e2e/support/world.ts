import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { getPage, cleanup } from './helpers';

class CustomWorld extends World {
  page: Page;

  constructor(options) {
    super(options);
  }

  async init() {
    this.page = await getPage();
  }

  async cleanup() {
    await cleanup();
  }
}

setWorldConstructor(CustomWorld);