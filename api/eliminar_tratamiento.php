<?php

require_once "conexion.php";

$id = 10;

$sql = "DELETE FROM tratamientos WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error al preparar la consulta: " . $conn->error);
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {

        echo "Tratamiento eliminado correctamente";

    } else {

        echo "No se encontró un tratamiento con ese ID.";

    }

} else {

    echo "Error al eliminar el tratamiento: " . $stmt->error;

}

$stmt->close();
$conn->close();

?>