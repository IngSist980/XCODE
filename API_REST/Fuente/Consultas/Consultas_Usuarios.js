const get = "SELECT id, nombre, cedula FROM Usuarios";
const getById = "SELECT numero, fecha_creacion, divisa FROM asiento WHERE numero = $1";
const checkIdExists = "SELECT numero, fecha_creacion, divisa FROM asiento WHERE numero = $1";
const add = "INSERT INTO asiento (numero, fecha_creacion, divisa) VALUES ($1, $2, $3)";






const remove = "DELETE FROM ASIENTO WHERE numero = $1";
const update = "UPDATE ASIENTO SET id_asiento=$1, num_asiento=$2, num_cuenta=$3, cuenta=$4, debitos=$5, creditos=$6, descripcion=$7, impuestos=$8, fecha_creacion=$9, fecha_emision_factura=$10, proveedor=$11  WHERE numero = $12";

module.exports = {
    get,
    getById,
    checkIdExists,
    add,
    remove,
    update,
}