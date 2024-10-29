const express = require("express");
const router = express.Router();

// Middleware para verificar API Key
router.use(function (req, res, next) {
    const apiKey_query = req.query.key; // Obtener la API Key de los parámetros de la solicitud
    const apiKey = req.header("X-API-KEY");
    if (!apiKey || apiKey !== process.env['API_KEY']) {
        return res.status(403).json({ error: "API Key inválida o ausente" });
    }
    next();
});


/**
 * @swagger
 * /api/localRoutes/user/profile:
 *   get:
 *     summary: Obtiene el perfil de usuario
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Perfil de usuario obtenido
 *       401:
 *         description: No autorizado
 */
router.get("/user/profile", (req, res) => {
    res.json({ message: "¡Hola, usuario!" });
})

/**
 * @swagger
 * /api/localRoutes/hello:
 *   get:
 *     summary: Obtiene el Saludo del usuario
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *        200:
 *         description: Saluda al usuario
 *        401:
 *         description: No autorizado
 */
router.get("/hello", (req, res) => {
  res.json({ message: "¡Hola, usuario!" });
})

/**
 * @swagger
 * /api/localRoutes/data:
 *   get:
 *     summary: Retorna datos de ejemplo
 *     description: Devuelve un conjunto de datos de ejemplo en formato JSON.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: No autorizado
 */
router.get("/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

module.exports = router;