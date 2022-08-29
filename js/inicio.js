clearInterval();
let rec;
let speech;
let ultimaTranscripcion;

btnStart=document.getElementById("btnStart");
btnDetener=document.getElementById("btnDetener");


let opcion=document.getElementById("opcion");
let resultado=document.getElementById("resultado");


let mencionar_micro_desactivado= "El micrófono deja de escuchar";
let empezar="Empezando";
let indicaciones="Elija una de las opciones y mencionelas";
let opcion_valida="Opción válida";
let opcion_invalida="Opción invalida";

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


btnStart.addEventListener('click',iniciar);
btnDetener.addEventListener('click', detener);

function iniciar(){
    console.log("Iniciando grabacion");
    hablar(empezar);
    hablar(indicaciones);
    rec.start();
}

function detener(){
    console.log("Deteniendo la grabacion");
    rec.abort();
}

rec.onresult=(event)=>{
    let resultados=event.results;
    console.log(resultados);
    let transcripcion=resultados[resultados.length-1][0].transcript;
    ultimaTranscripcion=transcripcion.toLowerCase();
    //opcion.value=transcripcion;
    resultado.lastElementChild.innerHTML=transcripcion;
    
    if(ultimaTranscripcion.trim()=="comparador de frases" || ultimaTranscripcion.trim() == "Comparador de frases"){
        resultado.firstElementChild.innerHTML="Opción válida";
        opcion.style.color="green";
        hablar(opcion_valida);
        setTimeout(()=>{
            location.href="comparadorFrases.html";
            transcripcion="";
        },2000);
    }else if(ultimaTranscripcion.trim()=="qué hora es" || ultimaTranscripcion.trim() == "Qué hora es"){
        resultado.firstElementChild.innerHTML="Opción válida";
        opcion.style.color="green";
        hablar(opcion_valida);
        let hora=new Date();
        let string_hora="Son las "+hora.getHours()+"horas, con "+hora.getMinutes()+" minutos.";
        //-----------------
        modal=document.getElementById("modal");
        modal.style.setProperty("box-shadow","0px 0px 12px #00ffff");
        modal.insertAdjacentHTML('beforeend','<img width="200px" height="200px" src="img/hora.png" alt="hora" id="hour">');
        modal.insertAdjacentHTML('beforeend',"<p id='string_hora' style='font-family:NuevaFuente;font-size:170px;color:#00ffff'>"+hora.getHours()+":"+hora.getMinutes()+"</p>");
        modal.showModal();
        //-----------------
        transcripcion="";
        hablar(string_hora);
        
        //-------------------
        setTimeout(function(){
            modal.close();
            var hour=document.getElementById("hour");
            hour.remove();
            var string_hora=document.getElementById("string_hora");
            string_hora.remove();
        },7000);
        //-----------------
    }else if(ultimaTranscripcion.trim()=="qué fecha estamos" || ultimaTranscripcion.trim() == "Qué fecha estamos"){
        resultado.firstElementChild.innerHTML="Opción válida";
        opcion.style.color="green";
        hablar(opcion_valida);
        let meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
        let fecha=new Date();
        let string_fecha="Hoy es "+ fecha.getDate()+" de "+meses[fecha.getMonth()]+" del "+fecha.getFullYear();
        //--------------------
        modalFecha=document.getElementById("modalFecha");
        txt_mes=document.getElementById("txt_mes");
        txt_dia=document.getElementById("txt_dia");
        txt_mes.innerHTML=meses[fecha.getMonth()];
        txt_dia.innerHTML=fecha.getDate();
        modalFecha.showModal();
        //--------------------
        transcripcion="";
        hablar(string_fecha);
        //-------------------
        setTimeout(function(){
            modalFecha.close();
        },7000);
        //-----------------

    }else if(ultimaTranscripcion.trim()=="tres en raya" || ultimaTranscripcion.trim() == "Tres en raya"){
        resultado.firstElementChild.innerHTML="Opción válida";
        opcion.style.color="green";
        hablar(opcion_valida);
        setTimeout(()=>{
            location.href="tres_en_raya.html";
            transcripcion="";
        },2000);
    }
    else{
        resultado.firstElementChild.innerHTML="Opción inválida";
        opcion.style.color="red";
        hablar(opcion_invalida);
    }

}

rec.onend= (event)=>{
    hablar(mencionar_micro_desactivado);
    console.log("El microfono deja de escuchar");
}
//funcion que se activa cuando hay un error en el reconocimiento de voz
rec.onerror= (event)=>{
    console.log("El microfono deja de escuchar");
    console.log(event.error);
}


function hablar(texto){
    console.log("Reproduciendo el audio");
    speech= new SpeechSynthesisUtterance();
    speech.text=texto;
    speech.volume=1;
    speech.rate=1;
    speech.pitch=1;
    window.speechSynthesis.speak(speech);
}