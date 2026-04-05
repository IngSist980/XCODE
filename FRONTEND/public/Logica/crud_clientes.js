const Clientes_url = 'http://localhost:3000/api/Clientes';

function get(url) { // Función para realizar una solicitud GET a la API
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
    body: JSON.stringify(data),
  };
  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
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

function eliminate(url, id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
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

async function agregarCliente() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;

    if (!nombre || !direccion) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    const Cliente = { nombre, direccion };

    try {
        await create(Clientes_url, Cliente);
        alert('Agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al agregar Cliente.');
    }
}

async function eliminarCliente() {
    const selectedId = document.getElementById('selectCliente').value;

    if (!selectedId) {
        alert('Por favor, seleccione un cliente para eliminar.');
        return;
    }

    try {
        await eliminate(Clientes_url, selectedId);
        alert('Eliminado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert(`Error al eliminar para el ID: ${selectedId}.`);
    }
}

async function editarCliente() {
    const selectedId = document.getElementById('selectCliente').value;
    const nombre = document.getElementById('nombreEditar').value;
    const direccion = document.getElementById('direccionEditar').value;

    if (!selectedId || !nombre || !direccion) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const objetoEditado = {
        nombre,
        direccion
    };

    try {
        await update(`${Clientes_url}/${selectedId}`, objetoEditado);
        alert('Editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al editar Cliente.');
    } 
}

function llenarSelect() {
    const selectCliente = document.getElementById('selectCliente');

    get(Clientes_url)
        .then(Clientes => {
            if (!Array.isArray(Clientes)) {
                console.error('Error: La respuesta no es un array de Clientes');
                return;
            }

            selectCliente.innerHTML = '<option value="">Seleccionar</option>';

            Clientes.forEach(Cliente => {
                const option = document.createElement('option');
                option.value = Cliente.id;
                option.textContent = `${Cliente.id}: ${Cliente.nombre} ${Cliente.direccion}`;
                selectCliente.appendChild(option);
            });

            selectCliente.addEventListener('change', function () {
                const selectedId = this.value;
                const ClienteSeleccionado = Clientes.find(Cliente => Cliente.id == selectedId);

                if (ClienteSeleccionado) {
                    document.getElementById('nombreEditar').value = ClienteSeleccionado.nombre;
                    document.getElementById('direccionEditar').value = ClienteSeleccionado.direccion;
                } else {
                    limpiarFormulario();
                }
            });
        })
        .catch(error => {
            alert(error);
        });
}

function actualizarLista() {
    const ClienteList = document.getElementById('ClientesList');
    
    get(Clientes_url)
        .then(Clientes => {
            
            if (!Array.isArray(Clientes)) {
                console.error('Error: La respuesta no es un array de Clientes');
                return;
            }

            ClienteList.innerHTML = '';

            Clientes.forEach(Cliente => {
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${Cliente.id}</td>
                    <td>${Cliente.nombre}</td>
                    <td>${Cliente.direccion}</td> 
                `;
                ClienteList.appendChild(row);
            });
        })
        .catch(error => {
            alert(error);
        });
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('nombreEditar').value = '';
    document.getElementById('direccionEditar').value = ''; 
}

document.addEventListener('DOMContentLoaded', function () {
    const btnAgregar = document.getElementById('btnAgregar');
    const btnEditar = document.getElementById('btnEditar');
    const btnEliminar = document.getElementById('btnEliminar');
    
    btnAgregar.addEventListener('click', agregarCliente);
    btnEditar.addEventListener('click', editarCliente);
    btnEliminar.addEventListener('click', eliminarCliente);

    llenarSelect();
    actualizarLista();
});