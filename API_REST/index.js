const express = require("express");
const cors = require("cors");
const Rutas_Usuarios = require('./Fuente/Rutas/Rutas_Usuarios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin:'*'}));    //acceso a todos los origenes, cualquier url
/*
const whitelist = ['https://sacf-2022.web.app']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}
*/

app.use(express.json());
app.use(cors()); 

app.get('/end_point', (consulta, respuesta) => {
    respuesta.json({ mensaje: 'Servidor iniciado' });
});

app.use('/api/Usuarios', Rutas_Usuarios);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto localhost:${port}`);
});
