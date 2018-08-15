//Creamos una clase
const fs = require('fs')

//Creamos una clase para controlar los tickets
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = [] //A qui se guardaran todos los tickets
        this.ultimos4 = [] //a qui guardaremos los ultimo 4 tickets atendidos

        //Obtenemos el archivo json
        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        } else {
            this.reiniciarConteo()
        }
    }

    //Creamos una funcion para el siguienteTicket
    siguiente() {
        this.ultimo += 1

        //Creams un nuevo tikcet
        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)

        //Actualizamos el archivo data.json
        this.grabarArchivo()
        return `Ticket ${ this.ultimo }`
    }

    //Obtenemos el ultimo ticket
    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`
    }

    //Obtenemos los ultimos 4 tickets
    getUltimos4() {
        return this.ultimos4
    }

    //Funcion para atender tickets
    atenderTicket(escritorio) {
        //Checamos is hay tickets
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        //Obtenemos el numero de la primero posicion del array
        let numeroTicket = this.tickets[0].numero
        this.tickets.shift() //Eliminamos el objeto que esta en la primera posicion

        //Atendemos un ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio)

        //Usamos unshift para agregar al inicio del array
        this.ultimos4.unshift(atenderTicket)

        //Si es mayor de 4 removemos el ultimo elemento del array con splice(-1,1)
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1)
        }

        //Mostramos los ultimos 4
        console.log('Ultimos 4: ', this.ultimos4);

        //Grabamos
        this.grabarArchivo()

        return atenderTicket
    }

    //Funcion para reiniciar el conteo
    reiniciarConteo() {
        this.ultimo = 0
        this.tickets = []
        this.ultimos4 = []
        this.grabarArchivo()
        console.log('Se ha reinicializado el sistema.');
    }

    //Funcion para solo grabar en el archivo
    grabarArchivo() {
        //Formamos el json que guardaremos en el archivo
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        //Convertimos el objeto a string
        let jsonDataString = JSON.stringify(jsonData)

        //Guardamos los datos en el archivo data.json
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}

module.exports = {
    TicketControl
}