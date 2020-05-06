const next = require('next');
const Hapi = require('@hapi/hapi');
const {
  pathWrapper,
  defaultHandlerWrapper,
  nextHandlerWrapper
} = require('./next-wrapper');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const server = new Hapi.Server({
  port
});

const register = require('./handlers/register');
const confirmNumber = require('./handlers/confirmNumber');
const cancelVerification = require('./handlers/cancelVerification');
const listUsers = require('./handlers/listUsers');
const startChat = require('./handlers/startChat');
const proxyWebhook = require('./handlers/proxyWebhook');

require('./db/schema');

app.prepare().then(async () => {
  server.route({
    method: 'POST',
    path: '/register',
    handler: register
  });

  server.route({
    method: 'POST',
    path: '/confirmNumber',
    handler: confirmNumber
  });

  server.route({
    method: 'POST',
    path: '/cancelVerification',
    handler: cancelVerification
  });

  server.route({
    method: 'GET',
    path: '/users',
    handler: pathWrapper(app, '/users')
  });

  server.route({
    method: 'GET',
    path: '/api/users',
    handler: listUsers
  });

  server.route({
    method: 'POST',
    path: '/chat',
    handler: startChat
  });

  server.route({
    method: 'GET',
    path: '/webhooks/inbound-sms',
    handler: proxyWebhook
  });

  server.route({
    method: 'GET',
    path: '/_next/{p*}' /* next specific routes */,
    handler: nextHandlerWrapper(app)
  });

  server.route({
    method: 'GET',
    path: '/static/{p*}' /* use next to handle static files */,
    handler: nextHandlerWrapper(app)
  });

  server.route({
    method: '*',
    path: '/{p*}' /* catch all route */,
    handler: defaultHandlerWrapper(app)
  });

  try {
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log('Error starting server');
    console.log(error);
  }
});
