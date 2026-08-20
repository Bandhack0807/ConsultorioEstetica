/*=========================================
            VARIABLES GLOBALES
=========================================*/

/*
    TRATAMIENTOS
    -----------------------------------------
    Ahora los tratamientos se obtienen
    directamente desde MySQL mediante la API.
*/

let tratamientos = [];


/*
    PROMOCIONES Y CONSULTAS
    -----------------------------------------
    Por ahora continúan utilizando localStorage.
    Posteriormente las conectaremos con MySQL.
*/

let promociones = [];

let consultas =
JSON.parse(localStorage.getItem("consultas")) || [];


/*
    ÍNDICES PARA EDICIÓN
*/

let indiceEditarTratamiento = -1;
let indiceEditarPromocion = -1;
let indiceEditarConsulta = -1;


/*=========================================
        INICIALIZAR SISTEMA
=========================================*/

window.onload = function(){

    mostrarSeccion("inicio");

    cargarTratamientos();

    cargarPromociones();

    cargarConsultas();

};


/*=========================================
        CAMBIAR SECCIONES
=========================================*/

function mostrarSeccion(id){

    document
    .querySelectorAll("main section")
    .forEach(seccion => {

        seccion.classList.add("oculto");

    });


    document
    .getElementById(id)
    .classList.remove("oculto");

}


/*=========================================
        DASHBOARD
=========================================*/

function actualizarDashboard(){

    document
    .getElementById("totalTratamientos")
    .innerHTML = tratamientos.length;


    document
    .getElementById("totalPromociones")
    .innerHTML = promociones.length;


    document
    .getElementById("totalConsultas")
    .innerHTML = consultas.length;

}


/*=========================================
        MODAL TRATAMIENTOS
=========================================*/

function abrirFormulario(){

    indiceEditarTratamiento = -1;


    document
    .getElementById("tituloModal")
    .innerHTML = "Nuevo Tratamiento";


    document
    .getElementById("nombre")
    .value = "";


    document
    .getElementById("descripcion")
    .value = "";


    document
    .getElementById("imagen")
    .selectedIndex = 0;


    document
    .getElementById("modal")
    .style.display = "flex";

}


function cerrarModal(){

    document
    .getElementById("modal")
    .style.display = "none";

}


/*=========================================
        GUARDAR TRATAMIENTO
        POST / PUT → MYSQL
=========================================*/

function guardarTratamiento(){

    let nombre =
    document
    .getElementById("nombre")
    .value
    .trim();


    let descripcion =
    document
    .getElementById("descripcion")
    .value
    .trim();


    let imagen =
    document
    .getElementById("imagen")
    .value;


    /*
        Validar campos
    */

    if(
        nombre === "" ||
        descripcion === ""
    ){

        alert(
            "Complete todos los campos."
        );

        return;

    }


    /*
        Determinar si estamos:

        - Creando → POST
        - Editando → PUT
    */

    let metodo;

    let datos;


    if(indiceEditarTratamiento === -1){

        /*
            NUEVO TRATAMIENTO
        */

        metodo = "POST";

        datos = {

            nombre: nombre,

            descripcion: descripcion,

            imagen: imagen

        };

    }

    else{

        /*
            EDITAR TRATAMIENTO
        */

        metodo = "PUT";

        datos = {

            id: indiceEditarTratamiento,

            nombre: nombre,

            descripcion: descripcion,

            imagen: imagen

        };

    }


    /*
        Enviar información a la API
    */

    fetch(
        "/ConsultorioEstetica/api/tratamientos.php",
        {

            method: metodo,

            headers: {

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(datos)

        }
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

        if(data.success){

            /*
                Mensaje dependiendo
                de la operación.
            */

            if(metodo === "POST"){

                alert(
                    "Tratamiento agregado correctamente."
                );

            }

            else{

                alert(
                    "Tratamiento actualizado correctamente."
                );

            }


            /*
                Cerrar modal
            */

            cerrarModal();


            /*
                Regresar el índice
                a su estado inicial.
            */

            indiceEditarTratamiento = -1;


            /*
                Volver a consultar MySQL
                para mostrar los datos actualizados.
            */

            cargarTratamientos();

        }

        else{

            alert(

                "Error: "
                + data.message

            );

        }

    })


    .catch(error => {

        console.error(

            "Error de conexión con la API:",

            error

        );


        alert(

            "No se pudo conectar con el servidor."

        );

    });

}


