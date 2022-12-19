

class NodoCola{
    constructor(_usuario) {
        this.usuario=_usuario;
        this.siguiente=null;
    }
}

class Cola{
    constructor(){
        this.frente=null;
        this.ultimo=null;
    }

    insertar(usuario){
        var bloqueado=new NodoCola(usuario);
        if(this.frente==null){
            this.frente=bloqueado;
            this.ultimo=this.frente;
        }
        else if(this.frente.siguiente==null){
            this.frente.siguiente=bloqueado;
            this.ultimo=bloqueado;
        }
        else{
            this.ultimo.siguiente=bloqueado;
            this.ultimo=bloqueado;
        }

    }

    extraer(){
        var extraido="";
        if(this.frente!=null){
            var aux=this.frente;
            extraido=aux.usuario.toString();
            this.frente=this.frente.siguiente;
            aux=null;
        }
        return extraido.toString();
    }

    crearHtml(){
        var txtHtml="";
        var aux=this.frente;
        txtHtml="<h2> BLOQUEADOS </h2>"+"\n";
        while(aux!=null){
            txtHtml+=`
            <div class="div-shadow">
               <div class="img">
                  <img src="usuario.png">
               </div>
               <div class="container">
                  <h2>`+aux.usuario+`</h2>
               </div>
            </div>
            `;
            aux=aux.siguiente;
        }
        return txtHtml.toString();
    } 
}

class NodoPila{
    constructor(_usuario){
        this.usuario=_usuario;
        this.siguiente=null;
    }
}

class Pila{
    constructor(){
        this.top=null;
        this.size=0;
    }

    push(_usuario){
        var newNode=new NodoPila(_usuario);
        this.size++;
        newNode.siguiente=this.top;
        this.top=newNode;
        console.log("se agrego amigo ala pila: ",_usuario)
    }

    pop(){
        if(this.top!=null){
            var temp = this.top;
            this.top=this.top.siguiente;
            this.size--;
            return temp.usuario.toString();
    }  
        }
    getSize(){
        return this.size;
    }

    print(){
        var temp=this.top;
        while(temp!=null){
            console.log(temp)
            temp=temp.siguiente;
        }
    }

    crearHtml(){
        var txtHtml="";
        var aux=this.top;
        txtHtml="<h2> AMIGOS </h2>"+"\n";
        while(aux!=null){
            txtHtml+=`
            <div class="div-shadow">
               <div class="img">
                  <img src="usuario.png">
               </div>
               <div class="container">
                  <h2>`+aux.usuario+`</h2>
               </div>
            </div>
            `;
            aux=aux.siguiente;
        }
        return txtHtml.toString();
    }    
}

class NodoCircular{
    constructor(_artista,_cancion){
        this.artista = _artista;
        this.cancion=_cancion; 
        this.siguiente = null;
        this.anterior=null;
    }
}

class ListaCircular{
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
            graphviz+="->"+aux.cancion.toString()+aux.artista.toString().replace(/ /g,"")+";"+"\n";
            aux=aux.siguiente;
            cont++;
        }
        graphviz += "}}";

        
        return graphviz.toString();
    }
}


class NodoEnlazada{
    constructor(dpi,name,username,password,phone,admin){
        this.dpi=dpi;
        this.name=name;
        this.username=username;
        this.password=password;
        this.phone=phone;
        this.admin=admin;
        this.siguiente=null;
        this.playlist=new ListaCircular();
        this.amigos=new Pila();
        this.bloqueados=new Cola();

    }
}


class listaenlazada{
    constructor(){
        this.inicio=null;
        
    }

    agregar(dpi,name,username,password,phone,admin){
        let nuevonodo=new NodoEnlazada(dpi,name,username,password,phone,admin);
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
            <div class="div-shadow">
               <div class="img">
                  <img src="usuario.png">
               </div>
               <div class="container">
                  <h2>`+aux.username+`</h2>
                  
               </div>
            </div>
            
            `;
            aux=aux.siguiente;
        }
        return txtHtml.toString();

    }

    crearHtmlCircular(usuario){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                return aux.playlist.crearHtml();
            }
            aux=aux.siguiente;
        }
    }
    crearHtmlPila(usuario){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                return aux.amigos.crearHtml();
            }
            aux=aux.siguiente;
        }
    }

    crearHtmlCola(usuario){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                return aux.bloqueados.crearHtml();
            }
            aux=aux.siguiente;
        }
    }

    mostrar(){
        console.log("LISTADO DE DATOS")
        var aux=this.inicio;
        while(aux!=null){
            console.log("DPI: "+aux.dpi+"\n")
            console.log("NAME: "+aux.name+"\n")
            console.log("USERNAME: "+aux.username+"\n")
            console.log("PASSWORD: "+aux.password+"\n")
            console.log("PHONE: "+aux.phone+"\n")
            console.log("ADMIN: "+aux.admin+"\n")
            aux=aux.siguiente;
        }
    }

    agregarAPlaylist(usuario,artista,cancion){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                aux.playlist.agregar(artista,cancion)
            }
            aux=aux.siguiente;
        }

    }

    agregarAAmigos(usuario,amigo){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                aux.amigos.push(amigo);
                console.log("ingresado correctamente");
            }
            aux=aux.siguiente;
        }
    }

    eliminarAmigo(usuario){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                return aux.amigos.pop();
            }
            aux=aux.siguiente;
        }
    }

    bloquearAmigo(usuario,amigo){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                aux.bloqueados.insertar(amigo);
            }
            aux=aux.siguiente;
        }
    }

    desbloquearAmigo(usuario){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username==usuario){
                return aux.bloqueados.extraer();
            }
            aux=aux.siguiente;
        }
    }

    buscar(usuario,pass,admin){
        var aux=this.inicio;
        console.log("se compara: "+usuario+" y " +pass)

        while(aux!=null){
            console.log(aux.username+aux.password)
            if(aux.username.toString()==usuario.toString() && aux.password.toString()==pass.toString()){
                console.log("aqui si entro antes de admin")
                if(aux.admin==admin){
                    return 1;
                }
            }
           
            aux=aux.siguiente;
        }

    }

    buscarAmigo(usuario){
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username.toString()==usuario.toString()){
                return aux.username;
            }
            aux=aux.siguiente;
        }
    }

    exportRender() {
        console.log(this.configraph());
        d3.select("#graficausuarios").graphviz()
        .width(1900)
        .height(600)
        .renderDot(this.configraph())
    }


    configraph() {
        var aux=this.inicio;
       let graphviz=""
        graphviz+= "digraph G{ rankdir=" +"LR"+" node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
        graphviz += 'label = "Matriz DISPERSA" ' + 'edge[dir = "both"];\n';
        graphviz+="raiz->Fila1;"
        graphviz+="Fila1"
        while(aux!=null){
            graphviz+="->"+aux.username.toString()+"\n";
            aux=aux.siguiente;
        }
        graphviz += "}}";

        
        return graphviz.toString();
    }

    exportRenderPlaylist(usuario) {
        var aux=this.inicio;
        while(aux!=null){
            if(aux.username.toString()==usuario.toString()){
                aux.playlist.exportRender();
                return 0;
            }
            aux=aux.siguiente;
        }
    }
}