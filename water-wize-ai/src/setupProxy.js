const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/calculator',
    createProxyMiddleware({
      target: 'http://localhost:80/',
      changeOrigin: true,
    })
  );
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:80/',
      changeOrigin: true,
    })
  );
};
