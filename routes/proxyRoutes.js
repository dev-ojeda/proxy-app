
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express.Router();
require('dotenv').config();

// Middleware para verificar API Key
router.use(function (req, res, next) {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env['API_KEY']) {
      return res.status(403).json({ error: "API Key inválida o ausente" });
  }
  next();
});

/**
 * @swagger
 * /api/proxyRoutes:
 *   post:
 *     summary: Proxy para obtener publicaciones
 *     description: Redirige la solicitud a una API externa para obtener publicaciones.
 *     responses:
 *       200:
 *         description: OK
 */

router.post('/', (req, res) => {
  res.json({ postMessage: "Hols Post" })
});

const onProxyReq = function (proxyReq, req, res) {
    proxyReq.setHeader('x-api-key', '');
}
const onProxyRes = function (proxyRes, req, res) {
  // add new header to response
  proxyRes.headers['x-api-key'] = 'none';
  // remove header from response
  delete proxyRes.headers['x-removed'];
};
/**
 * @swagger
 * /api/proxyRoutes/posts:
 *   post:
 *     summary: Proxy para obtener publicaciones
 *     security:
 *       - ApiKeyAuth: []
 *     description: Redirige la solicitud a una API externa para obtener publicaciones.
 *     responses:
 *       200:
 *         description: OK
 */
router.use(
  createProxyMiddleware({
    target: "https://jsonplaceholder.typicode.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/proxyRoutes/posts": "", // Redirige a /posts en la API externa
    },
    proxyTimeout: 5000,
    on: { 
      proxyReq: onProxyReq,
      proxyRes: onProxyRes
    }
  })
);

module.exports = router;