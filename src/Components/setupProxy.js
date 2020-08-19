const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/payfast',
    createProxyMiddleware({
      target: 'https://sandbox.payfast.co.za/eng/process',
      changeOrigin: true,
    })
  );
};