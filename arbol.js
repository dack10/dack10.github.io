class Nodo{
    constructor(_name,_topic,_guest,_duracion){
        this.name=_name;
        this.topic=_topic;
        this.guest=_guest;
        this.duracion=_duracion;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ABB{
    constructor(){
        this.raiz = null;
        this.prueba=""
        
    }
    //metodo insertar
    insertar(_name,_topic,_guest,_duracion){
        this.raiz = this.add(_name,_topic,_guest,_duracion,this.raiz);
    }
    //metodo insertar recursivo
    add(_name,_topic,_guest,_duracion,nodo){
        if(nodo == null){
            return new Nodo(_name,_topic,_guest,_duracion);
        }else{
            if(_name>=nodo.name){
                nodo.derecha = this.add(_name,_topic,_guest,_duracion, nodo.derecha);
            }else{
                nodo.izquierda = this.add(_name,_topic,_guest,_duracion, nodo.izquierda);
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
        d3.select("#graficaPodcast").graphviz()
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
            label="ARBOL PODCAST";
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
}

