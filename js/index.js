//VARIABLES GLOBALES
let activado = false; //variable global para el estado del pincel
let colorActivado = "color1"; //selecciono por defecto el color1 de la paleta

const crearEvento = function(){
    function w3c_crearEvento(elemento, evento, mifuncion){
        elemento.addEventListener(evento, mifuncion, false);
    }

    function ie_crearEvento(elemento, evento, mifuncion){
        var fx = function(){
            mifuncion.call(elemento); 
        };

        // Enlazamos el evento con attachEvent. Cuando usamos attachEvent
        // dejamos de tener acceso al objeto this en mifuncion. Para solucionar eso
        // usaremos el método call() del objeto Function, que nos permitirá
        // asignar el puntero this para su uso dentro de la función. El primer
        // parámetro que pongamos en call será la referencia que se usará como 
        // objeto this dentro de nuestra función. De esta manera solucionamos el problema
        // de acceder a this usando attachEvent en Internet Explorer.

        elemento.attachEvent('on' + evento, fx);
    }

    if (typeof window.addEventListener !== 'undefined'){
        return w3c_crearEvento;
    }else if (typeof window.attachEvent !== 'undefined'){
        return ie_crearEvento;
    }
}();    // <= Esta es la parte más crítica - tiene que terminar en ()


//Funcion principal que se carga en la página
function iniciar(event){
    event.preventDefault();
    creartitulo("titulo","Tema 6 - Practica");
    dibujarTablero();
    seleccionaColor();
    activarPincel();
    pintarTabla();
}

//Funcion para crear el titulo
function creartitulo(id,value){
    const titulo = document.createElement("h1");
    titulo.setAttribute("id",id);
    titulo.setAttribute("name",id);

    titulo.innerHTML = value;
    document.getElementById("titulo").appendChild(titulo);
}

//Funcion para crear la tabla con las celdas
function dibujarTablero(){
    //creo un titulo para la tabla
    const titulo = document.createTextNode("Haga CLICK en cualquier celda para activar/desactivar el Pincel");
    let tituloTabla = document.createElement("caption");

    //creo la tabla
    let tabla = document.createElement("table");

    //Añado un atributo a la tabla 
    tabla.setAttribute("id","tablaResultado");

    //creo unos atributos para la tabla
    tabla.setAttribute("border", 1);
    tabla.setAttribute("class","tablerodibujo");

    //filas y celdas de la tabla
    let filas = "";
    let celdas = "";
 
   //creo filas y celdas a la tabla
   for (let i = 1; i <= 30; i++){
    //creo las filas
    filas = document.createElement("tr");
    for (let j = 1; j <= 30; j++){
        //creo las celdas
        celdas = document.createElement("td");
        //añado el evento a las celdas
        crearEvento(celdas,"mouseover",pintar);
        //añado las celdas a las filas
        filas.appendChild(celdas);
    }

    //Añado las filas a la tabla
    tabla.appendChild(filas);
    }
    //Añado el titulo a la tabla
    tituloTabla.appendChild(titulo);
    tabla.appendChild(tituloTabla);

    //Añado la tabla al html
    document.getElementById("zonadibujo").appendChild(tabla);
}

//Funcion para seleccionar el color
function seleccionaColor(){

    //obtengo el valor de la tabla
    const tablaColores = document.getElementById("paleta");
    //obtengo los td de la tabla 
    let td = tablaColores.getElementsByTagName("td");

    //recorro los td de la tabla
    for (let i = 0; i < td.length-1; i++) {

        //A cada td le aplico una función
        td[i].addEventListener("click",function(){

            //Recorro los td de la tabla y elimino la clase 'seleccionado' 
            for ( j = 0; j < this.parentNode.childNodes.length; j++) {
                if(this.parentNode.childNodes[j].classList != undefined){
                    this.parentNode.childNodes[j].classList.remove("seleccionado");
                }
            }

            //Añado la clase 'seleccionado' al td que haya hecho click
            this.classList.add("seleccionado");

            //Guardo el color de la clase en una variable
            colorActivado = this.classList[0];
        });
    }

}

//Funcion para activar el pincel
function activarPincel(){

    //pongo un valor al pincel
    document.getElementById("pincel").innerText = "PINCEL DESACTIVADO";

    //añado un evento en el div para cuando haga click cambie el estado del pincel
    document.getElementById("tablaResultado").addEventListener("click",function(event){
        event.preventDefault();

        if(activado == false){
            document.getElementById("pincel").innerText = "PINCEL ACTIVADO";
            activado = true;
        }else{
            document.getElementById("pincel").innerText = "PINCEL DESACTIVADO";
            activado = false;
        }
    });
}

//Funcion para pintar en la tabla
function pintar(){
    //compruebo que el pincel este activado antes de pintar
    if(activado == true){
        //Asigno en la clase el color  
        this.className = colorActivado;
    }
}

window.onload = iniciar; //cargo la funcion al iniciar la página