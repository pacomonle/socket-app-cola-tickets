const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente - cuando se emite un evcento en el frontend
     client.on('siguienteTicket', (data, callback) => {

        const siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);
    });
      
  // Emitir el servidor

// mandar estado actual por si se recarga el navegador
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


 // Escuchar el cliente - cuando se emite un evcento en el frontend
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }


        const atenderTicket = ticketControl.atenderTicket(data.escritorio);


        callback(atenderTicket);

        // actualizar/ notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });


    });


});