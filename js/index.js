let rec;
let speech;
let ultimaTranscripcion;
//creando variables que nos permitiran acceder a los elementos del html
let btnStartRecord=document.getElementById('btnStartRecord');
let btnStopRecord=document.getElementById('btnStopRecord');
let btnCrearPerfil=document.getElementById('btnCrearPerfil');

let nombre=document.getElementById('nombre');
let edad=document.getElementById('edad');
let pais=document.getElementById('pais');

let bienvenida="Hola bienvenido, completa este registro para que puedas acceder al inicio. "+
"Para iniciar solo menciona la palabra, EMPEZAR. ";
let pregunta_nombre="Cual es tu nombre?";
let pregunta_edad="Cuántos años tienes?";
let pregunta_pais="De que país eres?";
let mencionar_micro_desactivado= "El micrófono deja de escuchar";

if(!("webkitSpeechRecognition" in window)){
    alert("Disculpa, no puedes usar la API");
}else{
    //asignando a rec un nuevo objeto que reconocera la voz
    rec=new webkitSpeechRecognition();
    //define el lenguaje
    rec.lang= "es-PE";
    //indica si solo escucha una vez o mas de una vez
    rec.continuous = true;
    //Controla si los resultados provisionales deben devolverse al instante o no
    //interimResults
    rec.interim= true;
    //con la siguiente linea de codigo indicabamos que cuando se reciba alguna
    //señal de voz, se ejecutara la funcion iniciar
    //ahora lo cambie, ya que la señal sera controlada por botones
    //rec.addEventListener("result",iniciar);
}


//ASIGNANDO FUNCIONES A LOS BOTONES CUANDO RECIBAN ALGUNA SEÑAL
btnStartRecord.addEventListener('click',iniciar);
btnStopRecord.addEventListener('click',parar);
/*
btnPlayText.addEventListener('click',()=>{
    console.log(nombre.value);
    hablar(nombre.value);
});
*/
btnCrearPerfil.addEventListener('click',()=>{
    location.href="inicio.html";
});

//ESTA ES UNA FUNCION PRINCIPAL QUE ES LA QUE CAPTA TODO LO QUE
//RECIBE EL MICROFONO------------------------------
//la funcion se activa cuando estamos recibiendo la voz
let contador=0;
let activo_edad=false;
let activo_nombre=false;
let activo_pais=false;
rec.onresult=(event)=>{
    let resultados=event.results;
    console.log(resultados);
    let transcripcion=resultados[resultados.length-1][0].transcript;
    //aqui es donde se define si se sobrepone o no el valor
    //de un input u otro
    ultimaTranscripcion=transcripcion.toLowerCase();
    ///*/*/*/*//*/*/*//*/********************************* *

    if(ultimaTranscripcion.trim() =="Crear perfil" || ultimaTranscripcion.trim()=="crear perfil"){
        location.href="inicio.html";
        return;
    }
    //Primero pregunta el nombre
    else if(ultimaTranscripcion.trim()=="Empezar" || ultimaTranscripcion.trim()=="empezar" || ultimaTranscripcion.trim()=="Nombre" || ultimaTranscripcion.trim()=="nombre"){
        activo_nombre=true;
        activo_edad=false;
        activo_pais=false;
        hablar(pregunta_nombre);
        transcripcion="";
    }    

    else if(ultimaTranscripcion.trim()=="Edad" ||ultimaTranscripcion.trim()=="edad"){
        activo_nombre=false;
        activo_pais=false;
        activo_edad=true;
        hablar(pregunta_edad);
        transcripcion="";
    }

    else if(ultimaTranscripcion.trim()=="Pais" || ultimaTranscripcion.trim()=="pais" || ultimaTranscripcion.trim()=="País" || ultimaTranscripcion.trim()=="país"){
        activo_nombre=false;
        activo_edad=false;
        activo_pais=true;
        hablar(pregunta_pais);
        transcripcion="";
    } else{
        console.log("Palabra desconocida");
    }
    

   if(activo_nombre == true && activo_edad != true && activo_pais !=true){
        nombre.value=transcripcion;
   }
   if(activo_edad == true && activo_nombre != true && activo_pais != true){
        edad.value=transcripcion;
   }
   if(activo_pais==true && activo_nombre != true && activo_edad != true){
        pais.value=transcripcion;
   }
   contador++;
    //******************************************************** */
}
//funcion que se activa cuando el microfono deja de escuchar
rec.onend= (event)=>{
    hablar(mencionar_micro_desactivado);
    console.log("El microfono deja de escuchar");
}
//funcion que se activa cuando hay un error en el reconocimiento de voz
rec.onerror= (event)=>{
    console.log("El microfono deja de escuchar");
    console.log(event.error);
}
//------------------------------------------------



//FUNCIONES QUE SERAN ACTIVADAS POR LOS BOTONES
function iniciar(event){
    hablar(bienvenida);
    setTimeout(()=>{
        console.log("Se inicia la grabacion");
        rec.start();
    },7000);
    //funcion que inicia la grabacion
    //console.log("Se inicia la grabacion");
    //rec.start();
}

function parar(event){
    //funcion que detiene o pausa la grabacion
    console.log("Se para la grabacion");
    hablar(mencionar_micro_desactivado);
    rec.abort();
}

function hablar(nombre){
    //se crea un objeto que nos permitira emitir una voz del programa
    console.log("Reproduciendo audio");
    speech= new SpeechSynthesisUtterance();
    //propiedad que lee algo
    speech.text= nombre;
    //definir el volumen entre 1 y 0
    speech.volume = 1;
    //definir la velocidad de reproduccion
    speech.rate=1;
    //definir el tono de voz
    speech.pitch=1;
    //funcion que reproduce el speech definido
    window.speechSynthesis.speak(speech);

}



//funcion en caso queramos que la grabacion sea automatica(VIDEO-DALTO)
/*
function iniciar(event){
    for(let i=event.resultIndex;i<event.results.length; i++){
        document.getElementById('nombre').value=event.results[i][0].transcript;
        document.getElementById('texto').innerHTML=event.results[i][0].transcript;
    }
}
*/
//rec.start();