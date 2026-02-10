const { Router } = require('express');
const controller = require('../Controladores/Controlador_Producto');

const router = Router();

router.get('/', controller.get); // Ruta para obtener todos los productos 
router.get("/:id", controller.getById);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;