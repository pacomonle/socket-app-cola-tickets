// Comando para establecer la conexión
const socket = io();

// tickets
const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');
// escritorios
const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

// arrays del frontend de tickets y escritorios de los ultimos 4
const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// recuperar el estado actual -> ultimo ticket
socket.on('estadoActual', function(resp) {
    console.log(resp);
    actualizaHTML(resp.ultimos4);
});

socket.on('ultimos4', function(resp) {
    console.log(resp);

    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(resp.ultimos4);
});


function actualizaHTML(ultimos4) {

    for (let i = 0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }

}