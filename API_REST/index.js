const express = require("express");
const cors = require("cors");
const Rutas_Usuarios = require('./Fuente/Rutas/Rutas_Usuarios');
const Rutas_Producto = require('./Fuente/Rutas/Rutas_Producto');
const Rutas_Sucursales = require('./Fuente/Rutas/Rutas_Sucursales');


const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({origin: '*'}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/end_point', (req, res) => {
    res.json({ mensaje: 'Servidor iniciado' });
});

// Rutas de la API
app.use('/api/Usuarios', Rutas_Usuarios);
app.use('/api/Producto', Rutas_Producto);
app.use('/api/Sucursales', Rutas_Sucursales);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto localhost:${port}`);
});