document.getElementById('startButton').addEventListener('click', function() {
    startTimer();
    startExercise();
});

let wordSlot = document.getElementById("wordSlot");
let visualInterval;
let timerInterval;
let originalWords = [
    "Elefante Guitarra Playa", "Computadora Montaña Chocolate", "Universo Libro Estrella", 
    "Fresa Camino Perro", "Aventura Canción Bosque", "Cielo Amor Piano",
    "Viaje Helado Océano", "Luna Sol Arcoiris", "Casa Flor Abeja", 
    "Mariposa Aurora Nube", "Relámpago Héroe Sonrisa", "Bailarín Viento Catarata",
    "Girasol Desierto Reloj", "Mar Arena Coral", "Sirena Nave Olas",
    "Sueño Despertar Ocaso", "Horizonte Tranquilidad Reflejo", "Colina Neblina Silencio",
    "Meditación Árbol Río", "Pájaro Hojas Cascada", "Escalera Barco Isla",
    "Nieve Copo Diamante", "Perla Brisa Murmullo", "Estanque Atardecer Montura",
    "Estrella Caballo Niebla", "Fuego Trueno Relajación", "Descanso Paseo Huella",
    "Paraíso Amistad Corazón", "Recuerdo Música Inspiración", "Creación Nacimiento Juventud",
    "Niñez Libertad Refugio", "Jardín Orquídea Espejo", "Caverna Templo Faro",
    "Armonía Esperanza Cascabel", "Lágrima Destello Alba", "Colores Luz Cristal",
    "Arco Río Bosquejo", "Marea Constelación Cúpula", "Tierra Relato Sonido",
    "Travesía Cabaña Fragancia", "Nube Trigal Cosecha", "Bruma Ondas Espuma",
    "Arena Lluvia Alondra", "Rocío Eco Ceniza", "Raíz Madera Barro",
    "Molino Mirada Silencio", "Susurro Gaviota Tallo", "Floración Ritmo Sombra",
    "Camino Mirador Vigía", "Montículo Estalactita Velero", "Náufrago Corriente Tótem",
    "Huerto Nebulosa Brillante", "Estrella Polar Constancia Serenidad", "Compás Rayo Observatorio",
    "Torre Puente Atalaya", "Caverna Césped Prado", "Esplendor Firmamento Golondrina",
    "Melodía Sinfonía Calma", "Bravura Viento Corriente", "Canoa Sendero Espejismo",
    "Bosquecillo Sierra Solsticio", "Equinoccio Viento Huracán", "Tormenta Lluvia Neblina",
    "Rayo Piedra Selva", "Papel Camino Diamante", "Círculo Vuelo Travesía", 
    "Cumbre Horizonte Faro", "Escultura Viento Arena", "Río Estrella Brújula", 
    "Planeta Flor Cascada", "Nube Sol Carretera", "Sabana Sol Luna", 
    "Águila Cielo Desierto", "Relámpago Árbol Reflejo", "Tempestad Puerta Llama", 
    "Luz Cristal Ruido", "Ritmo Ola Viento", "Volcán Ceniza Isla", 
    "Pirámide Espiral Rayo", "Corazón Montaña Eco", "Montaña Valle Estrella", 
    "Lago Árbol Manto", "Brisa Duna Coral", "Árbol Roca Horizonte", 
    "Montaña Reloj Escarcha", "Brújula Fuego Arena", "Sendero Ruina Espejo", 
    "Alma Cristal Horizonte", "Luna Roca Fuego", "Tormenta Eco Brisa", 
    "Montaña Viento Lago", "Cueva Refugio Isla", "Perla Sol Canción", 
    "Ruido Murmullo Luz", "Cumbre Vuelo Caverna", "Sombra Océano Fuego", 
    "Lago Relámpago Arena", "Refugio Piedra Nave", "Desierto Lluvia Raíz", 
    "Rayo Camino Reflejo", "Sombra Bruma Silencio", "Ecos Estrella Rocío", 
    "Cumbre Árbol Danza", "Raíz Vuelo Sonrisa", "Muro Océano Luz", 
    "Estrella Camino Barco", "Viaje Horizonte Brújula", "Refugio Eco Murmullo", 
    "Faro Ola Sombra", "Sol Niebla Lluvia", "Montura Fuego Duna", 
    "Cumbre Escarcha Mirada", "Nave Faro Travesía", "Viento Navegante Isla",
    "Aurora Relato Océano", "Cosecha Neblina Cascabel", "Orilla Rocío Horizonte",
    "Danza Nube Llama", "Arco Senda Hojas", "Tierra Cristal Murmullo",
    "Vuelo Barco Marea", "Isla Refugio Nube", "Montaña Eco Viento",
    "Escalera Reflejo Travesía", "Camino Valle Relámpago", "Bruma Solsticio Sendero",
    "Ritmo Piedra Horizonte", "Lluvia Mirada Templo", "Cielo Espuma Despertar",
    "Cascada Cristal Relámpago", "Sol Reflejo Marea", "Llama Horizonte Eco", 
    "Corazón Arena Aurora", "Raíz Espejo Nube", "Cielo Bruma Estrella", 
    "Río Relato Fuego", "Sendero Eco Brisa", "Escarcha Fuego Océano", 
    "Muro Relámpago Estrella", "Sombra Marea Murmullo", "Montaña Sol Refugio", 
    "Árbol Lago Cristal", "Brújula Viento Sombra", "Puente Ceniza Barco", 
    "Isla Horizonte Llama", "Cumbre Eco Despertar", "Pirámide Sol Eco", 
    "Lago Aurora Viento", "Río Llama Danza", "Bruma Relámpago Río", 
    "Ola Estrella Reflejo", "Cristal Neblina Horizonte", "Cielo Vuelo Estela", 
    "Perla Lluvia Travesía", "Reloj Murmullo Manto", "Senda Estrella Cristal", 
    "Faro Ola Bruma", "Relámpago Sendero Eco", "Alma Isla Horizonte", 
    "Cumbre Estrella Neblina", "Rayo Fuego Montaña", "Valle Arena Reflejo", 
    "Luz Caverna Brisa", "Montura Solsticio Viento", "Duna Niebla Océano", 
    "Tierra Faro Luna", "Piedra Espuma Espejo", "Lago Refugio Viento", 
    "Desierto Faro Cristal", "Sombra Fuego Luz", "Montura Llama Reflejo", 
    "Valle Luna Brújula", "Barco Cumbre Lluvia", "Ruina Sol Ceniza", 
    "Aurora Isla Despertar", "Caverna Danza Marea", "Río Manto Estrella", 
    "Tierra Eco Relato", "Estela Rayo Horizonte", "Llama Refugio Sombra",
    "Sendero Espuma Travesía", "Cascada Barco Sol", "Horizonte Nube Ceniza",
    "Círculo Bruma Murmullo", "Árbol Niebla Espejo", "Raíz Fuego Relato",
    "Marea Aurora Cristal", "Escalera Senda Viento", "Reloj Océano Manto",
    "Vuelo Reflejo Brújula", "Montaña Estrella Ceniza", "Ola Sombra Espejo",
    "Corazón Relámpago Isla", "Camino Estela Refugio", "Brisa Nube Horizonte",
    "Nave Murmullo Relato", "Faro Niebla Marea", "Senda Aurora Llama",
    "Raíz Travesía Luz", "Eco Isla Neblina", "Alma Ceniza Cristal",
    "Cumbre Barco Horizonte", "Lago Brisa Despertar", "Océano Puente Eco"
];