/*=========================================
        CARGAR TRATAMIENTOS
        GET → MYSQL
=========================================*/

function cargarTratamientos(){

    let tabla =
    document.getElementById("tablaTratamientos");


    /*
        Mostrar mensaje mientras
        consultamos MySQL.
    */

    tabla.innerHTML = `

        <tr>

            <td colspan="4">

                Cargando tratamientos...

            </td>

        </tr>

    `;


    fetch("/ConsultorioEstetica/api/tratamientos.php")


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
            "Respuesta GET tratamientos:",
            data
        );


        if(data.success){

            /*
                Guardamos los tratamientos
                provenientes directamente
                de MySQL.
            */

            tratamientos =
            data.tratamientos || [];


            /*
                Limpiar tabla.
            */

            tabla.innerHTML = "";


            /*
                Actualizar contador
                DESPUÉS de recibir MySQL.
            */

            actualizarDashboard();


            /*
                Si no existen tratamientos.
            */

            if(tratamientos.length === 0){

                tabla.innerHTML = `

                    <tr>

                        <td colspan="4">

                            No hay tratamientos registrados.

                        </td>

                    </tr>

                `;

                return;

            }


            /*
                Mostrar tratamientos.
            */

            tratamientos.forEach(function(t){

                /*
                    MySQL devuelve:

                    img/tratamiento1.png

                    Por eso agregamos:

                    /ConsultorioEstetica/
                */

                let rutaImagen =
                "/ConsultorioEstetica/" + t.imagen;


                tabla.innerHTML += `

                    <tr>

                        <td>

                            <img
                                src="${rutaImagen}"
                                alt="${t.nombre}"
                            >

                        </td>


                        <td>

                            ${t.nombre}

                        </td>


                        <td>

                            ${t.descripcion}

                        </td>


                        <td>

                            <button
                                onclick="editarTratamiento(${t.id})"
                                title="Editar"
                            >

                                <i class="fas fa-edit"></i>

                            </button>


                            <button
                                onclick="eliminarTratamiento(${t.id})"
                                title="Eliminar"
                            >

                                <i class="fas fa-trash"></i>

                            </button>

                        </td>

                    </tr>

                `;

            });

        }


        else{

            tratamientos = [];


            actualizarDashboard();


            tabla.innerHTML = `

                <tr>

                    <td colspan="4">

                        Error al cargar tratamientos.

                    </td>

                </tr>

            `;


            console.error(

                "Error al cargar tratamientos:",

                data.message

            );

        }

    })


    .catch(error => {

        tratamientos = [];


        actualizarDashboard();


        tabla.innerHTML = `

            <tr>

                <td colspan="4">

                    No se pudo conectar con la API.

                </td>

            </tr>

        `;


        console.error(

            "Error de conexión con la API:",

            error

        );

    });

}



/*=========================================
        EDITAR TRATAMIENTO
        PUT → MYSQL
=========================================*/

function editarTratamiento(id){

    /*
        Buscamos el tratamiento seleccionado
        dentro del arreglo obtenido desde MySQL.
    */

    let tratamiento = tratamientos.find(
        t => Number(t.id) === Number(id)
    );


    /*
        Si no encontramos el tratamiento,
        mostramos un mensaje y detenemos la función.
    */

    if(!tratamiento){

        alert(
            "No se encontró el tratamiento seleccionado."
        );

        return;

    }


    /*
        Guardamos el ID que estamos editando.
    */

    indiceEditarTratamiento = tratamiento.id;


    /*
        Cambiamos el título del modal.
    */

    document
    .getElementById("tituloModal")
    .innerHTML = "Editar Tratamiento";


    /*
        Cargamos los datos actuales.
    */

    document
    .getElementById("nombre")
    .value = tratamiento.nombre;


    document
    .getElementById("descripcion")
    .value = tratamiento.descripcion;


    document
    .getElementById("imagen")
    .value = tratamiento.imagen;


    /*
        Mostramos el modal.
    */

    document
    .getElementById("modal")
    .style.display = "flex";

}

