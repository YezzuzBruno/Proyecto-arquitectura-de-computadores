let rec;
let speech;
let ultimaTranscripcion;

btnIniciar = document.getElementById("iniciar");

let mencionar_micro_desactivado = "El micrófono deja de escuchar";
let empezar = "Empezando";
let indicaciones = "Elija una de las opciones y mencionelas";
let opcion_valida = "Opción válida";
let opcion_invalida = "Opción invalida";

if (!("webkitSpeechRecognition" in window)) {
    alert("Disculpa, no puedes usar la API");
} else {
    //asignando a rec un nuevo objeto que reconocera la voz
    rec = new webkitSpeechRecognition();
    //define el lenguaje
    rec.lang = "es-PE";
    //indica si solo escucha una vez o mas de una vez
    rec.continuous = true;
    //Controla si los resultados provisionales deben devolverse al instante o no
    //interimResults
    rec.interim = true;
    //con la siguiente linea de codigo indicabamos que cuando se reciba alguna
    //señal de voz, se ejecutara la funcion iniciar
    //ahora lo cambie, ya que la señal sera controlada por botones
    //rec.addEventListener("result",iniciar);
}


btnIniciar.addEventListener('click', iniciar);
//btnDetener.addEventListener('click', detener);

function iniciar() {
    console.log("Iniciando grabacion");
    hablar(empezar);
    //hablar(indicaciones);
    rec.start();
}

function detener() {
    console.log("Deteniendo la grabacion");
    rec.abort();
}
let int_opcion;
var jugador = 1;
let turno = "Turno del siguiente jugador";
rec.onresult = (event) => {
    let resultados = event.results;
    console.log(resultados);
    let transcripcion = resultados[resultados.length - 1][0].transcript;
    ultimaTranscripcion = transcripcion.toLowerCase();
    //hablar(turno);
    if (ultimaTranscripcion.trim() == "0" || ultimaTranscripcion.trim() == "1" || ultimaTranscripcion.trim() == "2" || ultimaTranscripcion.trim() == "3" || ultimaTranscripcion.trim() == "4" || ultimaTranscripcion.trim() == "5" || ultimaTranscripcion.trim() == "6" || ultimaTranscripcion.trim() == "7" || ultimaTranscripcion.trim() == "8" || ultimaTranscripcion.trim() == "9") {
        //ultimaTranscripcion;
        int_opcion = parseInt(ultimaTranscripcion.trim());
        console.log(int_opcion);
        console.log("Activando el pcleda");
        pcelda(int_opcion);
    }
    if (ultimaTranscripcion.trim() == "uno" || ultimaTranscripcion.trim() == " uno") {
        int_opcion = 1;
        console.log(int_opcion);
        console.log("Activando el pcleda");
        pcelda(int_opcion);
    }
}

rec.onend = (event) => {
    hablar(mencionar_micro_desactivado);
    console.log("El microfono deja de escuchar");
}
//funcion que se activa cuando hay un error en el reconocimiento de voz
rec.onerror = (event) => {
    console.log("El microfono deja de escuchar");
    console.log(event.error);
}


function hablar(texto) {
    console.log("Reproduciendo el audio");
    speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
//--------------------------------------
var mapa = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
//var jugador = 1;
function dibujar() {
    for (i = 0; i < 9; i++) {
        if (mapa[i] == 0) document.getElementById("c" + i).style = "background-color: white;font-size: 50px;text-align:center;color:black;";
        if (mapa[i] == 1) document.getElementById("c" + i).style = "background-color: red;font-size: 50px;text-align:center;color:white;";
        if (mapa[i] == 2) document.getElementById("c" + i).style = "background-color: blue;font-size: 50px;text-align:center;color:white;";
    }
}
//primero sucede
function pcelda(celda) {
    if (mapa[celda] == 0) {
        if (jugador == 1) {
            mapa[celda] = 1;
            jugador = 2;
        } else {
            mapa[celda] = 2;
            jugador = 1;
        }
    } else {
        window.alert("No puedes pulsar sobre una celda coloreada");
    }
    dibujar();
    var r = ganador();
    switch (r) {
        case 0:
            break;
        case 1:
            window.alert("¡Ganó el rojo!");
            hablar("Ganó el rojo.");
            return;
            
        case 2:
            window.alert("¡Ganó el azul!");
            hablar("Ganó el azul.");
            return;
            
        case 3:
            window.alert("¡Empate!");
            hablar("Empate.");
            return;
            
    }
    hablar(turno);
}
function ganador() {
    var numEspacios = 0;
    for (i = 0; i < 9; i++) {
        if (mapa[i] == 0) numEspacios++;
    }
    // Las líneas horizontales
    if (mapa[0] == mapa[1] && mapa[1] == mapa[2] && mapa[0] != 0) return mapa[0];
    if (mapa[3] == mapa[4] && mapa[4] == mapa[5] && mapa[3] != 0) return mapa[3];
    if (mapa[6] == mapa[7] && mapa[7] == mapa[8] && mapa[6] != 0) return mapa[6];
    //Las líneas verticales
    if (mapa[0] == mapa[3] && mapa[3] == mapa[6] && mapa[0] != 0) return mapa[0];
    if (mapa[1] == mapa[4] && mapa[4] == mapa[7] && mapa[1] != 0) return mapa[1];
    if (mapa[2] == mapa[5] && mapa[5] == mapa[8] && mapa[2] != 0) return mapa[2];
    //Las diagonales
    if (mapa[0] == mapa[4] && mapa[4] == mapa[8] && mapa[0] != 0) return mapa[0];
    if (mapa[2] == mapa[4] && mapa[4] == mapa[6] && mapa[2] != 0) return mapa[2];

    if (numEspacios > 0) {
        return 0;
    } else {
        return 3;
    }
}