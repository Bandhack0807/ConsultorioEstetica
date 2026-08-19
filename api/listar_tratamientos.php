<?php

require_once "conexion.php";

$sql = "SELECT id, nombre, descripcion, imagen, fecha_creacion 
        FROM tratamientos 
        ORDER BY id ASC";

$resultado = $conn->query($sql);

if (!$resultado) {
    die("Error en la consulta: " . $conn->error);
}

echo "<h1>Tratamientos registrados</h1>";

if ($resultado->num_rows > 0) {

    while ($tratamiento = $resultado->fetch_assoc()) {

        echo "<hr>";

        echo "<p><strong>ID:</strong> " . $tratamiento["id"] . "</p>";

        echo "<p><strong>Nombre:</strong> " . 
             htmlspecialchars($tratamiento["nombre"]) . 
             "</p>";

        echo "<p><strong>Descripción:</strong> " . 
             htmlspecialchars($tratamiento["descripcion"]) . 
             "</p>";

        echo "<p><strong>Imagen:</strong> " . 
             htmlspecialchars($tratamiento["imagen"]) . 
             "</p>";

        echo "<p><strong>Fecha de creación:</strong> " . 
             $tratamiento["fecha_creacion"] . 
             "</p>";
    }

} else {

    echo "<p>No hay tratamientos registrados.</p>";
}

$conn->close();

?>