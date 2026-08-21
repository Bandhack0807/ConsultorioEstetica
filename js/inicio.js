/*=========================================
        CARRUSEL INICIO
        MYSQL → API
=========================================*/


const imagenInicio =
document.getElementById("imagenInicio");


const botonAnterior =
document.getElementById("anteriorInicio");


const botonSiguiente =
document.getElementById("siguienteInicio");



/*
    Imágenes del carrusel.

    La primera imagen será siempre
    el banner principal.

    Las demás se obtendrán desde
    MySQL.
*/

let imagenes = [

    "img/banner.png"

];


let imagenActual = 0;



/*=========================================
        CARGAR TRATAMIENTOS
        GET → MYSQL
=========================================*/

function cargarImagenes(){

    fetch(
        "/ConsultorioEstetica/api/tratamientos.php"
    )


    .then(response => {

        if(!response.ok){

            throw new Error(
                "Error HTTP: "
                + response.status
            );

        }

        return response.json();

    })


    .then(data => {

        console.log(
            "Tratamientos obtenidos para Inicio:",
            data
        );


        if(data.success){

            /*
                Agregamos las imágenes
                provenientes de MySQL.
            */

            const tratamientos =
            data.tratamientos || [];


            tratamientos.forEach(
                function(tratamiento){

                    if(tratamiento.imagen){

                        imagenes.push(
                            tratamiento.imagen
                        );

                    }

                }
            );


            /*
                Mostrar la primera imagen.
            */

            imagenInicio.src =
            "/ConsultorioEstetica/"
            + imagenes[0];

        }

        else{

            console.error(
                "No se pudieron cargar los tratamientos:",
                data.message
            );

        }

    })


    .catch(error => {

        console.error(
            "Error al obtener tratamientos:",
            error
        );

    });

}



/*=========================================
        CAMBIAR IMAGEN
=========================================*/

function cambiarImagen(){

    imagenInicio.classList.add(
        "cambiando"
    );


    setTimeout(() => {

        imagenInicio.src =
        "/ConsultorioEstetica/"
        + imagenes[imagenActual];


        imagenInicio.classList.remove(
            "cambiando"
        );

    }, 400);

}



/*=========================================
        SIGUIENTE
=========================================*/

botonSiguiente.addEventListener(
    "click",
    () => {

        imagenActual++;


        if(
            imagenActual >= imagenes.length
        ){

            imagenActual = 0;

        }


        cambiarImagen();

    }
);



/*=========================================
        ANTERIOR
=========================================*/

botonAnterior.addEventListener(
    "click",
    () => {

        imagenActual--;


        if(imagenActual < 0){

            imagenActual =
            imagenes.length - 1;

        }


        cambiarImagen();

    }
);



/*=========================================
        INICIAR
=========================================*/

cargarImagenes();