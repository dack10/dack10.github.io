class Nodo{
    constructor(_value,company){
        this.value = _value
        this.company=company
        this.next = null
    }
  }
  
  class Lista{
    constructor(){
        this.head = null
        this.size = 0;
    }
  
    //metodos de la lista
    //insertar
    
    insert(_value,company){
      this.size++;
      var tempo = new Nodo(_value,company)
      tempo.next = this.head
      this.head = tempo
    }
    //mostrar 
    printList(){
      var temporal = this.head
      while(temporal!=null){
          console.log(temporal.value)
          temporal = temporal.next
      }
    }
  
    getSize(){
      return this.size;
    }
  
    isEmpty(){
      return this.head === null ; 
    }
  }
  
  class TableHash{
    constructor(size){
      this.amount =0;
      this.size =  size;
      this.table = [];
      this.html="";
      for(let i = 0;i < size ; i++){
        this.table.push(new Lista())
      }
    }
    //data es el id de la categoria
    insert(data,company){
      var index = this.functionHash(data);
      if(this.table[index].isEmpty()){
        this.amount++;
      }
      this.table[index].insert(data,company);
      this.rehashing()
    }
    resetearhtml(){
      this.html="";
    }
    generarHtml(){
      for(let i=0; i<this.table.length;i++){
        var aux=this.table[i].head;
        while(aux!=null){
          this.html+=`<div id="catalogo">
                        <label>Id Categoria: ${aux.value}</label>
                        <p>Descripcion:  ${aux.company}</p>
                      </div>`;
          aux=aux.next;
        }

      }
      return this.html.toString();
    }
    functionHash(data){
      return data % this.size;
    }
  
    rehashing(){
      var porcentaje =this.amount/this.size
      if(porcentaje>0.75){
        var temp =this.table;
        var tempSize = this.size
        this.size = this.amount*5
        this.table = []
        for(let i = 0;i < this.size ; i++){
          this.table.push(new Lista())
        }
        this.amount =0;
        for(let i = 0;i < tempSize ; i++){
          if(!temp[i].isEmpty()){
            var nodo = temp[i].head;
            while(nodo!=null){
              this.insert(nodo.value,nodo.company);
              nodo = nodo.next
            }
          }
        }
  
      }
      console.log(this.table,porcentaje);
    }


    exportRender() {
        console.log(this.configraph());
        d3.select("#graficacategorias").graphviz()
        .width(1900)
        .height(750)
        .renderDot(this.configraph())
    }


    configraph() {
        let temp = "";
        temp += "digraph G{ node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
        temp += 'graph[rankdir = "both"];'+"\n";
        var aux=this.table;
        var contador=0;
        var grupo=0;
        var canciones=0;
        for(let i=0;i<this.table.length;i++){
            console.log("si entro");
            var art=aux[i]
            temp+="A"+contador.toString()+"[label="+'"'+i+'"'+", group="+grupo.toString()+"];"+"\n";
            var songs=aux[i].head;
            for(let j=0;j<this.table[i].getSize();j++){
                var song=songs.value.toString();
                temp+="C"+canciones.toString()+"A"+contador.toString()+"[label="+'"'+song+'"'+", group="+grupo.toString()+"];"+"\n";
                songs=songs.next;
                canciones+=1;
            }
            
            contador+=1;
            grupo+=1; 
            canciones=0;
        }
        contador=0;
        grupo=0;
        canciones=0;
        let aux2=this.table;
        for(let i=0;i<this.table.length;i++){
            var art=aux2[i]
            temp+="A"+contador.toString()+"->C"+canciones.toString()+"A"+contador.toString()+"\n";
            var songs=aux2[i].head;
            for(let j=0;j<this.table[i].getSize();j++){
                var song=songs.value.toString();
                temp+="C"+canciones.toString()+"A"+contador.toString()+"->"+"C"+(canciones+1).toString()+"A"+contador.toString()+"\n";
                songs=songs.next;
                canciones+=1;
            }
            
            contador+=1;
            grupo+=1; 
            canciones=0;
        }
        
        temp += "}}";
        return temp.toString();
    }
}