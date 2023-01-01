class NodoAlquiler{
    constructor(nombre,descripcion){
        this.descripcion=descripcion
        this.name=nombre;
        this.siguiente=null;
    }
}

class Alquilar{
    constructor(){
        this.inicio=null;
        this.cantidad=0;
    }

    agregar(nombre,descripcion){
        let nuevonodo=new NodoAlquiler(nombre,descripcion)
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
        this.cantidad++;
    }
}

class NodoEnlazada{
    constructor(dpi,name,username,correo,password,phone,admin){
        this.dpi=dpi;
        this.name=name;
        this.username=username;
        this.password=password;
        this.phone=phone;
        this.correo=correo
        this.admin=admin;
        this.siguiente=null;
        this.listaaquiler=new Alquilar();
    }
}


class listaenlazada{
    constructor(){
        this.inicio=null;
        this.tamaño=0;
        
    }

    agregar(dpi,name,username,correo,password,phone,admin){
        let nuevonodo=new NodoEnlazada(dpi,name,username,correo,password,phone,admin);
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
    alquilarPelicula(usuario,pelicula,descripcion){
        
        let aux=this.inicio;
        while(aux!=null){
            if(aux.username.toString()==usuario.toString()){
                aux.listaaquiler.agregar(pelicula,descripcion);
                alert(pelicula+" Agregada a la lista de alquiler de "+aux.username);
                
            }
            aux=aux.siguiente;
        }

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
            console.log("CORREO: "+aux.correo)
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
       
        d3.select("#graficaclientes").graphviz()
        .width(1000)
        .height(200)
        .renderDot(this.configraph())
    }


    configraph() {
        var aux=this.inicio;
       let graphviz=""
        graphviz+= "digraph G{ rankdir=" +"LR"+" node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
        graphviz += 'label = "CLIENTES" ' + 'edge[dir = "both"];\n';
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