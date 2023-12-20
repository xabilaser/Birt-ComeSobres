'use strict'
//Construimos el escenario desde la matriz del laberinto
//Laberinto: 0: pasillo vacío, 1:muros, 2:pasillo con sobre, 3:salida.
var array_laberinto = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1],
    [1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Variables del juego
const puntuacion = $('#puntos');
const record = $('#total');
var gameover = true;
var enJuego = false;

//variables para divs
const contenedor = $('#container');
const feijoo = new Prota ($('#prota'), 536, 458);
var feijooDiv = $('#prota');
const murallas = new Muros;
const mordidas = new Muros;
var yolanda = $('#yolanda');
var iglesias = $('#iglesias');
var ayuso = $('#ayuso');

//variables para casillas de tablero
var celda = $('.celda');
var muro = $('.muro');

// Variables para el movimiento de los personajes.
var tiempo;

//Función para el intervalo de salida de personajes
function temporizador(funcionConRetraso, miliSeg) {
  tiempo = setTimeout(funcionConRetraso, miliSeg);
}

$( document ).ready(function() {
    // resetMarca();
    inicializaMarca();
    pintarMapa();
    temporizador(movimientoProta(), 3000);
    // movimientoProta();
    // console.log(feijoo.getX() + " / " + feijoo.getY());
});

//Recorrer la variable mapa para rellenar con una div.muro cada pieza del muro
function pintarMapa(){  
    var celdasX = 0;
    var celdasY = 60;
    for(var i = 0; i < 16; i++){
        for(var j = 0; j < 24; j++){
            if (array_laberinto[i][j] == 1){
                var celda = document.createElement("div"); 
                let k = i + 1;
                let l = j + 1;
                let estiloDiv = "grid-colum: " + l + " / " + l + "; grid-row: " + k + " / " + k + ";";
                let idCelda = "M-" + k + "-" + l;
                celdasX += 48;
                murallas.agregarMuro(idCelda, celdasX, celdasY);
                celda.classList.add("muro");
                celda.id = idCelda;
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
            } else if (array_laberinto[i][j] == 3){
                var celda= document.createElement("div"); 
                let k = i + 1;
                let l = j + 1;
                let estiloDiv = "grid-colum: " + l + " / " + l + "; grid-row: " + k + " / " + k + ";";
                let idCelda = "P-" + k + "-" + l;
                celdasX += 48;
                celda.id = idCelda;
                celda.classList.add("puerta");
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
            } else if (array_laberinto[i][j] == 2){
                var celda= document.createElement("div"); 
                let k = i + 1;
                let l = j + 1;
                let estiloDiv = "grid-colum: " + l + " / " + l + "; grid-row: " + k + " / " + k + ";";
                let idCelda = "S-" + k + "-" + l;
                celdasX += 48;
                celda.id = idCelda;
                mordidas.agregarMuro(idCelda, celdasX, celdasY);
                celda.classList.add("sobre");
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
            } else if (array_laberinto[i][j] == 0){
                var celda= document.createElement("div"); 
                let k = i + 1;
                let l = j + 1;
                let estiloDiv = "grid-colum: " + l + " / " + l + "; grid-row: " + k + " / " + k + ";";
                celdasX += 48;
                celda.classList.add("celda");
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
            }
        }
        celdasX = 0;
        celdasY += 48;
    }
    console.log(murallas);
    console.log(mordidas);
}

//Funciones para detectar muros en las cuatro direcciones que se puede mover el prota
function checkMuroLeft(avatar) {
    var posX = avatar.getX();
    var posY = avatar.getY();
    for (let i = 0; i < 48; i++) {
        posX -= 1;
        for (let i = 0; i < murallas.arrayMuros.length; i++){
            if (murallas.getXPos(i) === posX && murallas.getYPos(i) === posY) {
                return true;
            }
        }
    return false;
    }
}

function checkMuroRight(avatar) {
    var posX = avatar.getX();
    var posY = avatar.getY();
    for (let i = 0; i < 48; i++) {
        posX += 1;
        for (let i = 0; i < murallas.arrayMuros.length; i++){
            if (murallas.getXPos(i) === posX && murallas.getYPos(i) === posY) {
                return true;
            }
        }
    }
    return false;
}

function checkMuroTop(avatar) {
    var posX = avatar.getX();
    var posY = avatar.getY();
    for (let i = 0; i < 48; i++) {
        posY -= 1;
        for (let i = 0; i < murallas.arrayMuros.length; i++){
            if (murallas.getXPos(i) === posX && murallas.getYPos(i) === posY) {
                return true;
            }
        }
    }
    return false;
}

function checkMuroDown(avatar) {
    var posX = avatar.getX();
    var posY = avatar.getY();
    for (let i = 0; i < 48; i++) {
        posY += 1;
        for (let i = 0; i < murallas.arrayMuros.length; i++){
            if (murallas.getXPos(i) === posX && murallas.getYPos(i) === posY) {
                console.log("choque con bloque ID: " + murallas.getIdPos(i));
                return true;
            }
        }
    }
    return false;
}

//Inicializar marcador
function inicializaMarca() {
    puntuacion.append(0);
}