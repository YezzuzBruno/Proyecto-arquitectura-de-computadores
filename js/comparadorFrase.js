var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'I love to sing because it\'s fun',
  'where are you going',
  'why did you talk while I was talking',
  'she enjoys reading books and playing games',
  'where are you going',
  'have a great day',
  'she sells seashells on the seashore',
  'waiting for the lucky one',
  'i\'ve been waiting',
  'don\'t keep me waiting for it',
  'We can\'t change the things we can\'t control'
];

var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('button');

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phrase = phrases[randomPhrase()];
  // Para asegurar la consistencia de las mayúsculas y minúsculas mientras se comprueba con el texto de salida devuelto
  phrase = phrase.toLowerCase();
  phrasePara.textContent = phrase;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    // La propiedad SpeechRecognitionEvent results devuelve un objeto SpeechRecognitionResultList
    // El objeto SpeechRecognitionResultList contiene objetos SpeechRecognitionResult.
    // Tiene un getter para que se pueda acceder a él como un array
    // El primer [0] devuelve el SpeechRecognitionResult en la posición 0.
    // Cada objeto SpeechRecognitionResult contiene objetos SpeechRecognitionAlternative que contienen resultados individuales.
    // Estos también tienen getters para que se pueda acceder a ellos como si fueran arrays.
    // El segundo [0] devuelve el SpeechRecognitionAlternative en la posición 0.
    // Luego devolvemos la propiedad transcript del objeto SpeechRecognitionAlternative 

    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    if(speechResult === phrase) {
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
    } else {
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
      //Se dispara cuando el agente de usuario ha comenzado a capturar el audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Se dispara cuando el agente de usuario ha terminado de capturar el audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Se dispara cuando el servicio de reconocimiento de voz se ha desconectado.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Se dispara cuando el servicio de reconocimiento de voz devuelve un resultado final sin reconocimiento significativo. 
      //Esto puede implicar algún grado de reconocimiento, que no alcanza o supera el umbral de confianza.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Se dispara cuando se detecta cualquier sonido, sea o no reconocible.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Se dispara cuando se deja de detectar cualquier sonido, sea o no reconocible.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Se dispara cuando se detecta un sonido que el servicio de reconocimiento de voz reconoce como habla.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Se dispara cuando el servicio de reconocimiento de voz ha comenzado a escuchar el audio 
      //entrante con la intención de reconocer las gramáticas asociadas con el SpeechRecognition actual.
      console.log('SpeechRecognition.onstart');
  }
}

testBtn.addEventListener('click', testSpeech);
