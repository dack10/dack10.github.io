class NodoComentarios{
    constructor(nombre,comentario){
        this.user=nombre;
        this.coment=comentario;
        this.siguiente=null;
    }
}



class ListaComentarios{
    constructor(){
        this.inicio=null;
        this.tamaño=0;
    }

    agregar(name,comentario){
        let nuevonodo=new NodoComentarios(name,comentario);
        if(this.inicio==null){
            this.inicio=nuevonodo;
        }
        else{
            let actual=this.inicio;
            while(actual.siguiente!=null){
                actual=actual.siguiente
            }
            actual.siguiente=nuevonodo
        }
        this.tamaño++;
    }

    crearHtml(){
        var aux=this.inicio;
        var txtHtml="";
        while(aux!=null){
            txtHtml+=`
            <div class="comentario">
                <h2>${aux.user}</h2>
                <label>${aux.coment}</label>
            </div>
            `;
            aux=aux.siguiente;
        }
        return txtHtml.toString();

    }

}
class Node {
	constructor(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria) {
		this.value 	= value;
		this.nombre=_nombre;
		this.descripcion=_descripcion;
		this.star=_star;
		this.precio=_precio;
		this.paginas=_paginas;
		this.categoria=_categoria;
		this.left 	= null
		this.right 	= null
		this.height = 0
        this.listacoments=new ListaComentarios();
	}
}

class AVL {
	constructor() {
		this.root = null;
        this.dot = '';
		this.prueba="";
        this.size=0;
        this.html="";
        this.titulohtml="";
        this.nombrePelicula="";
        this.comentss=""
        
	}
    
   
	add(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria) {
		this.root = this._add(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria, this.root)
        this.size++;
    }

    _add(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria, tmp) {
		if (tmp == null) return new Node(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria)
		else if (value < tmp.value) {
			tmp.left = this._add(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria, tmp.left)
			if ((this.height(tmp.left)-this.height(tmp.right))==2) {
				if (value < tmp.left.value) tmp = this.srl(tmp)
				else tmp = this.drl(tmp)
			}
		} else if (value > tmp.value) {
			tmp.right = this._add(value,_nombre,_descripcion,_star,_precio,_paginas,_categoria, tmp.right)
			if ((this.height(tmp.right)-this.height(tmp.left))==2) {
				if (value > tmp.right.value) tmp = this.srr(tmp)
				else tmp = this.drr(tmp)
			} 
		}
		
		var r = this.height(tmp.right)
		var l = this.height(tmp.left)		
		var m = this.max(r, l)
		tmp.height = m + 1
		return tmp		
    }

	height(tmp) {
		if (tmp == null) return -1
		return tmp.height
	}

	max(val1, val2) {
		if (val1 > val2) return val1
		return val2
	}

	srl(t1) {
		var t2
		t2 = t1.left
		t1.left = t2.right
		t2.right = t1
		t1.height = this.max(this.height(t1.left), this.height(t1.right)) + 1
		t2.height = this.max(this.height(t2.left), t1.height) + 1
		return t2
	}
	
	drl(tmp) {
		tmp.left = this.srr(tmp.left)		
		return this.srl(tmp)
	}

	srr(t1) {
		var t2
		t2 = t1.right
		t1.right = t2.left
		t2.left = t1		
		t1.height = this.max(this.height(t1.left), this.height(t1.right)) + 1
		t2.height = this.max(this.height(t2.right), t1.height) + 1
		return t2
	}
	
	drr(tmp) {
		tmp.right = this.srl(tmp.right)
		return this.srr(tmp)
	}

    obtenerNombre(tmp,id) {
        let nombre="";
        if (tmp != null) {
            if(tmp.value==id){
                nombre=tmp.nombre;
                return nombre;
            }
            this.obtenerNombre(tmp.left);
            this.obtenerNombre(tmp.right);
        }
    }
    reseteartitulo(){
        this.titulohtml="";
    }

    agregarComentario(tmp,nombre,user,coment) {
        this.nombrePelicula=nombre;
        if (tmp != null) {
            if(tmp.nombre.toString()==this.nombrePelicula.toString()){
                tmp.listacoments.agregar(user,coment)            
            }
                       
            this.agregarComentario(tmp.left,this.nombrePelicula,user,coment);
            this.agregarComentario(tmp.right,this.nombrePelicula,user,coment);
        }
    }
    resetearcomentarios(){
        this.comentss="";
    }
    mostrarcomentarios(tmp,nombre){
        this.nombrePelicula=nombre;
        if (tmp != null) {
            if(tmp.nombre.toString()==this.nombrePelicula.toString()){
                this.comentss=tmp.listacoments.crearHtml();        
            }  
            this.mostrarcomentarios(tmp.left,this.nombrePelicula);
            this.mostrarcomentarios(tmp.right,this.nombrePelicula);
        }


    }
    generarHtmltitulo(tmp,nombre) {
        this.nombrePelicula=nombre;
        if (tmp != null) {
            if(tmp.nombre.toString()==this.nombrePelicula.toString()){
                this.titulohtml=`<div id="titulopeli">
                       <label id="lblnombre">${tmp.nombre}</label>
                       <p>Descripcion:${tmp.descripcion}</p>
                       <div class="star-widget">`
                       for(let i=1;i<=tmp.star;i++){
                          this.titulohtml+=`
                          
                          <input type="radio" name="rate" id="rate-`+i+`">
                          <label for="rate-`+i+`" `+` class="fas fa-star" style="cursor:pointer;"></label>`
                        
                       }this.titulohtml+=`
                        <button onclick="modificarStar(`+"`"+tmp.nombre+"`"+`)">Modificar Estrellas</button>
                        <input type="text" id="stars" placeholder="estrellas">
                        
                       </div>
                       <div id="comen">
                            <div>
                                <h2>COMENTARIOS</h2>
                            </div>
                            <div id="inputcoment">
                                <input type="text" id="ingresocomentario" placeholder="Ingrese comentario">
                                <button onclick="comentar(`
                                this.titulohtml+="`"+tmp.nombre+"`"+`)"> Comentar </button>
                            </div>
                       </div>
                       </div>`;
                       
            }
                       
            this.generarHtmltitulo(tmp.left,this.nombrePelicula);
            this.generarHtmltitulo(tmp.right,this.nombrePelicula);
        }
    }