/*=========================================
        ELIMINAR TRATAMIENTO
        DELETE → MYSQL
=========================================*/

function eliminarTratamiento(id){

    /*
        Confirmar antes de eliminar
    */

    if(
        !confirm(
            "¿Está seguro de eliminar este tratamiento?"
        )
    ){

        return;

    }


    /*
        Enviar solicitud DELETE
        a la API
    */

    fetch(
        "/ConsultorioEstetica/api/tratamientos.php",
        {

            method: "DELETE",

            headers: {

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify({

                id: id

            })

        }
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

        if(data.success){

            alert(
                "Tratamiento eliminado correctamente."
            );


            /*
                Volver a consultar MySQL
                para actualizar la tabla.
            */

            cargarTratamientos();

        }

        else{

            alert(

                "Error al eliminar tratamiento: "
                + data.message

            );

        }

    })


    .catch(error => {

        console.error(

            "Error de conexión con la API:",

            error

        );


        alert(

            "No se pudo conectar con el servidor."

        );

    });

}


/*=========================================
        MODAL PROMOCIONES
=========================================*/

function abrirFormularioPromocion(){

    indiceEditarPromocion = -1;


    document
    .getElementById("tituloPromocion")
    .innerHTML = "Nueva Promoción";


    document
    .getElementById("nombrePromocion")
    .value = "";


    document
    .getElementById("precioPromocion")
    .value = "";


    document
    .getElementById("descripcionPromocion")
    .value = "";


    document
    .getElementById("imagenPromocion")
    .selectedIndex = 0;


    document
    .getElementById("modalPromocion")
    .style.display = "flex";

}


/*=========================================
        CERRAR MODAL PROMOCIÓN
=========================================*/

function cerrarModalPromocion(){

    document
    .getElementById("modalPromocion")
    .style.display = "none";

}


/*=========================================
        GUARDAR PROMOCIÓN
        POST / PUT → MYSQL
=========================================*/

function guardarPromocion(){

    let nombre =
    document
    .getElementById("nombrePromocion")
    .value
    .trim();


    let precio =
    document
    .getElementById("precioPromocion")
    .value;


    let descripcion =
    document
    .getElementById("descripcionPromocion")
    .value
    .trim();


    let imagen =
    document
    .getElementById("imagenPromocion")
    .value;


    /*-----------------------------------------
            VALIDAR CAMPOS
    -----------------------------------------*/

    if(
        nombre === "" ||
        precio === "" ||
        descripcion === ""
    ){

        alert(
            "Complete todos los campos."
        );

        return;

    }


    /*-----------------------------------------
            DETERMINAR MÉTODO
    -----------------------------------------*/

    let metodo;

    let datos;


    /*
        NUEVA PROMOCIÓN
        ----------------
        POST → MySQL
    */

    if(indiceEditarPromocion === -1){

        metodo = "POST";


        datos = {

            nombre: nombre,

            precio: Number(precio),

            descripcion: descripcion,

            imagen: imagen

        };

    }


    /*
        EDITAR PROMOCIÓN
        ----------------
        PUT → MySQL
    */

    else{

        metodo = "PUT";


        datos = {

            id: indiceEditarPromocion,

            nombre: nombre,

            precio: Number(precio),

            descripcion: descripcion,

            imagen: imagen

        };

    }


    console.log(
        "Enviando promoción:",
        datos
    );


    /*-----------------------------------------
            ENVIAR A LA API
    -----------------------------------------*/

    fetch(
        "/ConsultorioEstetica/api/promociones.php",
        {

            method: metodo,

            headers: {

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(datos)

        }
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
            "Respuesta POST/PUT promociones:",
            data
        );


        if(data.success){

            if(metodo === "POST"){

                alert(
                    "Promoción agregada correctamente."
                );

            }

            else{

                alert(
                    "Promoción actualizada correctamente."
                );

            }


            /*
                Cerrar modal
            */

            cerrarModalPromocion();


            /*
                Reiniciar índice
            */

            indiceEditarPromocion = -1;


            /*
                Volver a consultar MySQL
            */

            cargarPromociones();

        }

        else{

            alert(

                "Error: "
                + data.message

            );

        }

    })


    .catch(error => {

        console.error(

            "Error de conexión con la API:",
            error

        );


        alert(

            "No se pudo conectar con el servidor."

        );

    });

}


