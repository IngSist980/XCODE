CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(25),
    cedula VARCHAR(25) 
    
);




CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    numero INTEGER NOT NULL
);

