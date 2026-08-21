/*=========================================
        CATÁLOGO DE TRATAMIENTOS
        MYSQL → API → CARRUSEL
=========================================*/


/*
    Arreglo donde guardaremos
    los tratamientos provenientes
    de MySQL.
*/

let tratamientos = [];


/*
    Índice del tratamiento actual.
*/

let indiceActual = 0;


/*=========================================
        ELEMENTOS DEL HTML
=========================================*/

const imagenTratamiento =
document.getElementById("imagenTratamiento");


const nombreTratamiento =
document.getElementById("nombreTratamiento");


const descripcionTratamiento =
document.getElementById("descripcionTratamiento");


const botonInformacion =
document.getElementById("botonInformacion");


const anterior =
document.getElementById("anterior");


const siguiente =
document.getElementById("siguiente");


const indicadores =
document.getElementById("indicadores");


const tratamiento =
document.querySelector(".tratamiento");


/*=========================================
        CARGAR TRATAMIENTOS
        GET → MYSQL
=========================================*/

function cargarTratamientos(){

    /*
        Consultamos la API.
    */

    fetch(
        "/ConsultorioEstetica/api/tratamientos.php"
    )


    .then(response => {

        /*
            Verificar respuesta HTTP.
        */

        if(!response.ok){

            throw new Error(
                "Error HTTP: " +
                response.status
            );

        }


        return response.json();

    })


    .then(data => {

        /*
            Mostrar respuesta en consola.
        */

        console.log(
            "Respuesta GET tratamientos:",
            data
        );


        /*
            Verificar si la API respondió correctamente.
        */

        if(data.success){

            /*
                Guardamos los tratamientos
                provenientes de MySQL.
            */

            tratamientos =
            data.tratamientos || [];


            /*
                Reiniciar índice.
            */

            indiceActual = 0;


            /*
                Limpiar indicadores anteriores.
            */

            indicadores.innerHTML = "";


            /*
                Verificar si existen tratamientos.
            */

            if(tratamientos.length === 0){

                nombreTratamiento.textContent =
                "No hay tratamientos disponibles";


                descripcionTratamiento.textContent =
                "Actualmente no hay tratamientos registrados.";


                imagenTratamiento.src =
                "img/consultorio.png";


                botonInformacion.href =
                "#";


                return;

            }


            /*
                Crear los indicadores
                dinámicamente.
            */

            crearIndicadores();


            /*
                Mostrar el primer tratamiento.
            */

            mostrarTratamiento();

        }

        else{

            console.error(

                "Error al cargar tratamientos:",

                data.message

            );

        }

    })


    .catch(error => {

        console.error(

            "Error de conexión con la API:",

            error

        );


        nombreTratamiento.textContent =
        "No se pudieron cargar los tratamientos";


        descripcionTratamiento.textContent =
        "No fue posible conectar con el servidor.";


    });

}


/*=========================================
        CREAR INDICADORES
=========================================*/

function crearIndicadores(){

    /*
        Limpiar indicadores.
    */

    indicadores.innerHTML = "";


    /*
        Crear un indicador
        por cada tratamiento.
    */

    tratamientos.forEach(

        (datos, indice) => {

            const indicador =
            document.createElement("div");


            indicador.classList.add(
                "indicador"
            );


            /*
                Al hacer clic,
                mostrar ese tratamiento.
            */

            indicador.addEventListener(
                "click",
                () => {

                    indiceActual =
                    indice;


                    mostrarTratamiento();

                }
            );


            indicadores.appendChild(
                indicador
            );

        }

    );

}


/*=========================================
        MOSTRAR TRATAMIENTO
=========================================*/

function mostrarTratamiento(){

    /*
        Verificar que existan tratamientos.
    */

    if(tratamientos.length === 0){

        return;

    }


    /*
        Obtener tratamiento actual.
    */

    const datos =
    tratamientos[indiceActual];


    /*
        Animación.
    */

    tratamiento.classList.remove(
        "animacion"
    );


    void tratamiento.offsetWidth;


    tratamiento.classList.add(
        "animacion"
    );


    /*
        Imagen.
        
        MySQL devuelve algo como:

        img/tratamiento1.png

        Por eso agregamos:

        /ConsultorioEstetica/
    */

    imagenTratamiento.src =
    "/ConsultorioEstetica/" +
    datos.imagen;


    /*
        Nombre.
    */

    nombreTratamiento.textContent =
    datos.nombre;


    /*
        Descripción.
    */

    descripcionTratamiento.textContent =
    datos.descripcion;


    /*
        Crear mensaje para WhatsApp.
    */

    const mensaje =

    `Hola, me gustaría solicitar información sobre el tratamiento de ${datos.nombre}.`;


    /*
        Actualizar botón.
    */

    botonInformacion.href =

    `https://wa.me/5217641098535?text=${encodeURIComponent(mensaje)}`;


    /*
        Actualizar indicadores.
    */

    actualizarIndicadores();

}


/*=========================================
        ACTUALIZAR INDICADORES
=========================================*/

function actualizarIndicadores(){

    const puntos =

    document.querySelectorAll(
        "#indicadores .indicador"
    );


    puntos.forEach(

        (punto, indice) => {

            punto.classList.toggle(

                "activo",

                indice === indiceActual

            );

        }

    );

}


/*=========================================
        SIGUIENTE
=========================================*/

siguiente.addEventListener(

    "click",

    () => {

        /*
            Si todavía no cargaron
            los tratamientos,
            no hacer nada.
        */

        if(tratamientos.length === 0){

            return;

        }


        indiceActual++;


        /*
            Regresar al primero
            al llegar al final.
        */

        if(
            indiceActual >=
            tratamientos.length
        ){

            indiceActual = 0;

        }


        mostrarTratamiento();

    }

);


/*=========================================
        ANTERIOR
=========================================*/

anterior.addEventListener(

    "click",

    () => {

        /*
            Si no hay tratamientos,
            no hacer nada.
        */

        if(tratamientos.length === 0){

            return;

        }


        indiceActual--;


        /*
            Ir al último
            si estamos en el primero.
        */

        if(indiceActual < 0){

            indiceActual =
            tratamientos.length - 1;

        }


        mostrarTratamiento();

    }

);


/*=========================================
        INICIAR
=========================================*/

cargarTratamientos();