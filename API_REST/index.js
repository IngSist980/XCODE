const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/end_point', (consulta, respuesta) => {
    respuesta.send('Servidor iniciado');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
