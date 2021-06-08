const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/', {
      target: 'http://localhost:5000', // 后端服务器地址
      changeOrigin: true,
      secure: false,
    })
  );
};
