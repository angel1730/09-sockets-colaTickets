//Comando para establecer la conexion con el servidor
var socket = io()
    //Hacemos referencia al label
let label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al Servidor');
})

socket.on('disconnect', function() {
    console.log('Desconectado del Servidor');
})

//Recibimos el emit del servidor
socket.on('estadoActual', function(resp) {
    console.log('Estado actaul desde el server: ', resp);
    label.text(resp.actual)
})

//Evento del boton
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket)
    })
})