const pool = require("../../database");
const queries = require('../Consultas/Consultas_Usuarios');

const get = (req, res) => {
    pool.query(queries.get, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}


const add = (req, res) => {
    const { nombre, cedula } = req.body;

    if (!nombre || !cedula) {
        return res.status(400).json({
            mensaje: "Nombre y cédula son obligatorios"
        });
    }

    pool.query(queries.checkCedulaExists, [cedula], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results.rows.length) {
            return res.status(409).json({
                mensaje: "El usuario ya existe"
            });
        }

        pool.query(queries.add, [nombre, cedula], (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json({
                mensaje: "¡Creado exitosamente!"
            });
        });
    });
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const remove = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getById, [id], (error, results) => {
        const notFound = !results.rows.length;
        if (notFound) {
            res.status(404).send("No existe en la base de datos");
            return;
        }
        pool.query(queries.remove, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Eliminado exitosamente");
        });
    });
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, cedula } = req.body;
    pool.query(queries.getById, [id], (error, results) => {
        const notFound = !results.rows.length;
        if (notFound) {
            res.status(404).send("No existe en la base de datos");
            return;
        }
        pool.query(queries.update, [nombre, cedula, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Actualizado exitosamente");
        });
    });
};

module.exports = {
    get,
    getById,
    add,
    remove,
    update,
}