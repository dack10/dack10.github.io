class Bloque{
	constructor(index,date,data,nonce,prevHash,rootmerkle,hash){
		this.index = index
		this.date = date;
		this.data = data;
		this.nonce = nonce;
		this.prevHash = prevHash;
		this.rootmerkle = rootmerkle;
		this.hash = hash;
	}
}

class NodeBloque{
  constructor(_value){
    this.value = _value;
    this.next = null;
    this.before = null;
  }
}

class BlockChain{
  constructor(){
    this.head = null;
    this.tail = null;
		this.size = 0;
    this.html="";
  }
  resetearhtml(){
    this.html="";
  }
  generarhtml(topp){
    var aux=this.head
    var uno="";
    while(aux!=null){
      
      for(let i=0;i<aux.value.data.length;i++){
        uno+=aux.value.data[i].value+"\n";
                      
      }
      this.html+=`<div id="bloque">
                   <label>Bloque: ${aux.value.index}</label>
                   <label>PREV HASH: ${aux.value.prevHash}</label>
                   <label>HASH: ${aux.value.hash} </label>
                   <label>NOUNCE: ${aux.value.nonce}</label>
                   <label>ROOT MERKLE: ${topp}</label>
                   <label>TRANSACCIONES: ${uno}</label>
                   <label>FECHA: ${aux.value.date}</label>
                </div>
    `
          aux=aux.next;
          uno="";
    }
    return this.html.toString();
  }

	generarBloque(topp,datablock){
    // Debe ir DD-MM-YY-::HH:MM:SS
		
        var fecha = new Date(Date.now());
        var anho = fecha.getFullYear();
        var mes = fecha.getMonth()+1;
        var dia = fecha.getDate();
        var hora = fecha.getHours()
        var minutos = fecha.getMinutes()
        var segundos = fecha.getSeconds()
        var timestamp = dia + "-" + mes + "-" + anho + "-::" + hora + ":" + minutos + ":" + segundos;
        console.log(timestamp.toString())
    //Hash Anterior
		var prevHash = "";
		if(this.isEmpty()){
			prevHash = "00"
		}else{
			prevHash = this.tail.value.hash
		}
    //generamos el arbol
		
    //Data revisar
    var data= datablock;
	  var rootmerkle = topp
  
		var nonce = 0;
		var hash = "";

		//prueba de trabajo
		while(!hash.startsWith("00")){	
			hash = sha256(this.size+timestamp+prevHash+rootmerkle+nonce);
			nonce += 1;
		} 
		var datas = new Bloque(this.size,timestamp,data,nonce,prevHash,rootmerkle,hash);
		this.insert(datas)
    console.log("insertado")
  
    
	}	

	isEmpty(){
		return this.head === null
	}

  insert(_value){
    var newNode = new NodeBloque(_value);
		this.size++;

    if( this.head != null){
      newNode.before = this.tail
      this.tail.next = newNode;
      this.tail = newNode;
    }else{
      this.head = newNode;
      this.tail = newNode;
    }
  }

  delete(_value){
    var temporal = this.head;
    if(temporal.value == _value){
      this.head = temporal.next;
      if(this.head != null){
        this.head.before = null;
      }
    }else{
      while(temporal != null){
        if(temporal.value == _value){
          var anterior = temporal.before;
          anterior.next = temporal.next
          if(temporal.next != null){
            temporal.next.before = anterior; 
          }
          if(this.tail == temporal){
            this.tail = temporal.before 
          }
          break;
        }
        temporal = temporal.next;
      }
    }
  }

  print(){
    var temporal = this.head;
    while(temporal != null){
      console.log(temporal.value);
      temporal = temporal.next;
    }
  }

  print2(){
    var temporal = this.tail;
    while(temporal != null){
      console.log(temporal.value);
      temporal = temporal.before;
    }
  }
}