const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Agrega este middleware para habilitar CORS

app.get('/end_point', (consulta, respuesta) => {
    respuesta.json({ mensaje: 'Servidor iniciado' });
});


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto localhost:${port}`);
});
