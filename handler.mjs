import serverless from 'serverless-http';
import app from './server/index.mjs';

const handler = serverless(app);
console.log('Handler created:', typeof handler);
console.log('Handler exports:', { handler, default: handler });

export { handler }; 