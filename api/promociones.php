<?php

require_once "conexion.php";

header("Content-Type: application/json; charset=UTF-8");


/*=========================================
        CONSULTAR PROMOCIONES - GET
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $sql = "SELECT id, nombre, precio, descripcion, imagen, fecha_creacion
            FROM promociones
            ORDER BY id ASC";

    $resultado = $conn->query($sql);


    if ($resultado) {

        $promociones = [];


        while ($fila = $resultado->fetch_assoc()) {

            $promociones[] = $fila;

        }


        echo json_encode([

            "success" => true,

            "promociones" => $promociones

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al consultar promociones: "
            . $conn->error

        ]);

    }


    $conn->close();

    exit;
}


/*=========================================
        AGREGAR PROMOCIÓN - POST
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $datos =
    json_decode(
        file_get_contents("php://input"),
        true
    );


    $nombre =
    $datos["nombre"] ?? "";

    $precio =
    $datos["precio"] ?? "";

    $descripcion =
    $datos["descripcion"] ?? "";

    $imagen =
    $datos["imagen"] ?? "";


    if (
        empty($nombre) ||
        empty($precio) ||
        empty($descripcion)
    ) {

        echo json_encode([

            "success" => false,

            "message" =>
            "El nombre, precio y descripción son obligatorios"

        ]);


        $conn->close();

        exit;
    }


    $sql =
    "INSERT INTO promociones
    (nombre, precio, descripcion, imagen)
    VALUES (?, ?, ?, ?)";


    $stmt =
    $conn->prepare($sql);


    $stmt->bind_param(

        "sdss",

        $nombre,

        $precio,

        $descripcion,

        $imagen

    );


    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Promoción agregada correctamente",

            "id" =>
            $stmt->insert_id

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al agregar promoción: "
            . $stmt->error

        ]);

    }


    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        EDITAR PROMOCIÓN - PUT
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

    $precio =
    $datos["precio"] ?? "";

    $descripcion =
    $datos["descripcion"] ?? "";

    $imagen =
    $datos["imagen"] ?? "";


    if (
        empty($id) ||
        empty($nombre) ||
        empty($precio) ||
        empty($descripcion)
    ) {

        echo json_encode([

            "success" => false,

            "message" =>
            "El ID, nombre, precio y descripción son obligatorios"

        ]);


        $conn->close();

        exit;
    }


    $sql =
    "UPDATE promociones
     SET nombre = ?,
         precio = ?,
         descripcion = ?,
         imagen = ?
     WHERE id = ?";


    $stmt =
    $conn->prepare($sql);


    $stmt->bind_param(

        "sdssi",

        $nombre,

        $precio,

        $descripcion,

        $imagen,

        $id

    );


    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Promoción actualizada correctamente"

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al actualizar promoción: "
            . $stmt->error

        ]);

    }


    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        ELIMINAR PROMOCIÓN - DELETE
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
            "El ID de la promoción es obligatorio"

        ]);


        $conn->close();

        exit;
    }


    $sql =
    "DELETE FROM promociones
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
            "Promoción eliminada correctamente"

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al eliminar promoción: "
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