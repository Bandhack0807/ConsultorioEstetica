const imagenInicio = document.getElementById("imagenInicio");

const botonAnterior = document.getElementById("anteriorInicio");

const botonSiguiente = document.getElementById("siguienteInicio");


const imagenes = [

    "img/banner.png",

    "img/tratamiento1.png",

    "img/tratamiento2.png"

];


let imagenActual = 0;


/* ============================= */
/* CAMBIAR IMAGEN */
/* ============================= */

function cambiarImagen(){

    imagenInicio.classList.add("cambiando");


    setTimeout(() => {

        imagenInicio.src = imagenes[imagenActual];

        imagenInicio.classList.remove("cambiando");

    }, 400);

}


/* ============================= */
/* SIGUIENTE */
/* ============================= */

botonSiguiente.addEventListener("click", () => {

    imagenActual++;


    if(imagenActual >= imagenes.length){

        imagenActual = 0;

    }


    cambiarImagen();

});


/* ============================= */
/* ANTERIOR */
/* ============================= */

botonAnterior.addEventListener("click", () => {

    imagenActual--;


    if(imagenActual < 0){

        imagenActual = imagenes.length - 1;

    }


    cambiarImagen();

});