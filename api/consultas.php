<?php

require_once "conexion.php";

header("Content-Type: application/json; charset=UTF-8");


/*=========================================
        CONSULTAR CONSULTAS - GET
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $sql = "SELECT
                id,
                paciente,
                telefono,
                correo,
                tratamiento,
                fecha,
                hora,
                mensaje,
                fecha_creacion,
                tratamiento_id
            FROM consultas
            ORDER BY id DESC";


    $resultado = $conn->query($sql);


    if ($resultado) {

        $consultas = [];


        while ($fila = $resultado->fetch_assoc()) {

            $consultas[] = $fila;

        }


        echo json_encode([

            "success" => true,

            "consultas" => $consultas

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al consultar las consultas: "
            . $conn->error

        ]);

    }


    $conn->close();

    exit;
}


/*=========================================
        AGREGAR CONSULTA - POST
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $datos =
    json_decode(
        file_get_contents("php://input"),
        true
    );


    $paciente =
    $datos["paciente"] ?? "";

    $telefono =
    $datos["telefono"] ?? "";

    $correo =
    $datos["correo"] ?? "";

    $tratamiento =
    $datos["tratamiento"] ?? "";

    $fecha =
    $datos["fecha"] ?? "";

    $hora =
    $datos["hora"] ?? "";

    $mensaje =
    $datos["mensaje"] ?? "";


    if (
        empty($paciente) ||
        empty($telefono) ||
        empty($correo) ||
        empty($tratamiento) ||
        empty($fecha) ||
        empty($hora)
    ) {

        echo json_encode([

            "success" => false,

            "message" =>
            "Todos los campos obligatorios deben completarse"

        ]);


        $conn->close();

        exit;
    }


    $sql =
    "INSERT INTO consultas
    (
        paciente,
        telefono,
        correo,
        tratamiento,
        fecha,
        hora,
        mensaje
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)";


    $stmt =
    $conn->prepare($sql);


    $stmt->bind_param(

        "sssssss",

        $paciente,
        $telefono,
        $correo,
        $tratamiento,
        $fecha,
        $hora,
        $mensaje

    );


    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Consulta registrada correctamente",

            "id" =>
            $stmt->insert_id

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al registrar consulta: "
            . $stmt->error

        ]);

    }


    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        EDITAR CONSULTA - PUT
=========================================*/

if ($_SERVER["REQUEST_METHOD"] === "PUT") {

    $datos =
    json_decode(
        file_get_contents("php://input"),
        true
    );


    $id =
    $datos["id"] ?? "";

    $paciente =
    $datos["paciente"] ?? "";

    $telefono =
    $datos["telefono"] ?? "";

    $correo =
    $datos["correo"] ?? "";

    $tratamiento =
    $datos["tratamiento"] ?? "";

    $fecha =
    $datos["fecha"] ?? "";

    $hora =
    $datos["hora"] ?? "";

    $mensaje =
    $datos["mensaje"] ?? "";


    if (
        empty($id) ||
        empty($paciente) ||
        empty($telefono) ||
        empty($correo) ||
        empty($tratamiento) ||
        empty($fecha) ||
        empty($hora)
    ) {

        echo json_encode([

            "success" => false,

            "message" =>
            "El ID y todos los campos obligatorios deben completarse"

        ]);


        $conn->close();

        exit;
    }


    $sql =
    "UPDATE consultas

     SET paciente = ?,
         telefono = ?,
         correo = ?,
         tratamiento = ?,
         fecha = ?,
         hora = ?,
         mensaje = ?

     WHERE id = ?";


    $stmt =
    $conn->prepare($sql);


    $stmt->bind_param(

        "sssssssi",

        $paciente,
        $telefono,
        $correo,
        $tratamiento,
        $fecha,
        $hora,
        $mensaje,
        $id

    );


    if ($stmt->execute()) {

        echo json_encode([

            "success" => true,

            "message" =>
            "Consulta actualizada correctamente"

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al actualizar consulta: "
            . $stmt->error

        ]);

    }


    $stmt->close();

    $conn->close();

    exit;
}


/*=========================================
        ELIMINAR CONSULTA - DELETE
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
            "El ID de la consulta es obligatorio"

        ]);


        $conn->close();

        exit;
    }


    $sql =
    "DELETE FROM consultas
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
            "Consulta eliminada correctamente"

        ]);

    }

    else {

        echo json_encode([

            "success" => false,

            "message" =>
            "Error al eliminar consulta: "
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