export class Actividad {
    constructor(inicio, fin, tipo){
        this.inicio = inicio;
        this.fin = fin;
        this.tipo = tipo;
    }
     
    toString(){
        return `Actividad de ${this.tipo} desde ${this.inicio} hasta ${this.fin}`;
    }
}