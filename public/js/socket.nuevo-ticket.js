// Comando para establecer la conexión
const socket = io();

const label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual'
socket.on('estadoActual', function(resp) {

    console.log('resp', resp);
    label.text(resp.actual);

});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});