    generarHtml(tmp) {
        if (tmp != null) {
            this.html+=`<div id="catalogo">
                       <label>${tmp.nombre}</label>
                       <p>Descripcion:${tmp.descripcion}</p>
                       <button onclick="aquilarPelicula(`+"`"+tmp.nombre+"`,`"+tmp.descripcion+"`"+`)">ALQUILAR</button>
                       <button onclick="informacion(`+"`"+tmp.nombre+"`"+")"+`"`+`>INFO</button>
                       <label id="lblPrecio">Q.${tmp.precio}</label>
                       </div>`;
                       
            this.generarHtml(tmp.left);
            this.generarHtml(tmp.right);
        }
    }

    modificarEstrellas(tmp,pelicula,cantidad){
        if(tmp!=null){
            if(tmp.nombre.toString()==pelicula.toString()){
                tmp.star=cantidad;
            }
            this.modificarEstrellas(tmp.left,pelicula,cantidad);
            this.modificarEstrellas(tmp.right,pelicula,cantidad);
        }

        
    }
    preorder(tmp) {
        if (tmp != null) {
            console.log(tmp.value);
            this.preorder(tmp.left);
            this.preorder(tmp.right);
        }
    }

    inorder(tmp) {
        if (tmp != null) {
            this.inorder(tmp.left)
            document.getElementById("log").innerHTML+=tmp.value+' '
            this.inorder(tmp.right)
        }
    }

    postorder(tmp) {
        if (tmp != null) {
            this.postorder(tmp.left)
            this.postorder(tmp.right)
            document.getElementById("log").innerHTML+=tmp.value+' '
        }
    }

    dotgen(tmp) {
        if (tmp != null) {

            if (tmp.left != null) this.dot += tmp.value+'--'+tmp.left.value+';'
            if (tmp.right != null) this.dot += tmp.value+'--'+tmp.right.value+';'

			
			/*
			if (tmp.left == null)
				this.dot += tmp.value+'-- '+tmp.right.value+';'
			if (tmp.right != null && tmp.left !=null) 
				this.dot += tmp.value+'-- {'+tmp.left.value+' '+temp.right.value+'};'
			
			else if (tmp.right == null)
				this.dot += tmp.value+'-- {'+tmp.left.value+' null};'
				*/
            this.dotgen(tmp.left)
            this.dotgen(tmp.right)
        }
    }

	exportRender(){
        console.log(this.configraph2());
        d3.select("#graficapeliculas").graphviz()
        .width(1900)
        .height(750)
        .renderDot(this.configraph2())

    }

    //preorden
    preordenGrafica(){
        this.pre_ordenGrafica(this.root);
    }

    pre_ordenGrafica(nodo){
        if(nodo!=null){
            console.log("Valor:",nodo.value);
            graphviz+=
            this.pre_ordenGrafica(nodo.left);
            this.pre_ordenGrafica(nodo.right);
        }
    }
    
    
    exportRender(){
        console.log(this.configraph2());
        d3.select("#graficapeliculas").graphviz()
        .width(1900)
        .height(750)
        .renderDot(this.configraph2())

    }
    configraph2(){
        
        let graphviz="";
        graphviz+=`
        digraph G{
            rankdir="TB";
            label="ARBOL PELICULAS";
            node[shape=record arrowhead=diamond]
            node[style=filled]\n
            `;
        this.preordenGraph();
        graphviz+=this.prueba;
        
        if(this.root!=null){
            graphviz+=this.nodoGraph(this.root);
        }
        graphviz+="\n"+"}";
        return graphviz.toString()
    }

    preordenGraph(){
        this.pre_ordenGraph(this.root);
    }
    
    pre_ordenGraph(nodo){
        
        if(nodo!=null){
            this.prueba+=nodo.value.toString().replace(/ /g,"")+"[label="+'"'+"<C0>|"+nodo.nombre+"|<C1>"+'"];'+"\n";
            this.pre_ordenGraph(nodo.left);
            this.pre_ordenGraph(nodo.right);
        }
        
    }

    nodoGraph(nodo){
        
        if(nodo.left==null && nodo.right==null){
           return nodo.value.toString().replace(/ /g,"")
        }
        else{
            var texto="";
            if(nodo.left!=null){
                texto=nodo.value.toString().replace(/ /g,"")+":C0"+"->"+this.nodoGraph(nodo.left)+"\n";
             }
             if(nodo.right!=null){
                 texto+=nodo.value.toString().replace(/ /g,"")+":C1"+"->"+this.nodoGraph(nodo.right)+"\n";
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