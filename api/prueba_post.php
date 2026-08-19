<?php
?>

<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <title>Prueba POST Tratamientos</title>

</head>

<body>

    <h1>Agregar tratamiento de prueba</h1>

    <button onclick="agregarTratamiento()">
        Agregar tratamiento
    </button>

    <p id="resultado"></p>

    <script>

        async function agregarTratamiento() {

            const datos = {

                nombre: "Radiofrecuencia",

                descripcion:
                    "Tratamiento para mejorar la apariencia y textura de la piel.",

                imagen: "img/tratamiento4.png"

            };

            try {

                const respuesta = await fetch("tratamientos.php", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(datos)

                });

                const resultado = await respuesta.json();

                document.getElementById("resultado").textContent =
                    resultado.message;

                console.log(resultado);

            } catch (error) {

                console.error(error);

                document.getElementById("resultado").textContent =
                    "Ocurrió un error al conectar con PHP.";

            }

        }

    </script>

</body>

</html>