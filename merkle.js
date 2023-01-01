class DataNode { //Nodo de las transcacciones
	constructor(value) {
		this.value 	= value
	}
}

class HashNode { // Nodo del arbol de merkle
  constructor(hash) {
    this.hash  = hash
    this.left  = null
    this.right = null
  }
}

class Merkle {
  constructor() {
    this.tophash = null
    this.size = 0;
    this.datablock = []  //transcacciones   
    this.dot = ''
    this.empty=true;
    this.longitudfinaldatablock=0;
    this.numNodos=0;
    this.numNodos2=0;
  }

  add(value){
    this.empty=false;
    this.datablock[this.size]= new DataNode(value);
    this.size++;
  }

  createTree(exp) { //crear el arbol con los 1(unos)
    this.tophash = new HashNode(0)
    this._createTree(this.tophash, exp )
  }

  _createTree(tmp, exp) { //a los nodos del arbol merkle se les inserta valor 0 esto no incluye las transacciones
    if (exp > 0) {
      tmp.left = new HashNode(0)
      tmp.right = new HashNode(0)
      this._createTree(tmp.left, exp - 1)
      this._createTree(tmp.right, exp - 1)
    }
  }

  genHash(tmp, n) { // postorder
    if (tmp != null) {
      this.genHash(tmp.left, n)
      this.genHash(tmp.right, n)  
      if (tmp.left == null && tmp.right == null) {
        console.log(this.datablock[n-this.longitudfinaldatablock].value)
        try{
          tmp.hash = sha256(this.datablock[n-this.longitudfinaldatablock].value)
          this.longitudfinaldatablock--;
        }
        catch(error){
          tmp.hash=sha256("1")
        }
        
        console.log(tmp.hash)
        //tmp.hash =sha256(tmp.left.value.user+" - "tmp.left.value.movie)
      } else {
        tmp.hash = sha256(tmp.left.hash+""+tmp.right.hash)
        console.log(tmp.hash)
      }      
    }
  }

  auth() {
    console.log(this.datablock)
    var exp = 1
    while (Math.pow(2, exp) < this.datablock.length) {
      exp += 1
    }
    for (var i = this.datablock.length; i < Math.pow(2, exp); i++) {
      this.datablock.push(1)
    }

    console.log(this.datablock);
    console.log(this.datablock.length);
    this.longitudfinaldatablock=Math.pow(2, exp)
    this.createTree(exp)
    this.genHash(this.tophash, Math.pow(2, exp))
  }

  clear(){
    this.tophash = null
    this.datablock = [] 
    this.size=0; 
  }

  exportRender(){
    console.log(this.configraph2());
    d3.select("#graficamerkle").graphviz()
    .width(1900)
    .height(750)
    .renderDot(this.configraph2())

  }

  resetearDot(){
    this.dot="";
  }
  configraph2(){
        
    let graphviz="";
    graphviz+=`
    digraph G{
        fontsize="10"
        rankdir="BT";
        label="ARBOL MERKLE";
        node[shape=record arrowhead=diamond]
        node[style=filled]\n
        `;
    this.preordenGraph();
    graphviz+=this.dot;
    
    if(this.tophash!=null){
        graphviz+=this.nodoGraph(this.tophash);
    }
    graphviz+="\n"+"}";
    return graphviz.toString()
}

preordenGraph(){
    this.pre_ordenGraph(this.tophash);
}

pre_ordenGraph(nodo){
    
    if(nodo!=null){
        this.dot+="nodo"+nodo.hash+"[label="+'"'+"<C0>|"+nodo.hash+"|<C1>"+'" fontsize="10.00" fixedsize=true, width=10.0, height=0.75];'+"\n";
        this.pre_ordenGraph(nodo.left);
        this.pre_ordenGraph(nodo.right);
    }
    
}

nodoGraph(nodo){
    
    if(nodo.left==null && nodo.right==null){
       return "nodo"+nodo.hash;
    }
    else{
        var texto="";
        if(nodo.left!=null){
            texto="nodo"+nodo.hash+":C0"+"->"+this.nodoGraph(nodo.left)+"\n";
         }
         if(nodo.right!=null){
             texto+="nodo"+nodo.hash+":C1"+"->"+this.nodoGraph(nodo.right)+"\n";
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
