const serverUrl = 'http://localhost:3000/end_point';

fetch(serverUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no se pudo completar correctamente');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta de la API:', data);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
