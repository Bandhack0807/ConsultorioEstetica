<?php

require_once "conexion.php";

header("Content-Type: application/json; charset=UTF-8");


/*=========================================
        CONSULTAR TRATAMIENTOS - GET
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $sql = "SELECT id, nombre, descripcion, imagen, fecha_creacion
            FROM tratamientos
            ORDER BY id ASC";

    $resultado = $conn->query($sql);

    if ($resultado) {

        $tratamientos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $tratamientos[] = $fila;

        }

        echo json_encode([

            "success" => true,

            "tratamientos" => $tratamientos

        ]);

    } else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al consultar tratamientos: "
            . $conn->error

        ]);

    }

    $conn->close();

    exit;
}


/*=========================================
        AGREGAR TRATAMIENTO - POST
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $datos =
    json_decode(
        file_get_contents("php://input"),
        true
    );

    $nombre =
    $datos["nombre"] ?? "";

    $descripcion =
    $datos["descripcion"] ?? "";

    $imagen =
    $datos["imagen"] ?? "";

    if (
        empty($nombre) ||
        empty($descripcion)
    ) {

        echo json_encode([

            "success" => false,

            "message" =>
            "El nombre y la descripción son obligatorios"

        ]);

        $conn->close();

        exit;
    }

    $sql =
    "INSERT INTO tratamientos
    (nombre, descripcion, imagen)
    VALUES (?, ?, ?)";

    $stmt =
    $conn->prepare($sql);

    $stmt->bind_param(

        "sss",

        $nombre,

        $descripcion,

        $imagen

    );

    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Tratamiento agregado correctamente",

            "id" =>
            $stmt->insert_id

        ]);

    } else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al agregar tratamiento: "
            . $stmt->error

        ]);

    }

    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        EDITAR TRATAMIENTO - PUT
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "PUT") {

    $datos =
    json_decode(
        file_get_contents("php://input"),
        true
    );

    $id =
    $datos["id"] ?? "";

    $nombre =
    $datos["nombre"] ?? "";

    $descripcion =
    $datos["descripcion"] ?? "";

    $imagen =
    $datos["imagen"] ?? "";


    if (
        empty($id) ||
        empty($nombre) ||
        empty($descripcion)
    ) {

        echo json_encode([

            "success" => false,

            "message" =>
            "El ID, nombre y descripción son obligatorios"

        ]);

        $conn->close();

        exit;
    }


    $sql =
    "UPDATE tratamientos
     SET nombre = ?,
         descripcion = ?,
         imagen = ?
     WHERE id = ?";


    $stmt =
    $conn->prepare($sql);


    $stmt->bind_param(

        "sssi",

        $nombre,

        $descripcion,

        $imagen,

        $id

    );


    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Tratamiento actualizado correctamente"

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al actualizar tratamiento: "
            . $stmt->error

        ]);

    }


    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        ELIMINAR TRATAMIENTO - DELETE
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

    $datos =
    json_decode(
        file_get_contents("php://input"),
        true
    );

    $id =
    $datos["id"] ?? "";


    if (empty($id)) {

        echo json_encode([

            "success" => false,

            "message" =>
            "El ID del tratamiento es obligatorio"

        ]);

        $conn->close();

        exit;
    }


    $sql =
    "DELETE FROM tratamientos
     WHERE id = ?";


    $stmt =
    $conn->prepare($sql);


    $stmt->bind_param(

        "i",

        $id

    );


    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Tratamiento eliminado correctamente"

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al eliminar tratamiento: "
            . $stmt->error

        ]);

    }


    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        MÉTODO NO PERMITIDO
=========================================*/

echo json_encode([

    "success" => false,

    "message" =>
    "Método no permitido"

]);


$conn->close();

?>