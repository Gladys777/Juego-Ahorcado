var pantalla = document.getElementById("ahorcado");
var context = pantalla.getContext("2d");

var render = function () {

    context.canvas.width = document.documentElement.clientWidth * .95;
    context.canvas.height = document.documentElement.clientHeight * .60;

    hacerLineas((context.canvas.width * .50) - ((35 * (palabraOculta.length)) / 2), context.canvas.height * .90, palabraOculta.length);

    // Aquí se muestra las letras correctas
    mostrarLetras((context.canvas.width * .50) - ((35 * (letrasIngresadas.length)) / 2), context.canvas.height * .90, letrasIngresadas, "24px Inter", "#0A3871");

    // Aquí se muestra las letras incorrectas
    mostrarLetras((context.canvas.width * .50) - ((35 * (letrasMalIngresadas.length)) / 2), context.canvas.height, letrasMalIngresadas, "24px Inter", "#495057");

    //Aquí se comienza a dibujar la horca
    dibujarHorca(context.canvas.width, context.canvas.height * .75);

    //Aquí se dibuja texto, intentos restantes
    mostrarFrase(context.canvas.width * 1.3, context.canvas.height * 1.4, "Intentos restantes " + (9 - letrasMalIngresadas.length), "10px Inter", "#495057");

    // Aquí se valida si el juego terminó de manera correcta
    if (JSON.stringify(palabraOculta) === JSON.stringify(letrasIngresadas)) {
        mostrarFrase(context.canvas.width, context.canvas.height - 50, "FELICITACIONES,", "30px Inter", "green");
        mostrarFrase(context.canvas.width, context.canvas.height, "¡Haz Ganado!", "30px Inter", "green");
        inputAuxiliar.removeEventListener("input", checkKeyPress, false);
        inputAuxiliar.focus();
    }
};

function dibujarHorca(x, y) {
    for (let i = 0; i < letrasMalIngresadas.length + 1; i++) {

        if (i == 0) {

            //ESTA ES LA PARTE DONDE SE DA COMIENZO A DAR LOS ATRIBUTOS CORRESPONDIENTES AL AHORCADO

            // Color y tamaño de la línea
            context.strokeStyle = "#0A3871";
            context.lineWidth = 8;

            // Línea
            context.moveTo(x * .200, y);
            context.lineTo(x * .800, y);
            context.stroke();
            // Base 
            context.moveTo(x * .250, y);
            context.lineTo(x * .300, y * .900);
            context.lineTo(x * .350, y);
            context.stroke();
        }

        if (i == 1) {
            context.lineWidth = 2;

            // Dibujar el poste
            context.moveTo(x * .300, y * .900);
            context.lineTo(x * .300, y * .100);
            context.stroke();
        }

        if (i == 2) {
            // Dibujar la cimentación
            context.moveTo(x * .300, y * .100);
            context.lineTo(x * .700, y * .100);
            context.stroke();
        }

        if (i == 3) {
            context.lineWidth = 1;

            // Dibuja "lazo"
            context.moveTo(x * .7, y * .1);
            context.lineTo(x * .7, y * .25);
            context.stroke();
        }

        if (i == 4) {
            context.lineWidth = 2;

            // Se comienza a dibujar la cabeza
            context.beginPath();
            context.arc(x * .7, y * .321, y * .075, 0, 2 * Math.PI);
            context.stroke();
        }

        if (i == 5) {
            // Se comienza a dibujar el tronco
            context.moveTo(x * .7, y * .395);
            context.lineTo(x * .7, y * .55);
            context.stroke();
        }

        if (i == 6) {
            // Se comienza a dibujar la mano izquierda
            context.moveTo(x * .7, y * .4);
            context.lineTo(x * .680, y * .5);
            context.stroke();
        }

        if (i == 7) {
            // Se comienza a dibujar la mano derecha
            context.moveTo(x * .7, y * .4);
            context.lineTo(x * .720, y * .5);
            context.stroke()
        }

        if (i == 8) {
            // Se comienza a dibujar el pie izquierdo
            context.moveTo(x * .7, y * .55);
            context.lineTo(x * .675, y * .7);
            context.stroke();
        }

        if (i == 9) {
            // Se comienza a dibujar el pie derecho
            context.moveTo(x * .7, y * .55);
            context.lineTo(x * .725, y * .7);
            context.stroke();

            mostrarFrase(context.canvas.width, context.canvas.height, "¡El Juego ha finalizado, intenta una vez más!", "30px Inter", "red");
            inputAuxiliar.removeEventListener("input", checkKeyPress, false);
            inputAuxiliar.blur();
        }
    }
}

function hacerLineas(x, y, cant) {

    for (let i = 0; i < cant; i++) {

        context.moveTo(x, y);
        context.lineTo(x + 30, y);
        context.stroke();

        x += 35;
    }

}

function mostrarLetras(x, y, letras, formatoLetras, color) {
    for (let i = 0; i < letras.length; i++) {
        const letra = letras[i];

        context.font = formatoLetras;
        context.fillStyle = color;
        context.textAlign = "center";
        context.fillText(letra, x + 15, y - 10);

        x += 35;
    }
}

function mostrarFrase(x, y, frase, formato, color) {
    context.font = formato;
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(frase, x / 2, y / 2);
}

window.addEventListener("resize", render);
render();
