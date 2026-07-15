const tratamientos = [

    {

        nombre: "Limpieza Facial",

        descripcion:
        "Elimina impurezas, puntos negros y células muertas, dejando una piel más limpia, hidratada y saludable.",

        imagen: "img/tratamiento1.png"

    },

    {

        nombre: "Botox",

        descripcion:
        "Reduce líneas de expresión y arrugas de forma segura, ayudando a obtener una apariencia más fresca y natural.",

        imagen: "img/tratamiento2.png"

    },

    {

        nombre: "Peeling Facial",

        descripcion:
        "Renueva las capas superficiales de la piel, mejorando su textura, luminosidad y apariencia general.",

        imagen: "img/tratamiento3.png"

    }

];


let indiceActual = 0;


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



function crearIndicadores(){

    tratamientos.forEach((tratamiento, indice) => {

        const indicador =
        document.createElement("div");

        indicador.classList.add("indicador");


        indicador.addEventListener("click", () => {

            indiceActual = indice;

            mostrarTratamiento();

        });


        indicadores.appendChild(indicador);

    });

}



function mostrarTratamiento(){

    const datos =
    tratamientos[indiceActual];


    tratamiento.classList.remove("animacion");


    void tratamiento.offsetWidth;


    tratamiento.classList.add("animacion");


    imagenTratamiento.src =
    datos.imagen;


    nombreTratamiento.textContent =
    datos.nombre;


    descripcionTratamiento.textContent =
    datos.descripcion;


    const mensaje =
    `Hola, me gustaría solicitar información sobre el tratamiento de ${datos.nombre}.`;


    botonInformacion.href =
    `https://wa.me/5217641098535?text=${encodeURIComponent(mensaje)}`;


    actualizarIndicadores();

}



function actualizarIndicadores(){

    const puntos =
    document.querySelectorAll(".indicador");


    puntos.forEach((punto, indice) => {

        punto.classList.toggle(
            "activo",
            indice === indiceActual
        );

    });

}



siguiente.addEventListener("click", () => {

    indiceActual++;


    if(indiceActual >= tratamientos.length){

        indiceActual = 0;

    }


    mostrarTratamiento();

});



anterior.addEventListener("click", () => {

    indiceActual--;


    if(indiceActual < 0){

        indiceActual =
        tratamientos.length - 1;

    }


    mostrarTratamiento();

});



crearIndicadores();

mostrarTratamiento();