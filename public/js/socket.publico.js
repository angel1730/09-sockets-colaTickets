//Creamos la conexion con el servidor
let socket = io()

let lblTicket1 = $('#lblTicket1')
let lblTicket2 = $('#lblTicket2')
let lblTicket3 = $('#lblTicket3')
let lblTicket4 = $('#lblTicket4')

let lblEscritorio1 = $('#lblEscritorio1')
let lblEscritorio2 = $('#lblEscritorio2')
let lblEscritorio3 = $('#lblEscritorio3')
let lblEscritorio4 = $('#lblEscritorio4')

let arrlblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]

//Agregamos el connect y disconnect

socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaHTML(data.ultimos4)
})

//Escuchamos ultimos4 para actualizar la pantalla
socket.on('ultimos4', function(data) {
    //Agregamos un audio
    let audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    actualizaHTML(data.ultimos4)
})

//Funcion para actualizar el HTML
function actualizaHTML(ultimos4) {
    for (var i = 0; i < ultimos4.length; i++) {
        arrlblTickets[i].text('Ticket ' + ultimos4[i].numero)
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio)
    }
}