// document.addEventListener('DOMContentLoaded', iniciarJuego);

function movimientoProta(){
    var ejeX = 536;
    var ejeY= 452;
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "ArrowUp":
                if (!checkMuroTop()){;
                    ejeY -= 12;
                    break;
                } else {break;}
            case "ArrowDown":
                if (!checkMuroDown()){;
                    ejeY += 12;
                    break;
                } else {break;}
            case "ArrowLeft":
                if (!checkMuroLeft()){;
                    ejeX -= 12;
                    break;
                } else {break;}
            case "ArrowRight":
                if (!checkMuroRight()){;
                    ejeX += 12;
                    break;
                } else {break;}
        }
        feijooDiv.css({"position": "absolute", "left": + ejeX + "px", "top": + ejeY + "px"});
        feijoo.setX(ejeX);
        feijoo.setY(ejeY);
        console.log(feijoo);
    });
}