class NodoCabeza{
    constructor(_value){
        this.value = _value;
        this.next = null;
        this.down = null;
    }
}

class NodoValor{
    constructor(_value){
        this.value = _value;
        this.next = null;
    }
}


class Listadelistas{
    constructor(){
        this.head = null
    }
    //metodos de insertar
    InsertarCabeceras(_value){
        var temporal = new NodoCabeza(_value);
        temporal.next = this.head;
        this.head = temporal;
    }

    InsertarValores(_cabeza, _value){
        var temporalcabeza = this.head
        //recorrer toda la lista de cabezas 
        while(temporalcabeza != null){
            if(temporalcabeza.value == _cabeza){
                var nuevacancion = new NodoValor(_value)
                var iniciocanciones = temporalcabeza.down
                temporalcabeza.down = nuevacancion
                nuevacancion.next = iniciocanciones
                break
            }
            temporalcabeza= temporalcabeza.next
        }
        if(temporalcabeza == null){
            console.log("No se encontro el cabecera en la lista "+_cabeza)
        }

    }

    crearHtml(){
        var txtHtml="";
        var aux=this.head;
        txtHtml="<h2> MUSICA </h2>"+"\n";
        while(aux!=null){
            var aux2=aux.down;
            while(aux2!=null){
                txtHtml+=`
                <div class="div-shadow">
                <div class="img">
                    <img src="usuario.png">
                </div>
                <div class="container">
                    <h2>`+aux.value+`</h2>
                    <h2>`+aux2.value+`</h2>
                </div>
                </div>
                `;
                aux2=aux2.next;
            }
            
            aux=aux.next;
        }
        return txtHtml.toString();
    }

    mostrarCabeceras(){
        var temporal = this.head
        console.log("*********** Cabeceras *********")
        while (temporal != null){
            console.log(temporal.value)
            temporal = temporal.next
        }
    }

    MostrarValores(_value){
        var temporal = this.head
        while (temporal != null){
            if(temporal.value == _value){
                console.log("*********** Cabecera "+_value+" *********")        
                var temporalcanciones = temporal.down
                while(temporalcanciones != null){
                    console.log(temporalcanciones.value)
                    temporalcanciones = temporalcanciones.next
                }
                return
            }
            temporal = temporal.next
        }
        if(temporal == null){
            console.log("No se pudo encontrar el cabeza solicitado "+_value)
        }
    }

    exportRender() {
        console.log(this.configraph());
        d3.select("#graficaArtistas").graphviz()
        .width(1900)
        .height(750)
        .renderDot(this.configraph())
    }


    configraph() {
        let temp = "";
        temp += "digraph G{ node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
        temp += 'graph[rankdir = "both"];'+"\n";
        var aux=this.head;
        var contador=0;
        var grupo=0;
        var canciones=0;
        while(aux!=null){
            console.log("si entro");
            var art=aux.value.toString();
            temp+="A"+contador.toString()+"[label="+'"'+art+'"'+", group="+grupo.toString()+"];"+"\n";
            var songs=aux.down;
            while(songs!=null){
                var song=songs.value.toString();
                temp+="C"+canciones.toString()+"A"+contador.toString()+"[label="+'"'+song+'"'+", group="+grupo.toString()+"];"+"\n";
                songs=songs.next;
                canciones+=1;
            }
            aux=aux.next;
            contador+=1;
            grupo+=1; 
            canciones=0;
        }
        contador=0;
        grupo=0;
        canciones=0;
        let aux2=this.head;
        while(aux2!=null){
            var art=aux2.value.toString();
            temp+="A"+contador.toString()+"->C"+canciones.toString()+"A"+contador.toString()+"\n";
            var songs=aux2.down;
            while(songs!=null){
                var song=songs.value.toString();
                temp+="C"+canciones.toString()+"A"+contador.toString()+"->"+"C"+(canciones+1).toString()+"A"+contador.toString()+"\n";
                songs=songs.next;
                canciones+=1;
            }
            aux2=aux2.next;
            contador+=1;
            grupo+=1; 
            canciones=0;
        }
        
        temp += "}}";
        return temp.toString();
    }
}

