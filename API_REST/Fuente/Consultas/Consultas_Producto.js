const get = "SELECT id, nombre, numero FROM Producto";
const getById = "SELECT id, nombre, numero FROM Producto WHERE id = $1";
const checkNumeroExists = "SELECT id, nombre, numero FROM Producto WHERE numero = $1";
const add = "INSERT INTO Producto (nombre, numero) VALUES ($1, $2)";
const remove = "DELETE FROM Producto WHERE id = $1";
const update = "UPDATE Producto SET nombre=$1, numero=$2 WHERE id = $3";

module.exports = {
    get,
    getById,
    checkNumeroExists,
    add,
    remove,
    update,
}