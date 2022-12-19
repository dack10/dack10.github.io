class NodoPila{
    constructor(_usuario){
        this.usuario=_usuario;
        this.next=null;
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
        newNode.next=this.top;
        this.top=newNode;
    }

    pop(){
        if(this.top!=null){
            var temp = this.top;
            this.top=this.top.next;
            this.size--;
            return temp;
    }  
        }
    getSize(){
        return this.size;
    }

    print(){
        var temp=this.top;
        while(temp!=null){
            console.log(temp)
            temp=temp.next;
        }
    }

    crearHtml(){
        var txtHtml="";
        var aux=this.top;
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
        }
        return txtHtml.toString();
    }
}





function ordenamientoburbuja(a){
    aux=null;
    tmp=a.cabeza;
    while(tmp!=null){
        tmp2=tmp1.sig;
        while(tmp2!=null){
            if(tmp.valor>tmp2.value){
                aux=tmp2.value;
                tmp2.value=tmp.value;
                tmp.value=aux;
        }
        tmp2=tmp2.sig;
        }
    tmp1=tmp1.sig;
    }
}