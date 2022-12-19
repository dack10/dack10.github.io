class NodoCircular{
    constructor(_artista,_cancion){
        this.artista = _artista;
        this.cancion=_cancion; 
        this.siguiente = null;
        this.anterior=null;
    }
}

export default class ListaCircular{
    constructor(){
        this.inicio = null;
        this.fin =null;
        this.size = 0;
    }
    //metodos de una lista circular
    //insertar
    agregar(_artista,_cancion){
        let nuevoNodo = new NodoCircular(_artista,_cancion);
        //si la lista esta vacia
        if (this.inicio == null){
            this.inicio = nuevoNodo;
            this.fin=this.inicio;
            this.fin.siguiente=this.inicio;
            this.inicio.anterior=this.fin;
            this.size++;
        }else{
            this.fin.siguiente = nuevoNodo;
            nuevoNodo.anterior=this.fin;
            nuevoNodo.siguiente=this.inicio;
            this.fin=nuevoNodo;
            this.inicio.anterior=this.fin;
            this.size++;
        }
    }
    //mostrar la lista circular
    mostrar(){
        var temporal = this.inicio;
        var cont=0;
        while(cont<this.size){
            console.log(temporal.artista)
            console.log(temporal.anterior.artista)
            console.log(temporal.siguiente.artista)

            temporal = temporal.siguiente;
            cont++;
        }
    }

    crearHtml(){
        var txtHtml="";
        var aux=this.inicio;
        var cont=0;
        txtHtml="<h2> PLAYLIST </h2>"+"\n";
        while(cont<this.size){
            txtHtml+=`
            <div class="div-shadow">
               <div class="img">
                  <img src="musica.png">
               </div>
               <div class="container">
                  <h2>`+aux.artista+`</h2>
                  <h2>`+aux.cancion+`</h2>
               </div>
            </div>
            `;
            aux=aux.siguiente;
            cont++;
        }
        return txtHtml.toString();
    } 

    exportRender() {
        console.log(this.configraph());
        d3.select("#Render").graphviz()
        .width(1900)
        .height(600)
        .renderDot(this.configraph())
    }

    configraph() {
        var cont = 0;
        var aux=this.inicio;
        let graphviz=""
        graphviz+= "digraph G{ rankdir=" +"LR"+" node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
        graphviz += 'label = "Matriz DISPERSA" ' + 'edge[dir = "both"];\n';
        graphviz+="raiz->Fila1;"
        graphviz+="Fila1"
        while(cont<this.size){
            graphviz+="->"+aux.cancion.toString()+"("+aux.artista.toString()+")"+"\n";
            aux=aux.siguiente;
            cont++;
        }
        graphviz += "}}";

        
        return graphviz.toString();
    }
}
