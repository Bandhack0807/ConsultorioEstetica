//=========================================
// BASE DE DATOS TEMPORAL (LOCALSTORAGE)
//=========================================

let tratamientos = JSON.parse(localStorage.getItem("tratamientos"));

if (!tratamientos) {

    tratamientos = [

        {
            nombre: "Limpieza Facial",

            descripcion: "Elimina impurezas y células muertas dejando la piel limpia e hidratada.",

            imagen: "img/tratamiento1.png"
        },

        {
            nombre: "Botox",

            descripcion: "Reduce líneas de expresión y arrugas con resultados naturales.",

            imagen: "img/tratamiento2.png"
        },

        {
            nombre: "Peeling Facial",

            descripcion: "Renueva la piel mejorando textura, luminosidad y manchas.",

            imagen: "img/tratamiento3.png"
        }

    ];

}

let editar = -1;

//=========================================
// CAMBIAR SECCIONES
//=========================================

function mostrarSeccion(id){

    document.querySelectorAll("main section").forEach(seccion=>{

        seccion.classList.add("oculto");

    });

    document.getElementById(id).classList.remove("oculto");

}

//=========================================
// CARGAR TABLA
//=========================================

function cargarTabla(){

    const tabla = document.getElementById("tablaTratamientos");

    tabla.innerHTML = "";

    tratamientos.forEach((tratamiento,index)=>{

        tabla.innerHTML += `

        <tr>

            <td>

                <img src="${tratamiento.imagen}">

            </td>

            <td>

                ${tratamiento.nombre}

            </td>

            <td>

                ${tratamiento.descripcion}

            </td>

            <td>

                <button onclick="editarTratamiento(${index})">

                    <i class="fas fa-edit"></i>

                </button>

                <button onclick="eliminarTratamiento(${index})">

                    <i class="fas fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("totalTratamientos").innerHTML = tratamientos.length;

    guardarDatos();

}

//=========================================
// MODAL
//=========================================

function abrirFormulario(){

    editar = -1;

    document.getElementById("tituloModal").innerHTML = "Nuevo Tratamiento";

    document.getElementById("nombre").value = "";

    document.getElementById("descripcion").value = "";

    document.getElementById("imagen").selectedIndex = 0;

    document.getElementById("modal").style.display = "flex";

}

function cerrarModal(){

    document.getElementById("modal").style.display = "none";

}

//=========================================
// GUARDAR
//=========================================

function guardarTratamiento(){

    const nombre = document.getElementById("nombre").value;

    const descripcion = document.getElementById("descripcion").value;

    const imagen = document.getElementById("imagen").value;

    if(nombre=="" || descripcion==""){

        alert("Completa todos los campos");

        return;

    }

    const nuevo = {

        nombre,

        descripcion,

        imagen

    };

    if(editar==-1){

        tratamientos.push(nuevo);

    }

    else{

        tratamientos[editar]=nuevo;

    }

    cerrarModal();

    cargarTabla();

}

//=========================================
// EDITAR
//=========================================

function editarTratamiento(index){

    editar = index;

    document.getElementById("tituloModal").innerHTML="Editar Tratamiento";

    document.getElementById("nombre").value = tratamientos[index].nombre;

    document.getElementById("descripcion").value = tratamientos[index].descripcion;

    document.getElementById("imagen").value = tratamientos[index].imagen;

    document.getElementById("modal").style.display="flex";

}

//=========================================
// ELIMINAR
//=========================================

function eliminarTratamiento(index){

    let respuesta = confirm("¿Deseas eliminar este tratamiento?");

    if(respuesta){

        tratamientos.splice(index,1);

        cargarTabla();

    }

}

//=========================================
// LOCAL STORAGE
//=========================================

function guardarDatos(){

    localStorage.setItem(

        "tratamientos",

        JSON.stringify(tratamientos)

    );

}

//=========================================
// INICIO
//=========================================

window.onload = function(){

    cargarTabla();

}