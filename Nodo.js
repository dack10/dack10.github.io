class Nodo{
    constructor(dato,siguiente){
        this.dato=dato;
        this.siguiente=siguiente;
    }
}


class listaenlazada{
    constructor(){
        this.inicio=null;
        this.tamaño=0;
    }

    agregar(dato){
        let nuevonodo=new Nodo(dato,null);
        if(!this.inicio){
            this.inicio=nuevonodo;
        }
        else{
            let actual=this.inicio;
            while(actual.siguiente){
                actual=actual.siguiente
            }
            actual.siguiente=nuevonodo
        }
        this.tamaño++;
    }
}

let lista=new listaenlazada;
console.log(lista)
lista.agregar(10);
console.log(lista)

