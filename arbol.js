class NodoAbb{
    constructor(_dni,_nombre,_correo,_descripcion){
        this.dni=_dni;
        this.name=_nombre;
        this.correo=_correo;
        this.descripcion=_descripcion;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ABB{
    constructor(){
        this.raiz = null;
        this.prueba="";
        this.html="";
    }
    //metodo insertar
    insertar(_dni,_nombre,_correo,_descripcion){
        this.raiz = this.add(_dni,_nombre,_correo,_descripcion,this.raiz);
    }
    //metodo insertar recursivo
    add(_dni,_nombre,_correo,_descripcion,nodo){
        if(nodo == null){
            return new NodoAbb(_dni,_nombre,_correo,_descripcion);
        }else{
            if(_dni>=nodo.dni){
                nodo.derecha = this.add(_dni,_nombre,_correo,_descripcion, nodo.derecha);
            }else{
                nodo.izquierda = this.add(_dni,_nombre,_correo,_descripcion, nodo.izquierda);
            }
        }
        return nodo;
    }
    
    //preorden
    preorden(){
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo){
        if(nodo!=null){
            console.log("Valor:"+nodo.name);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierda);
            console.log("Valor:",nodo.duracion);
            this.in_orden(nodo.derecha);
        }
    }

    //postorden
    posorden(){
        this.pos_orden(this.raiz);
    }
    
    pos_orden(nodo){
        if(nodo!=null){
            this.pos_orden(nodo.izquierda);
            this.pos_orden(nodo.derecha);
            console.log("Valor:",nodo.duracion);           
        }
    }

    exportRender(){
        console.log(this.configraph2());
        d3.select("#graficaactores").graphviz()
        .width(1900)
        .height(750)
        .renderDot(this.configraph2())

    }

    //preorden
    preordenGrafica(){
        this.pre_ordenGrafica(this.raiz);
    }

    pre_ordenGrafica(nodo){
        if(nodo!=null){
            console.log("Valor:",nodo.duracion);
            graphviz+=
            this.pre_ordenGrafica(nodo.izquierda);
            this.pre_ordenGrafica(nodo.derecha);
        }
    }
    
    
    
    configraph2(){
        
        let graphviz="";
        graphviz+=`
        digraph G{
            rankdir="TB";
            label="ARBOL ACTORES";
            node[shape=record arrowhead=diamond]
            node[style=filled]\n
            `;
        this.preordenGraph();
        graphviz+=this.prueba;
        
        if(this.raiz!=null){
            graphviz+=this.nodoGraph(this.raiz);
        }
        graphviz+="\n"+"}";
        return graphviz.toString()
    }

    preordenGraph(){
        this.pre_ordenGraph(this.raiz);
    }
    
    pre_ordenGraph(nodo){
        
        if(nodo!=null){
            this.prueba+=nodo.name.replace(/ /g,"")+"[label="+'"'+"<C0>|"+nodo.name+"|<C1>"+'"];'+"\n";
            this.pre_ordenGraph(nodo.izquierda);
            this.pre_ordenGraph(nodo.derecha);
        }
        
    }

    nodoGraph(nodo){
        
        if(nodo.izquierda==null && nodo.derecha==null){
           return nodo.name.replace(/ /g,"")
        }
        else{
            var texto="";
            if(nodo.izquierda!=null){
                texto=nodo.name.replace(/ /g,"")+":C0"+"->"+this.nodoGraph(nodo.izquierda)+"\n";
             }
             if(nodo.derecha!=null){
                 texto+=nodo.name.replace(/ /g,"")+":C1"+"->"+this.nodoGraph(nodo.derecha)+"\n";
             }
        }
        /*if(nodo!=null){
            texto+=nodo.name.replace(/ /g,"");
            console.log(nodo.name)
            if(nodo.izquierda!=null){
               texto=nodo.name.replace(/ /g,"")+"->"+this.nodoGraph(nodo.izquierda)+"\n";
            }
            if(nodo.derecha!=null){
                texto+=nodo.name.replace(/ /g,"")+"->"+this.nodoGraph(nodo.derecha)+"\n";
            }
        }*/
        return texto.toString();
    }
    resetearhtml(){
        this.html="";
    }

    generarHtml(tmp) {
        if (tmp != null) {
            this.html+=`<div id="cardActor">
                       <label>${tmp.name}</label>
                       <p>Descripcion: ${tmp.descripcion}</p>
                       </div>`;
                       
            this.generarHtml(tmp.izquierda);
            this.generarHtml(tmp.derecha);
        }
    }

    generarHtmlInorder(tmp) {
        if (tmp != null) {           
            this.generarHtmlInorder(tmp.izquierda);
            this.html+=`<div id="cardActor">
                       <label>${tmp.name}</label>
                       <p>Descripcion: ${tmp.descripcion}</p>
                       </div>`;
            this.generarHtmlInorder(tmp.derecha);
        }
    }

    generarHtmlPostorder(tmp) {
        if (tmp != null) {           
            this.generarHtmlPostorder(tmp.izquierda);
            
            this.generarHtmlPostorder(tmp.derecha);
            this.html+=`<div id="cardActor">
                       <label>${tmp.name}</label>
                       <p>Descripcion: ${tmp.descripcion}</p>
                       </div>`;
        }
    }
}