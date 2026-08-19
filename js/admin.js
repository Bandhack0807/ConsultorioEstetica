/*=========================================
            VARIABLES GLOBALES
=========================================*/

let tratamientos =
JSON.parse(localStorage.getItem("tratamientos")) || [];

let promociones =
JSON.parse(localStorage.getItem("promociones")) || [];

let consultas =
JSON.parse(localStorage.getItem("consultas")) || [];

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

    actualizarDashboard();

};


/*=========================================
        CAMBIAR SECCIONES
=========================================*/

function mostrarSeccion(id){

    document
    .querySelectorAll("main section")
    .forEach(seccion=>{

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
    .innerHTML="Nuevo Tratamiento";

    document
    .getElementById("nombre").value="";

    document
    .getElementById("descripcion").value="";

    document
    .getElementById("imagen").selectedIndex=0;

    document
    .getElementById("modal").style.display="flex";

}

function cerrarModal(){

    document
    .getElementById("modal")
    .style.display="none";

}
function guardarTratamiento(){

    let nombre =
    document.getElementById("nombre").value;

    let descripcion =
    document.getElementById("descripcion").value;

    let imagen =
    document.getElementById("imagen").value;

    if(nombre=="" || descripcion==""){

        alert("Complete todos los campos.");

        return;

    }

    let nuevo={

        nombre:nombre,

        descripcion:descripcion,

        imagen:imagen

    };

    if(indiceEditarTratamiento==-1){

        tratamientos.push(nuevo);

    }

    else{

        tratamientos[indiceEditarTratamiento]=nuevo;

    }

    localStorage.setItem(

        "tratamientos",

        JSON.stringify(tratamientos)

    );

    cerrarModal();

    cargarTratamientos();

    actualizarDashboard();

}

function cargarTratamientos(){

    let tabla =
    document.getElementById("tablaTratamientos");

    tabla.innerHTML = "";

    fetch("/ConsultorioEstetica/api/tratamientos.php")
    .then(response => response.json())
    .then(data => {

        if(data.success){

            tratamientos = data.tratamientos;

            tratamientos.forEach(function(t){

                tabla.innerHTML += `

                <tr>

                    <td>
                        <img src="${t.imagen}">
                    </td>

                    <td>
                        ${t.nombre}
                    </td>

                    <td>
                        ${t.descripcion}
                    </td>

                    <td>

                        <button
                        onclick="editarTratamiento(${t.id})">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                        onclick="eliminarTratamiento(${t.id})">

                            <i class="fas fa-trash"></i>

                        </button>

                    </td>

                </tr>

                `;

            });

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

    });

}

function editarTratamiento(index){

    indiceEditarTratamiento=index;

    let t=tratamientos[index];

    document
    .getElementById("tituloModal")
    .innerHTML="Editar Tratamiento";

    document
    .getElementById("nombre").value=t.nombre;

    document
    .getElementById("descripcion").value=t.descripcion;

    document
    .getElementById("imagen").value=t.imagen;

    document
    .getElementById("modal")
    .style.display="flex";

}

function eliminarTratamiento(index){

    if(confirm("¿Eliminar tratamiento?")){

        tratamientos.splice(index,1);

        localStorage.setItem(

            "tratamientos",

            JSON.stringify(tratamientos)

        );

        cargarTratamientos();

        actualizarDashboard();

    }

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
    .getElementById("nombrePromocion").value = "";

    document
    .getElementById("precioPromocion").value = "";

    document
    .getElementById("descripcionPromocion").value = "";

    document
    .getElementById("imagenPromocion").selectedIndex = 0;

    document
    .getElementById("modalPromocion")
    .style.display = "flex";

}

function cerrarModalPromocion(){

    document
    .getElementById("modalPromocion")
    .style.display = "none";

}

function guardarPromocion(){

    let nombre =
    document.getElementById("nombrePromocion").value;

    let precio =
    document.getElementById("precioPromocion").value;

    let descripcion =
    document.getElementById("descripcionPromocion").value;

    let imagen =
    document.getElementById("imagenPromocion").value;

    if(
        nombre=="" ||
        precio=="" ||
        descripcion==""
    ){

        alert("Complete todos los campos.");

        return;

    }

    let nuevaPromocion={

        nombre:nombre,

        precio:precio,

        descripcion:descripcion,

        imagen:imagen

    };

    if(indiceEditarPromocion==-1){

        promociones.push(nuevaPromocion);

    }

    else{

        promociones[indiceEditarPromocion]=nuevaPromocion;

    }

    localStorage.setItem(

        "promociones",

        JSON.stringify(promociones)

    );

    cerrarModalPromocion();

    cargarPromociones();

    actualizarDashboard();

}

function cargarPromociones(){

    let tabla =
    document.getElementById("tablaPromociones");

    tabla.innerHTML="";

    promociones.forEach(function(p,index){

        tabla.innerHTML += `

<tr>

<td>

<img src="${p.imagen}">

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
onclick="editarPromocion(${index})">

<i class="fas fa-edit"></i>

</button>

<button
onclick="eliminarPromocion(${index})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}

function editarPromocion(index){

    indiceEditarPromocion = index;

    let p = promociones[index];

    document
    .getElementById("tituloPromocion")
    .innerHTML = "Editar Promoción";

    document
    .getElementById("nombrePromocion").value = p.nombre;

    document
    .getElementById("precioPromocion").value = p.precio;

    document
    .getElementById("descripcionPromocion").value = p.descripcion;

    document
    .getElementById("imagenPromocion").value = p.imagen;

    document
    .getElementById("modalPromocion")
    .style.display = "flex";

}

function eliminarPromocion(index){

    if(confirm("¿Eliminar esta promoción?")){

        promociones.splice(index,1);

        localStorage.setItem(

            "promociones",

            JSON.stringify(promociones)

        );

        cargarPromociones();

        actualizarDashboard();

    }

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
    .getElementById("paciente").value = "";

    document
    .getElementById("tratamientoConsulta").selectedIndex = 0;

    document
    .getElementById("fechaConsulta").value = "";

    document
    .getElementById("horaConsulta").value = "";

    document
    .getElementById("modalConsulta")
    .style.display = "flex";

}

function cerrarModalConsulta(){

    document
    .getElementById("modalConsulta")
    .style.display = "none";

}

function guardarConsulta(){

    let paciente =
    document.getElementById("paciente").value;

    let tratamiento =
    document.getElementById("tratamientoConsulta").value;

    let fecha =
    document.getElementById("fechaConsulta").value;

    let hora =
    document.getElementById("horaConsulta").value;

    if(
        paciente=="" ||
        fecha=="" ||
        hora==""
    ){

        alert("Complete todos los campos.");

        return;

    }

    let nuevaConsulta={

        paciente:paciente,

        tratamiento:tratamiento,

        fecha:fecha,

        hora:hora

    };

    if(indiceEditarConsulta==-1){

        consultas.push(nuevaConsulta);

    }

    else{

        consultas[indiceEditarConsulta]=nuevaConsulta;

    }

    localStorage.setItem(

        "consultas",

        JSON.stringify(consultas)

    );

    cerrarModalConsulta();

    cargarConsultas();

    actualizarDashboard();

}

function cargarConsultas(){

    let tabla =
    document.getElementById("tablaConsultas");

    tabla.innerHTML = "";

    consultas.forEach(function(c,index){

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
onclick="editarConsulta(${index})">

<i class="fas fa-edit"></i>

</button>

<button
onclick="eliminarConsulta(${index})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}

function editarConsulta(index){

    indiceEditarConsulta = index;

    let c = consultas[index];

    document
    .getElementById("tituloConsulta")
    .innerHTML = "Editar Consulta";

    document
    .getElementById("paciente").value = c.paciente;

    document
    .getElementById("tratamientoConsulta").value = c.tratamiento;

    document
    .getElementById("fechaConsulta").value = c.fecha;

    document
    .getElementById("horaConsulta").value = c.hora;

    document
    .getElementById("modalConsulta")
    .style.display = "flex";

}

function eliminarConsulta(index){

    if(confirm("¿Eliminar esta consulta?")){

        consultas.splice(index,1);

        localStorage.setItem(

            "consultas",

            JSON.stringify(consultas)

        );

        cargarConsultas();

        actualizarDashboard();

    }

}