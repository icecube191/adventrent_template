import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

interface ServerlessConfig {
  service: {
    custom?: {
      dotenv?: {
        path?: string;
        include?: string[];
        exclude?: string[];
      };
    };
  };
}

interface Serverless {
  config: ServerlessConfig;
  service: {
    provider: {
      environment: Record<string, string>;
    };
  };
}

export default class ServerlessDotenvPlugin {
  private serverless: Serverless;
  private options: {
    path?: string;
    include?: string[];
    exclude?: string[];
  };

  constructor(serverless: Serverless) {
    this.serverless = serverless;
    this.options = serverless.service.custom?.dotenv || {};
  }

  private loadEnvFile(): void {
    const envPath = this.options.path || '.env';
    const envFile = path.resolve(process.cwd(), envPath);

    if (fs.existsSync(envFile)) {
      const envConfig = dotenv.parse(fs.readFileSync(envFile));
      const include = this.options.include || Object.keys(envConfig);
      const exclude = this.options.exclude || [];

      Object.entries(envConfig).forEach(([key, value]) => {
        if (include.includes(key) && !exclude.includes(key)) {
          this.serverless.service.provider.environment[key] = value;
        }
      });
    }
  }

  public async beforeDeploy(): Promise<void> {
    this.loadEnvFile();
  }
} 