/*=========================================
        VARIABLES GLOBALES
=========================================*/

let promociones = [];

let indicePromocion = 0;


/*=========================================
        ELEMENTOS DEL HTML
=========================================*/

const imagenPromocion =
document.getElementById("imagenPromocion");


const nombrePromocion =
document.getElementById("nombrePromocion");


const descripcionPromocion =
document.getElementById("descripcionPromocion");


const etiquetaPromocion =
document.getElementById("etiquetaPromocion");


const precioAnterior =
document.getElementById("precioAnterior");


const precioActual =
document.getElementById("precioActual");


const botonPromocion =
document.getElementById("botonPromocion");


const promoAnterior =
document.getElementById("promoAnterior");


const promoSiguiente =
document.getElementById("promoSiguiente");


const indicadoresPromociones =
document.getElementById("indicadoresPromociones");


const promocionPrincipal =
document.querySelector(".promocion-principal");


/*=========================================
        CARGAR PROMOCIONES
        GET → MYSQL
=========================================*/

function cargarPromociones(){

    /*
        Consultamos directamente
        la API de promociones.
    */

    fetch("/ConsultorioEstetica/api/promociones.php")

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Error HTTP: " + response.status
            );

        }

        return response.json();

    })

    .then(data => {

        console.log(
            "Promociones obtenidas desde MySQL:",
            data
        );


        if(!data.success){

            throw new Error(
                data.message ||
                "No se pudieron cargar las promociones."
            );

        }


        /*
            Guardamos las promociones
            provenientes de MySQL.
        */

        promociones =
        data.promociones || [];


        /*
            Reiniciamos el carrusel.
        */

        indicePromocion = 0;


        /*
            Limpiamos los indicadores
            anteriores.
        */

        indicadoresPromociones.innerHTML = "";


        /*
            Si no existen promociones.
        */

        if(promociones.length === 0){

            mostrarSinPromociones();

            return;

        }


        /*
            Crear indicadores.
        */

        crearIndicadores();


        /*
            Mostrar primera promoción.
        */

        mostrarPromocion();

    })

    .catch(error => {

        console.error(
            "Error al cargar promociones:",
            error
        );


        mostrarErrorPromociones();

    });

}


/*=========================================
        CREAR INDICADORES
=========================================*/

function crearIndicadores(){

    indicadoresPromociones.innerHTML = "";


    promociones.forEach(
        (promocion, indice) => {

            const indicador =
            document.createElement("div");


            indicador.classList.add(
                "indicador"
            );


            indicador.addEventListener(
                "click",
                () => {

                    indicePromocion =
                    indice;

                    mostrarPromocion();

                }
            );


            indicadoresPromociones.appendChild(
                indicador
            );

        }
    );

}


/*=========================================
        MOSTRAR PROMOCIÓN
=========================================*/

function mostrarPromocion(){

    /*
        Verificar que existan promociones.
    */

    if(
        promociones.length === 0
    ){

        return;

    }


    const promocion =
    promociones[indicePromocion];


    /*
        Animación del carrusel.
    */

    promocionPrincipal.classList.remove(
        "animacion"
    );


    void promocionPrincipal.offsetWidth;


    promocionPrincipal.classList.add(
        "animacion"
    );


    /*
        IMAGEN
    */

    imagenPromocion.src =
    "/ConsultorioEstetica/" +
    promocion.imagen;


    imagenPromocion.alt =
    promocion.nombre;


    /*
        NOMBRE
    */

    nombrePromocion.textContent =
    promocion.nombre;


    /*
        DESCRIPCIÓN
    */

    descripcionPromocion.textContent =
    promocion.descripcion;


    /*
        ETIQUETA

        Como la base de datos actualmente
        solamente guarda el precio,
        utilizamos una etiqueta general.
    */

    etiquetaPromocion.textContent =
    "PROMOCIÓN";


    /*
        PRECIO

        Actualmente MySQL guarda
        solamente un precio.
    */

    precioAnterior.textContent =
    "";


    precioActual.textContent =
    "$" +
    Number(promocion.precio)
    .toFixed(2);


    /*
        MENSAJE DE WHATSAPP
    */

    const mensaje =
    `Hola, me interesa la promoción de ${promocion.nombre} con precio de $${Number(promocion.precio).toFixed(2)}. Me gustaría recibir más información.`;


    botonPromocion.href =
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

    const indicadores =
    document.querySelectorAll(
        "#indicadoresPromociones .indicador"
    );


    indicadores.forEach(
        (indicador, indice) => {

            indicador.classList.toggle(

                "activo",

                indice === indicePromocion

            );

        }
    );

}


/*=========================================
        BOTÓN SIGUIENTE
=========================================*/

promoSiguiente.addEventListener(
    "click",
    () => {

        if(promociones.length === 0){

            return;

        }


        indicePromocion++;


        if(
            indicePromocion >=
            promociones.length
        ){

            indicePromocion = 0;

        }


        mostrarPromocion();

    }
);


/*=========================================
        BOTÓN ANTERIOR
=========================================*/

promoAnterior.addEventListener(
    "click",
    () => {

        if(promociones.length === 0){

            return;

        }


        indicePromocion--;


        if(indicePromocion < 0){

            indicePromocion =
            promociones.length - 1;

        }


        mostrarPromocion();

    }
);


/*=========================================
        SIN PROMOCIONES
=========================================*/

function mostrarSinPromociones(){

    nombrePromocion.textContent =
    "No hay promociones disponibles";


    descripcionPromocion.textContent =
    "Actualmente no contamos con promociones registradas.";


    imagenPromocion.src =
    "/ConsultorioEstetica/img/tratamiento1.png";


    etiquetaPromocion.textContent =
    "";


    precioAnterior.textContent =
    "";


    precioActual.textContent =
    "";


    botonPromocion.style.display =
    "none";


    promoAnterior.style.display =
    "none";


    promoSiguiente.style.display =
    "none";

}


/*=========================================
        ERROR AL CARGAR
=========================================*/

function mostrarErrorPromociones(){

    nombrePromocion.textContent =
    "No se pudieron cargar las promociones";


    descripcionPromocion.textContent =
    "Ocurrió un problema al consultar las promociones. Intenta nuevamente más tarde.";


    etiquetaPromocion.textContent =
    "";


    precioAnterior.textContent =
    "";


    precioActual.textContent =
    "";


    botonPromocion.style.display =
    "none";

}


/*=========================================
        INICIAR SISTEMA
=========================================*/

cargarPromociones();