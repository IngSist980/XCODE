const get = "SELECT id, nombre, direccion FROM SUCURSAL";
const getById = "SELECT id, nombre, direccion FROM SUCURSAL WHERE id = $1";
const checkNombreExists = "SELECT id, nombre, direccion FROM SUCURSAL WHERE nombre = $1";
const add = "INSERT INTO SUCURSAL (nombre, direccion) VALUES ($1, $2)";
const remove = "DELETE FROM SUCURSAL WHERE id = $1";
const update = "UPDATE SUCURSAL SET nombre=$1, direccion=$2 WHERE id = $3";

module.exports = {
    get,
    getById,
    checkNombreExists,
    add,
    remove,
    update,
}