/*=========================================
        CARGAR PROMOCIONES
        GET → MYSQL
=========================================*/

function cargarPromociones(){

    let tabla =
    document
    .getElementById("tablaPromociones");


    /*
        Mensaje de carga
    */

    tabla.innerHTML = `

        <tr>

            <td colspan="5">

                Cargando promociones...

            </td>

        </tr>

    `;


    /*
        CONSULTAR MYSQL
    */

    fetch(
        "/ConsultorioEstetica/api/promociones.php"
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
            "Respuesta GET promociones:",
            data
        );


        if(data.success){

            /*
                Guardamos directamente
                los datos de MySQL
            */

            promociones =
            data.promociones || [];


            /*
                Limpiar tabla
            */

            tabla.innerHTML = "";


            /*
                Actualizar contador
            */

            actualizarDashboard();


            /*
                Si no existen promociones
            */

            if(promociones.length === 0){

                tabla.innerHTML = `

                    <tr>

                        <td colspan="5">

                            No hay promociones registradas.

                        </td>

                    </tr>

                `;

                return;

            }


            /*
                Mostrar promociones
            */

            promociones.forEach(function(p){

                let rutaImagen =
                "/ConsultorioEstetica/"
                + p.imagen;


                tabla.innerHTML += `

                    <tr>

                        <td>

                            <img
                                src="${rutaImagen}"
                                alt="${p.nombre}"
                            >

                        </td>


                        <td>

                            ${p.nombre}

                        </td>


                        <td>

                            $${p.precio}

                        </td>


                        <td>

                            ${p.descripcion}

                        </td>


                        <td>

                            <button
                                onclick="editarPromocion(${p.id})"
                                title="Editar"
                            >

                                <i class="fas fa-edit"></i>

                            </button>


                            <button
                                onclick="eliminarPromocion(${p.id})"
                                title="Eliminar"
                            >

                                <i class="fas fa-trash"></i>

                            </button>

                        </td>

                    </tr>

                `;

            });

        }

        else{

            promociones = [];


            actualizarDashboard();


            tabla.innerHTML = `

                <tr>

                    <td colspan="5">

                        Error al cargar promociones.

                    </td>

                </tr>

            `;


            console.error(

                "Error al cargar promociones:",

                data.message

            );

        }

    })


    .catch(error => {

        promociones = [];


        actualizarDashboard();


        tabla.innerHTML = `

            <tr>

                <td colspan="5">

                    No se pudo conectar con la API.

                </td>

            </tr>

        `;


        console.error(

            "Error de conexión con la API:",
            error

        );

    });

}


/*=========================================
        EDITAR PROMOCIÓN
        PUT → MYSQL
=========================================*/

function editarPromocion(id){

    /*
        Buscar promoción por ID
        dentro del arreglo de MySQL
    */

    let promocion =
    promociones.find(
        p => Number(p.id) === Number(id)
    );


    /*
        Verificar que exista
    */

    if(!promocion){

        alert(
            "No se encontró la promoción seleccionada."
        );

        return;

    }


    /*
        Guardar ID real de MySQL
    */

    indiceEditarPromocion =
    promocion.id;


    /*
        Cambiar título
    */

    document
    .getElementById("tituloPromocion")
    .innerHTML = "Editar Promoción";


    /*
        Cargar datos
    */

    document
    .getElementById("nombrePromocion")
    .value =
    promocion.nombre;


    document
    .getElementById("precioPromocion")
    .value =
    promocion.precio;


    document
    .getElementById("descripcionPromocion")
    .value =
    promocion.descripcion;


    document
    .getElementById("imagenPromocion")
    .value =
    promocion.imagen;


    /*
        Mostrar modal
    */

    document
    .getElementById("modalPromocion")
    .style.display = "flex";

}


/*=========================================
        ELIMINAR PROMOCIÓN
        DELETE → MYSQL
=========================================*/

