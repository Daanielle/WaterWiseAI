const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://localhost:80/',
      changeOrigin: true,
      secure: true,
    })
  );
  app.use(
    '/calculator',
    createProxyMiddleware({
      target: 'http://localhost:80/',
      changeOrigin: true,
      secure: true,

    })
  );
  app.use(
    '/forum',
    createProxyMiddleware({
      target: 'http://localhost:80/',
      changeOrigin: true,
      secure: true,


    })
  );
  // app.use(
  //   '/',
  //   createProxyMiddleware({
  //     target: 'http://localhost:80/',
  //     changeOrigin: true,
  //   })
  // );

};
