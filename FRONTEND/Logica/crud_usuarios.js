const Usuario_url = 'http://localhost:3000/api/Usuarios';


function get(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
}


function create(url, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Realiza la solicitud POST a la API
    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no se pudo completar correctamente. Código de estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            return data;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            throw error;
        });
}



function update(url, data) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON
  };
  // Realiza la solicitud PUT a la API
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
      }
      return response.json(); // Parsea la respuesta JSON si la hay
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}

function eliminate(url, id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Realiza la solicitud DELETE a la API
    return fetch(`${url}/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no se pudo completar correctamente');
        }
        console.log(`Eliminado con éxito para el ID: ${id}`);
      })
      .catch((error) => {
        console.error(`Error al eliminar para el ID: ${id}`, error);
        throw error;
      });
  }



// Función para agregar una persona
async function agregarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;

    if (!nombre || !cedula) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    
    
    const Usuario = { nombre, cedula};

    try {
        await create(Usuario_url, Usuario);
        alert('Agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al agregar Usuario.');
    }
    
}




async function eliminarUsuario() {
    const selectedId = document.getElementById('selectUsuario').value;

    if (!selectedId) {
        alert('Por favor, seleccione una Usuario para eliminar.');
        return;
    }

    try {
        await eliminate(Usuario_url, selectedId);
        alert('Eliminado con éxito');
        limpiarFormulario();
        await actualizarLista();
        location.reload();
        llenarSelect();
    } catch (error) {
        alert(`Error al eliminar para el ID: ${selectedId}.`);
    }
}



// Función para editar una persona
async function editarUsuario() {
    const selectedId = document.getElementById('selectUsuario').value;
    const nombre = document.getElementById('nombreEditar').value;
    const cedula = parseInt(document.getElementById('cedulaEditar').value, 10);

    if (!selectedId || !nombre || !cedula) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    

    const objetoEditado = {
        nombre,
        cedula
    };

    try {
        await update(`${Usuario_url}/${selectedId}`, objetoEditado);
        alert('Editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al editar Usuario.');
    } 
}

// Función para llenar opciones de select
function llenarSelect() {
    const selectUsuario = document.getElementById('selectUsuario');

    // Obtener la lista de personas almacenada en el localStorage
    get(Usuario_url)
        .then(Usuarios => {
            // Verificar si personas es un array antes de usar forEach
            if (!Array.isArray(Usuarios)) {
                console.error('Error: La respuesta no es un array de Usuarios');
                return;
            }

            // Limpiar opciones actuales
            selectUsuario.innerHTML = '<option value="">Seleccionar</option>';

            // Llenar opciones con los nombres de las personas
            Usuarios.forEach(Usuario => {
                const option = document.createElement('option');
                option.value = Usuario.id;
                option.textContent = `${Usuario.id}:  ${Usuario.nombre}  ${Usuario.cedula}`;
                selectUsuario.appendChild(option);
            });

            // Agregar evento change al selectPersona
            selectUsuario.addEventListener('change', function () {
                const selectedId = this.value;

                // Obtener la información de la persona seleccionada
                const UsuarioSeleccionado = Usuario.find(Usuario => Usuario.id == selectedId);

                if (UsuarioSeleccionado) {
                    document.getElementById('nombreEditar').value = personaSeleccionada.nombre;
                    document.getElementById('cedulaEditar').value = personaSeleccionada.cedula;
    
                } else {
                    // Limpiar campos de texto si la persona seleccionada no está definida
                    limpiarFormulario();
                }
            });
        })
        .catch(error => {
            alert(error);
        });
}


// Función para actualizar la lista de personas en la tabla
function actualizarLista() {
    const UsuariosList = document.getElementById('UsuariosList');

    
    get(Usuario_url)
        .then(Usuarios => {
            console.log(Usuarios);
            // Verificar si personas es un array antes de usar forEach
            if (!Array.isArray(Usuarios)) {
                console.error('Error: La respuesta no es un array de Usuarios');
                return;
            }

            // Limpiar la tabla
            UsuariosList.innerHTML = '';

            // Llenar la tabla con los datos de las personas
            Usuarios.forEach(Usuario => {
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${Usuario.id}</td>
                    <td>${Usuario.nombre}</td>
                    <td>${Usuario.cedula}</td> 
                `;
                UsuariosList.appendChild(row);
            });
        })
        .catch(error => {
            alert(error);
        });
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('cedula').value = '';

    document.getElementById('nombreEditar').value = '';
    document.getElementById('cedulaEditar').value = ''; 
}


document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a elementos del DOM
    const btnAgregar = document.getElementById('btnAgregar');
    const btnEditar = document.getElementById('btnEditar');
    const btnEliminar = document.getElementById('btnEliminar');
    // Escuchar clic en botón "Agregar"
    btnAgregar.addEventListener('click', function () {
        agregarUsuario();
    });

    // Escuchar clic en botón "Editar"
    btnEditar.addEventListener('click', function () {
        editarUsuario();
    });

    // Escuchar clic en botón "Eliminar"
    btnEliminar.addEventListener('click', function () {
        eliminarUsuario();
    });

    // Llenar opciones de select al cargar la página
    llenarSelect();

    // Llenar lista de personas al cargar la página
    actualizarLista();
});
