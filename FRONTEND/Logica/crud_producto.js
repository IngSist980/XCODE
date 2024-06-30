const Producto_url = 'http://localhost:3000/api/Producto';

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

async function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;

    if (!nombre || !numero) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    const Producto = { nombre, numero };

    try {
        await create(Producto_url, Producto);
        alert('Agregado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al agregar Producto.');
    }
}

async function eliminarProducto() {
    const selectedId = document.getElementById('selectProducto').value;

    if (!selectedId) {
        alert('Por favor, seleccione un producto para eliminar.');
        return;
    }

    try {
        await eliminate(Producto_url, selectedId);
        alert('Eliminado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert(`Error al eliminar para el ID: ${selectedId}.`);
    }
}

async function editarProducto() {
    const selectedId = document.getElementById('selectProducto').value;
    const nombre = document.getElementById('nombreEditar').value;
    const numero = document.getElementById('numeroEditar').value;

    if (!selectedId || !nombre || !numero) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const objetoEditado = {
        nombre,
        numero
    };

    try {
        await update(`${Producto_url}/${selectedId}`, objetoEditado);
        alert('Editado con éxito');
        limpiarFormulario();
        await actualizarLista();
        llenarSelect();
    } catch (error) {
        alert('Error al editar Producto.');
    } 
}

function llenarSelect() {
    const selectProducto = document.getElementById('selectProducto');

    get(Producto_url)
        .then(Productos => {
            if (!Array.isArray(Productos)) {
                console.error('Error: La respuesta no es un array de Productos');
                return;
            }

            selectProducto.innerHTML = '<option value="">Seleccionar</option>';

            Productos.forEach(Producto => {
                const option = document.createElement('option');
                option.value = Producto.id;
                option.textContent = `${Producto.id}: ${Producto.nombre} ${Producto.numero}`;
                selectProducto.appendChild(option);
            });

            selectProducto.addEventListener('change', function () {
                const selectedId = this.value;
                const ProductoSeleccionado = Productos.find(Producto => Producto.id == selectedId);

                if (ProductoSeleccionado) {
                    document.getElementById('nombreEditar').value = ProductoSeleccionado.nombre;
                    document.getElementById('numeroEditar').value = ProductoSeleccionado.numero;
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
    const ProductosList = document.getElementById('ProductosList');
    
    get(Producto_url)
        .then(Productos => {
            console.log(Productos);
            if (!Array.isArray(Productos)) {
                console.error('Error: La respuesta no es un array de Productos');
                return;
            }

            ProductosList.innerHTML = '';

            Productos.forEach(Producto => {
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${Producto.id}</td>
                    <td>${Producto.nombre}</td>
                    <td>${Producto.numero}</td> 
                `;
                ProductosList.appendChild(row);
            });
        })
        .catch(error => {
            alert(error);
        });
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('nombreEditar').value = '';
    document.getElementById('numeroEditar').value = ''; 
}

document.addEventListener('DOMContentLoaded', function () {
    const btnAgregar = document.getElementById('btnAgregar');
    const btnEditar = document.getElementById('btnEditar');
    const btnEliminar = document.getElementById('btnEliminar');
    
    btnAgregar.addEventListener('click', agregarProducto);
    btnEditar.addEventListener('click', editarProducto);
    btnEliminar.addEventListener('click', eliminarProducto);

    llenarSelect();
    actualizarLista();
});