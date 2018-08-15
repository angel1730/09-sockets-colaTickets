//Creamos comando para establecer la conexion
let socket = io()

//Obtenemos todos los parametros opcionales uqe vienen en la url
let searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('EL escritorio es necesario')
}

//Obtenemos el escritorio
let escritorio = searchParams.get('escritorio')
$('h1').text('Escritorio ' + escritorio)

//Evento del boton
$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        //Checamos si ya no hay tickets
        if (resp === 'No hay tickets') {
            $('small').text('No hay tickets')
            alert(resp)
            return
        }

        $('small').text('Ticket: ' + resp.numero)
    })
})