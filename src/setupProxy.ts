import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

module.exports = function(app: Express) {
    app.use(
        '/pnt-api',
        createProxyMiddleware({
            target: 'https://v1690117.com',
            changeOrigin: true,
        })
    );
};