// Función para mezclar el array original de palabras
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
    }
    return array;
}

function startExercise() {
    // Ocultar instrucciones y botones
    var instructionParagraphs = document.querySelectorAll('.instruction');
    for (var i = 0; i < instructionParagraphs.length; i++) {
        instructionParagraphs[i].style.display = 'none';
    }
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('containerInputButton').style.display = 'none';
    
    // Mostrar la ranura
    document.getElementById('slotContainer').classList.remove('hidden');
    
    // Obtener la velocidad del recorrido desde el campo de entrada
    var speedInput = document.getElementById('speedInput');
    var velocidadRecorrido = parseInt(speedInput.value);
    
    // Mezclar las palabras
    let shuffledWords = shuffleArray([...originalWords]); // Mezclar palabras

    // Iniciar el recorrido visual
    startVisualRecorrido(velocidadRecorrido, shuffledWords);
}

function startVisualRecorrido(velocidadRecorrido, words) {
    var wordIndex = 0;
    clearInterval(visualInterval);
    
    visualInterval = setInterval(function() {
        // Mostrar la palabra en la ranura central
        wordSlot.innerHTML = ''; // Limpiar ranura
        var p = document.createElement('p');
        p.textContent = words[wordIndex]; // Usar la palabra aleatoria
        wordSlot.appendChild(p);
        
        // Incrementar el índice de las palabras
        wordIndex++;
        if (wordIndex >= words.length) {
            wordIndex = 0; // Reiniciar al final del array
        }
    }, velocidadRecorrido);
}

function startTimer() {
    var timerElement = document.getElementById('timer');
    var totalTime = 180; // 3 minutos en segundos
    var minutes, seconds;
    
    timerInterval = setInterval(function() {
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;
        timerElement.innerHTML = 'Tiempo restante: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        if (totalTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(visualInterval);
            alert('¡El ejercicio ha terminado!');
            return;
        }
        totalTime--;
    }, 1000);
}