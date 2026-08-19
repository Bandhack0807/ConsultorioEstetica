<?php

require_once "conexion.php";

$id = 10;

$nombre = "Radiofrecuencia";
$descripcion = "Tratamiento de radiofrecuencia para mejorar la apariencia, textura y firmeza de la piel.";
$imagen = "img/tratamiento4.png";

$sql = "UPDATE tratamientos
        SET nombre = ?,
            descripcion = ?,
            imagen = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error al preparar la consulta: " . $conn->error);
}

$stmt->bind_param(
    "sssi",
    $nombre,
    $descripcion,
    $imagen,
    $id
);

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {

        echo "Tratamiento actualizado correctamente";

    } else {

        echo "La consulta se ejecutó, pero no se modificaron datos.";

    }

} else {

    echo "Error al actualizar el tratamiento: " . $stmt->error;

}

$stmt->close();
$conn->close();

?>