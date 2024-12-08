class TicketManager{
    
    #precioGanancia = 0.15;


    eventos; 
    constructor(){
        this.eventos = [];

    }

    getEventos(){

        return this.eventos;
    }
    agregarEventos(
        nombre,
        lugar,
        precio,
        capacidad = 50,
        fecha =  new Date().toLocaleTimeString(),
        participantes = []
    ){
        const evento = {
            id : this.eventos.length
            ? this.eventos.length[this.eventos.length - 1].id + 1: 1,
            nombre,
            lugar,
            precio: precio * (1 + this.#precioGanancia),
            capacidad,
            fecha, 
            participantes : []
        }
        this.eventos.push(evento);
        console.log("Evento Agregado: " + evento);
    }

    agregarUsuario({idEvento, idUsuario}){
        const evento = this.eventos.find(evento => evento.id == idEvento);
        if (!evento) {
            console.log("El evento no existe");
            return;
        }
      
        if (evento.participantes.includes(idUsuario)) {
            console.log("El usuario ya esta registrado");
            return;
        }
        evento.participantes.push(idUsuario);
        console.log("El usuario fue agregado al evento");
    }

}