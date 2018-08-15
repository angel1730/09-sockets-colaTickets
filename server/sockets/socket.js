//Servicio de sockets de parte del servidor

//Para saber cuando se haga una conexion en el servidor
const { io } = require('../server') //Importamos el modulo io de ese archivo

//Importamos la clase Ticket
const { TicketControl } = require('../classes/ticket-control')

//Instanciamos un objeto de la clase
const ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        //Obtenemos el siguiente ticket
        let siguiente = ticketControl.siguiente()
        console.log(siguiente);
        callback(siguiente)
    })

    //Le enviamos el ultimo ticket al cliente
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    //Creamos el escucha de atenderTicket
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: ' El escritorio es necesario'
            })
        }

        //Obtenemos el ticket que vamos a atender
        let ticketAtender = ticketControl.atenderTicket(data.escritorio)

        //Le regresamos al cliente el tocket a atender
        callback(ticketAtender)

        //Actualizar / notificar cambios en los ultimos 4 
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })
})