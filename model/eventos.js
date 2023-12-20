// document.addEventListener('DOMContentLoaded', iniciarJuego);

function movimientoProta(){
    var ejeX = 536;
    var ejeY= 452;
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "ArrowUp":
                if (!checkMuroTop(feijoo)){;
                    ejeY -= 12;
                    detectaSobres();
                } 
                break;
            case "ArrowDown":
                if (!checkMuroDown(feijoo)){;
                    ejeY += 12;
                    detectaSobres();
                }
                break;
            case "ArrowLeft":
                if (!checkMuroLeft(feijoo)){;
                    ejeX -= 12;
                    detectaSobres();
                }    
                break;
            case "ArrowRight":
                if (!checkMuroRight(feijoo)){;
                    ejeX += 12;
                    detectaSobres();
                } 
                break;
        }
        actualizaPosicion(feijoo, feijooDiv, ejeX, ejeY);
        console.log(feijoo);
    });
}

function actualizaPosicion(avatar, avatarDiv, x, y) {
    avatarDiv.css({"position": "absolute", "left": + x + "px", "top": + y + "px"});
    avatar.setX(x);
    avatar.setY(y);
    avatar.setpmX(x);
    avatar.setpmY(y);
}

//Función para detectar coincidencia con sobres y recogerlos
function detectaSobres(){
    let centroProtaX = feijoo.getpmX() + 24;
    let centroProtaY = feijoo.getpmY() + 24;
    for (let i = 0; i < mordidas.arrayMuros.length; i++){
        let centroSobreX = mordidas.getXPos(i) + 24;
        let centroSobreY = mordidas.getYPos(i) + 24;
        if (centroProtaX === centroSobreX && centroProtaY === centroSobreY){
            let posPunto = mordidas.getIdPos(i);
            puntos += 1;
            $(posPunto).attr("class", "celda");
        }
    } 
}