function eliminarPromocion(id){

    /*
        Confirmación
    */

    if(
        !confirm(
            "¿Está seguro de eliminar esta promoción?"
        )
    ){

        return;

    }


    /*
        Enviar DELETE
        a MySQL
    */

    fetch(
        "/ConsultorioEstetica/api/promociones.php",
        {

            method: "DELETE",

            headers: {

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify({

                id: id

            })

        }
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
            "Respuesta DELETE promociones:",
            data
        );


        if(data.success){

            alert(
                "Promoción eliminada correctamente."
            );


            /*
                Volver a consultar MySQL
            */

            cargarPromociones();

        }

        else{

            alert(

                "Error al eliminar promoción: "
                + data.message

            );

        }

    })


    .catch(error => {

        console.error(

            "Error de conexión con la API:",
            error

        );


        alert(

            "No se pudo conectar con el servidor."

        );

    });

}


/*=========================================
        MODAL CONSULTAS
=========================================*/

function abrirFormularioConsulta(){

    indiceEditarConsulta = -1;


    document
    .getElementById("tituloConsulta")
    .innerHTML = "Nueva Consulta";


    document
    .getElementById("paciente")
    .value = "";


    document
    .getElementById("tratamientoConsulta")
    .selectedIndex = 0;


    document
    .getElementById("fechaConsulta")
    .value = "";


    document
    .getElementById("horaConsulta")
    .value = "";


    document
    .getElementById("modalConsulta")
    .style.display = "flex";

}


function cerrarModalConsulta(){

    document
    .getElementById("modalConsulta")
    .style.display = "none";

}


/*=========================================
        GUARDAR CONSULTA
        localStorage
=========================================*/

function guardarConsulta(){

    let paciente =
    document
    .getElementById("paciente")
    .value;


    let tratamiento =
    document
    .getElementById("tratamientoConsulta")
    .value;


    let fecha =
    document
    .getElementById("fechaConsulta")
    .value;


    let hora =
    document
    .getElementById("horaConsulta")
    .value;


    if(
        paciente == "" ||
        fecha == "" ||
        hora == ""
    ){

        alert(
            "Complete todos los campos."
        );

        return;

    }


    let nuevaConsulta = {

        paciente: paciente,

        tratamiento: tratamiento,

        fecha: fecha,

        hora: hora

    };


    if(indiceEditarConsulta == -1){

        consultas.push(
            nuevaConsulta
        );

    }

    else{

        consultas[
            indiceEditarConsulta
        ] = nuevaConsulta;

    }


    localStorage.setItem(

        "consultas",

        JSON.stringify(consultas)

    );


    cerrarModalConsulta();


    cargarConsultas();


    actualizarDashboard();

}


/*=========================================
        CARGAR CONSULTAS
        localStorage
=========================================*/

function cargarConsultas(){

    let tabla =
    document
    .getElementById("tablaConsultas");


    tabla.innerHTML = "";


    consultas.forEach(
        function(c,index){

            tabla.innerHTML += `

                <tr>

                    <td>

                        ${c.paciente}

                    </td>


                    <td>

                        ${c.tratamiento}

                    </td>


                    <td>

                        ${c.fecha}

                    </td>


                    <td>

                        ${c.hora}

                    </td>


                    <td>

                        <button
                            onclick="editarConsulta(${index})"
                        >

                            <i class="fas fa-edit"></i>

                        </button>


                        <button
                            onclick="eliminarConsulta(${index})"
                        >

                            <i class="fas fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/*=========================================
        EDITAR CONSULTA
=========================================*/

function editarConsulta(index){

    indiceEditarConsulta = index;


    let c =
    consultas[index];


    document
    .getElementById("tituloConsulta")
    .innerHTML = "Editar Consulta";


    document
    .getElementById("paciente")
    .value = c.paciente;


    document
    .getElementById("tratamientoConsulta")
    .value = c.tratamiento;


    document
    .getElementById("fechaConsulta")
    .value = c.fecha;


    document
    .getElementById("horaConsulta")
    .value = c.hora;


    document
    .getElementById("modalConsulta")
    .style.display = "flex";

}


/*=========================================
        ELIMINAR CONSULTA
=========================================*/

function eliminarConsulta(index){

    if(
        confirm(
            "¿Eliminar esta consulta?"
        )
    ){

        consultas.splice(index,1);


        localStorage.setItem(

            "consultas",

            JSON.stringify(consultas)

        );


        cargarConsultas();


        actualizarDashboard();

    }

}