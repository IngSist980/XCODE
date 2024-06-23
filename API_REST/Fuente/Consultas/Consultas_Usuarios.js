const get = "SELECT id, nombre, cedula FROM Usuarios";
const getById = "SELECT id, nombre, cedula FROM Usuarios WHERE id = $1";
const checkCedulaExists = "SELECT id, nombre, cedula FROM Usuarios WHERE cedula = $1";
const add = "INSERT INTO Usuarios (nombre, cedula) VALUES ($1, $2)";
const remove = "DELETE FROM Usuarios WHERE id = $1";
const update = "UPDATE Usuarios SET nombre=$1, cedula=$2  WHERE id = $3";

module.exports = {
    get,
    getById,
    checkCedulaExists,
    add,
    remove,
    update,
}