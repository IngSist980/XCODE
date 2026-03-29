const Sucursales_url = 'http://localhost:3000/api/Sucursales';

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

async function agregarSucursales() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;

    if (!nombre || !direccion) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    const Sucursal = { nombre, direccion };

    try {
        await create(Sucursales_url, Sucursal);
        alert('Agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al agregar Sucursal.');
    }
}

async function eliminarSucursal() {
    const selectedId = document.getElementById('selectSucursal').value;

    if (!selectedId) {
        alert('Por favor, seleccione una sucursal para eliminar.');
        return;
    }

    try {
        await eliminate(Sucursales_url, selectedId);
        alert('Eliminado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert(`Error al eliminar para el ID: ${selectedId}.`);
    }
}

async function editarSucursal() {
    const selectedId = document.getElementById('selectSucursal').value;
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
        await update(`${Sucursales_url}/${selectedId}`, objetoEditado);
        alert('Editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al editar Sucursal.');
    } 
}

function llenarSelect() {
    const selectSucursal = document.getElementById('selectSucursal');

    get(Sucursales_url)
        .then(Sucursales => {
            if (!Array.isArray(Sucursales)) {
                console.error('Error: La respuesta no es un array de Sucursales');
                return;
            }

            selectSucursal.innerHTML = '<option value="">Seleccionar</option>';

            Sucursales.forEach(Sucursal => {
                const option = document.createElement('option');
                option.value = Sucursal.id;
                option.textContent = `${Sucursal.id}: ${Sucursal.nombre} ${Sucursal.direccion}`;
                selectSucursal.appendChild(option);
            });

            selectSucursal.addEventListener('change', function () {
                const selectedId = this.value;
                const SucursalSeleccionado = Sucursales.find(Sucursal => Sucursal.id == selectedId);

                if (SucursalSeleccionado) {
                    document.getElementById('nombreEditar').value = SucursalSeleccionado.nombre;
                    document.getElementById('direccionEditar').value = SucursalSeleccionado.direccion;
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
    const SucursalesList = document.getElementById('SucursalesList');
    
    get(Sucursales_url)
        .then(Sucursales => {
            
            if (!Array.isArray(Sucursales)) {
                console.error('Error: La respuesta no es un array de Sucursales');
                return;
            }

            SucursalesList.innerHTML = '';

            Sucursales.forEach(Sucursal => {
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${Sucursal.id}</td>
                    <td>${Sucursal.nombre}</td>
                    <td>${Sucursal.direccion}</td> 
                `;
                SucursalesList.appendChild(row);
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
    
    btnAgregar.addEventListener('click', agregarSucursales);
    btnEditar.addEventListener('click', editarSucursal);
    btnEliminar.addEventListener('click', eliminarSucursal);

    llenarSelect();
    actualizarLista();
});