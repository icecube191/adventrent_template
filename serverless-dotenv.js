const dotenv = require('dotenv');
const path = require('path');

class ServerlessDotenv {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'before:package:initialize': this.loadEnv.bind(this),
    };
  }

  loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.dev');
    const envVars = dotenv.config({ path: envPath }).parsed;

    if (envVars) {
      this.serverless.service.provider.environment = {
        ...this.serverless.service.provider.environment,
        ...envVars
      };
    }
  }
}

module.exports = ServerlessDotenv; 