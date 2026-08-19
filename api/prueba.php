<?php

require_once "conexion.php";

echo "<h2>Conexión exitosa</h2>";

$sql = "SELECT * FROM tratamientos";

$resultado = $conn->query($sql);

if (!$resultado) {

    die("Error en la consulta: " . $conn->error);

}

echo "<h3>Tratamientos encontrados:</h3>";

while ($tratamiento = $resultado->fetch_assoc()) {

    echo "ID: " . $tratamiento["id"] . "<br>";

    echo "Nombre: " . $tratamiento["nombre"] . "<br>";

    echo "Descripción: " . $tratamiento["descripcion"] . "<br>";

    echo "Imagen: " . $tratamiento["imagen"] . "<br>";

    echo "<hr>";

}

?>