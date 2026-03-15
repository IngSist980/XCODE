const serverUrl = 'http://localhost:3000/end_point';
const respuesta = document.getElementById("respuesta").value;
fetch(serverUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no se pudo completar correctamente');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta de la API:', data);
        document.getElementById("respuesta").value = data.mensaje;
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });

