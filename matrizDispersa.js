class NodoMatriz {
    constructor(fila,columna,month,day,song,artist) {
        this.siguiente = null;
        this.anterior = null;
        this.arriba = null;
        this.abajo = null;
        this.fila = fila;
        this.columna = columna;
        this.mes = month;
        this.dia=day;
        this.cancion=song;
        this.artista=artist;
    }
}

class NodoHeader {
    constructor(posicion) {
        this.siguiente = null;
        this.anterior = null;
        this.acceso = null;
        this.posicion = posicion;
    }
}

class Header {
    constructor() {
        this.primero = null;
    }

    isEmpty() {
        return this.primero == null;
    }
    
    setEncabezado(nuevo) {
       if(this.primero==null){
        this.primero=nuevo;
       }
       else if(nuevo.posicion<this.primero.posicion){
        nuevo.siguiente=this.primero;
        this.primero.anterior=nuevo;
        this.primero=nuevo;
       }
       else{
        var actual = this.primero;
        while(actual.siguiente!=null){
            if(nuevo.posicion<actual.siguiente.posicion){
                nuevo.siguiente=actual.siguiente;
                actual.siguiente.anterior=nuevo;
                nuevo.anterior=actual;
                actual.siguiente=nuevo;
                break;
            }
            actual=actual.siguiente;
        }

        if(actual.siguiente==null){
            actual.siguiente=nuevo;
            nuevo.anterior=actual;
        }
       }
    }

    getEncabezado(posicion){
        var actual=this.primero;
        while(actual!=null){
            if(actual.posicion==posicion){
                return actual;
            }
            actual=actual.siguiente;
        }
        return null;

    }
}
class Matriz {
    constructor() {
        this.eFilas = new Header();
        this.eColumnas = new Header();
    }
    numFilas(){
        var actual =this.eFilas.primero;
        var contador=0;
        while(actual!=null){
            contador+=1;
            actual=actual.siguiente
        }
        return contador;
    }

    numColumnas(){
        var actual =this.eColumnas.primero;
        var contador=0;
        while(actual!=null){
            contador+=1;
            actual=actual.siguiente
        }
        return contador;
    }

    obtenerArtistaCancion(fila,columna){
        var eFila=this.eFilas.primero;
        while(eFila!=null){
            var actual=eFila.acceso;
            while(actual!=null){
                if(actual.fila==fila && actual.columna==columna){
                    var respuesta=actual.cancion+"\n"+"("+actual.artista+")";
                    return respuesta
                }
                actual=actual.siguiente;
            }
            eFila=eFila.siguiente;
        }
        return null;

    }
    insertar(fila, columna, month,day,song,artist){
        var nuevo = new NodoMatriz(fila,columna,month,day,song,artist);
        var eFila=this.eFilas.getEncabezado(fila);
        if(eFila==null){
            eFila= new NodoHeader(fila);
            eFila.acceso=nuevo;
            this.eFilas.setEncabezado(eFila);
        }
        else{
            if(nuevo.columna<eFila.acceso.columna){
                nuevo.siguiente=eFila.acceso;
                eFila.acceso.anterior=nuevo;
                eFila.acceso=nuevo;
            }
            else{
                var actual=eFila.acceso;
                while(actual.siguiente!=null){
                    if(nuevo.columna<actual.siguiente.columna){
                        nuevo.siguiente=actual.siguiente;
                        actual.siguiente.anterior=nuevo;
                        nuevo.anterior=actual;
                        actual.siguiente=nuevo;
                        break;
                    }
                    actual=actual.siguiente;
                }
                if(actual.siguiente==null){
                    actual.siguiente=nuevo;
                    nuevo.anterior=actual;
                }
            }
        }

        var eColumna=this.eColumnas.getEncabezado(columna);
        if(eColumna==null){
            eColumna=new NodoHeader(columna);
            eColumna.acceso=nuevo;
            this.eColumnas.setEncabezado(eColumna);
        }
        else{
            if(nuevo.fila<eColumna.acceso.fila){
                nuevo.abajo=eColumna.acceso;
                eColumna.acceso.arriba=nuevo;
                eColumna.acceso=nuevo;
            }
            else{
                var actual=eColumna.acceso;
                while(actual.abajo!=null){
                    if(nuevo.fila<actual.abajo.fila){
                        nuevo.abajo=actual.abajo;
                        actual.abajo.arriba=nuevo;
                        nuevo.arriba=actual;
                        actual.abajo= nuevo;
                        break;
                    }
                    actual=actual.abajo;
                }
                if(actual.abajo==null){
                    actual.abajo=nuevo;
                    nuevo.arriba=actual;
                }
            }
        }
        
    }

    recorrerFilas(){
        var eFila=this.eFilas.primero;
        console.log("*********** RECORRIDO POR FILAS ****************");
        while(eFila!=null){
            var actual=eFila.acceso;
            console.log("\nFila "+actual.fila);
            console.log("COLUMNA    VALOR");
            while(actual!=null){
                console.log(actual.columna+" "+actual.cancion+" "+actual.artista);
                actual=actual.siguiente;
            }
            eFila=eFila.siguiente;
        }

    }

    exportRender() {
        console.log(this.configraph2());
        d3.select("#graficaMatriz").graphviz()
        .width(1900)
        .height(750)
        .renderDot(this.configraph2())
    }

    configraph2(){
        let graphviz="";
        graphviz+="digraph L{"+"\n"+
                  "node[shape=trapezium fillcolor="+'"goldenrod4" '+"style=filled arrowhead=diamond]"+"\n";
        graphviz+="subgraph cluster_p{"+"\n"+
        "label="+'"'+"PATRON"+'"'+"\n";
        graphviz+=`
        bgcolor = "lightsalmon4"
        penwidth=5
        raiz[label="MUSICA"]
        edge[dir="both" arrowhead=diamond]
        `
        console.log(this.numFilas());
        for(var i=1; i<this.numFilas()+1;i++){
            if(i==1){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Enero"+`",group=`+"1];"+"\n";
            }
            else if(i==2){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Febrero"+`",group=`+"1];"+"\n";
            }
            else if(i==3){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Marzo"+`",group=`+"1];"+"\n";
            }
            else if(i==4){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Abril"+`",group=`+"1];"+"\n";
            }
            else if(i==5){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Mayo"+`",group=`+"1];"+"\n";
            }
            else if(i==6){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Junio"+`",group=`+"1];"+"\n";
            }
            else if(i==7){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Julio"+`",group=`+"1];"+"\n";
            }
            else if(i==8){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Agosto"+`",group=`+"1];"+"\n";
            }
            else if(i==9){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Septiembre"+`",group=`+"1];"+"\n";
            }
            else if(i==10){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Octubre"+`",group=`+"1];"+"\n";
            }
            else if(i==11){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Noviembre"+`",group=`+"1];"+"\n";
            }
            else if(i==12){
                graphviz+=`
            Fila`+i.toString()+`[label="`+"Diciembre"+`",group=`+"1];"+"\n";
            }
            
        }
        for(var fila=1;fila<this.numFilas();fila++){
            graphviz+=`
            Fila`+fila.toString()+"->Fila"+(fila+1).toString()+"\n";
        }
        for(var col=1;col<this.numColumnas()+1;col++){
            graphviz+=`
            Columna`+col.toString()+`[label="`+col.toString()+`", group=`+(col+1).toString()+"];"+"\n";
        }
        for(var colum=1;colum<this.numColumnas();colum++){
            graphviz+=`
            Columna`+colum.toString()+"->Columna"+(colum+1).toString()+"\n";
        }
        graphviz+=`
        raiz->Fila1;
        raiz->Columna1;
        `;

        var cadena="";
        for(var c=1;c<this.numColumnas()+1;c++){
            cadena+="Columna"+c.toString()+";"
        }
        graphviz+=`
        {rank=same;raiz;`+cadena+"}";

        for(var l=1;l<this.numFilas()+1;l++){
            for(var co=1;co<this.numColumnas()+1;co++){
                graphviz+=`
                nodo`+l.toString()+"_"+co.toString()+`[label="`+this.obtenerArtistaCancion(l,co)+`",fillcolor=black,group=`+(co+1).toString()+`,fontcolor=white];`+"\n";

            }
        }
      
        for(var f=1;f<this.numFilas()+1;f++){
            graphviz+=`
            Fila`+f+"->nodo"+f+"_"+"1"+"{";
            var cade="";
            for(var c=1;c<this.numColumnas()+1;c++){
                cade+=";nodo"+f+"_"+c
            }
            graphviz+=`
            rank=same; Fila`+f+cade+"}";
        }

        for(var f=1;f<this.numColumnas()+1;f++){
            graphviz+=`
            Columna`+f+"->nodo"+"1"+"_"+f+";"+"\n";
        }

        for(var l=1;l<this.numFilas()+1;l++){
            for(var c=1;c<this.numColumnas();c++){
                graphviz+=`
                nodo`+l+"_"+c+"->nodo"+l+"_"+(c+1).toString()+";"+"\n";
            }
        }

        for(var l=1;l<this.numFilas();l++){
            for(var c=1;c<this.numColumnas()+1;c++){
                graphviz+=`
                nodo`+l+"_"+c+"->nodo"+(l+1).toString()+"_"+c+";"+"\n";
            }
        }

        graphviz+="}}";
        return graphviz.toString();``    
    }
}