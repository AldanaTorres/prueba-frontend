const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/services/",
    createProxyMiddleware({
      target: "http://app.test.di.dgi.loc:8080",
      //target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};