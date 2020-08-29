// Comando para establecer la conexión
const socket = io();

// recuperar params que vienen por la url
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams)
console.log(searchParams.has('escritorio'))

if (!searchParams.has('escritorio')) {
    // redirigir al index.html
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
const label = $('small');


console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);

    });

});