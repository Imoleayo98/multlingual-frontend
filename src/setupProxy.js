const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/translate', // Change this path to match the URL you want to proxy
    createProxyMiddleware({
      target: 'https://api.cognitive.microsofttranslator.com',
      changeOrigin: true,
      pathRewrite: {
        '^/translate': '', // Remove '/translate' from the request path
      },
    })
  );
};