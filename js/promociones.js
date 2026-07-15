const promociones = [

    {

        nombre: "Limpieza Facial",

        descripcion:
        "Incluye valoración dermatológica y limpieza profunda.",

        imagen: "img/tratamiento1.png",

        etiqueta: "20% OFF",

        precioAnterior: "$850",

        precioActual: "$680"

    },

    {

        nombre: "Radiofrecuencia",

        descripcion:
        "Lleva dos sesiones pagando solamente una.",

        imagen: "img/banner.png",

        etiqueta: "2x1",

        precioAnterior: "$1,600",

        precioActual: "$800"

    },

    {

        nombre: "Consulta Inicial",

        descripcion:
        "Valoración completamente gratuita para nuevos pacientes.",

        imagen: "img/consultorio.png",

        etiqueta: "GRATIS",

        precioAnterior: "$500",

        precioActual: "$0"

    }

];


let indicePromocion = 0;


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



function crearIndicadores(){

    promociones.forEach((promocion, indice) => {

        const indicador =
        document.createElement("div");


        indicador.classList.add("indicador");


        indicador.addEventListener("click", () => {

            indicePromocion = indice;

            mostrarPromocion();

        });


        indicadoresPromociones.appendChild(indicador);

    });

}



function mostrarPromocion(){

    const promocion =
    promociones[indicePromocion];


    promocionPrincipal.classList.remove("animacion");


    void promocionPrincipal.offsetWidth;


    promocionPrincipal.classList.add("animacion");


    imagenPromocion.src =
    promocion.imagen;


    nombrePromocion.textContent =
    promocion.nombre;


    descripcionPromocion.textContent =
    promocion.descripcion;


    etiquetaPromocion.textContent =
    promocion.etiqueta;


    precioAnterior.textContent =
    promocion.precioAnterior;


    precioActual.textContent =
    promocion.precioActual;


    const mensaje =
    `Hola, me interesa la promoción de ${promocion.nombre} (${promocion.etiqueta}). Me gustaría recibir más información.`;


    botonPromocion.href =
    `https://wa.me/5217641098535?text=${encodeURIComponent(mensaje)}`;


    actualizarIndicadores();

}



function actualizarIndicadores(){

    const indicadores =
    document.querySelectorAll(
        "#indicadoresPromociones .indicador"
    );


    indicadores.forEach((indicador, indice) => {

        indicador.classList.toggle(
            "activo",
            indice === indicePromocion
        );

    });

}



promoSiguiente.addEventListener("click", () => {

    indicePromocion++;


    if(indicePromocion >= promociones.length){

        indicePromocion = 0;

    }


    mostrarPromocion();

});



promoAnterior.addEventListener("click", () => {

    indicePromocion--;


    if(indicePromocion < 0){

        indicePromocion =
        promociones.length - 1;

    }


    mostrarPromocion();

});



crearIndicadores();

mostrarPromocion();