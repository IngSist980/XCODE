const get = "SELECT id, nombre, cedula FROM Usuario";
const getById = "SELECT id, nombre, cedula FROM Usuario WHERE id = $1";
const checkCedulaExists = "SELECT id, nombre, cedula FROM Usuario WHERE cedula = $1";
const add = "INSERT INTO Usuario (nombre, cedula) VALUES ($1, $2)";
const remove = "DELETE FROM Usuario WHERE id = $1";
const update = "UPDATE Usuario SET nombre=$1, cedula=$2  WHERE id = $3";

module.exports = {
    get,
    getById,
    checkCedulaExists,
    add,
    remove,
    update,
}