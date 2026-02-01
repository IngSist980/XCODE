DROP TABLE IF EXISTS rol CASCADE;

CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO rol (nombre) VALUES
('Administrador'),
('Usuario');

SELECT * FROM rol;

DELETE USUARIOS

DROP TABLE IF EXISTS usuarios CASCADE;



CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rol_id)
        REFERENCES rol(id)
);

INSERT INTO usuario (nombre, email, password, rol_id) VALUES
('Admin Principal', 'admin@correo.com', '123456', 1),
('Juan Pérez', 'juan@correo.com', '123456', 2),
('María López', 'maria@correo.com', '123456', 2);


SELECT * FROM usuario



CREATE TABLE Producto (
 id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
   numero INTEGER NOT NULL

);

SELECT * FROM producto