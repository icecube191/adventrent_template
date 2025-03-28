const serverless = require('serverless-http');
const app = require('./server');

// Wrap the Express app with serverless-http and handle stage-aware paths
const handler = serverless(app, {
  binary: ['application/octet-stream'],
  request: (request, event, context) => {
    // Ensure originalUrl includes stage (for routing to work correctly under /dev)
    request.originalUrl = `/${event.requestContext.stage}${request.url}`;
  }
});

module.exports.server = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await handler(event, context);
};
