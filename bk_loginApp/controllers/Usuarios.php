<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }


    require_once("../config/conexion.php");
    require_once("../models/Usuarios.php");
    $usuario = new Usuarios();

    $body = json_decode(file_get_contents("php://input"), true);

    switch($_GET["op"]){

        case "GetAll":
            $datos=$usuario->get_usuarios();
            echo json_encode($datos);
        break;

        case "GetAllCorreos":
            $datos=$usuario->get_correos_utilizados();
            echo json_encode($datos);
        break;

        case "GetId":
            $datos=$usuario->get_usuarios_x_id($body["correo"]);
            echo json_encode($datos);
        break;

        case "Insert":
            $datos=$usuario->insert_usuarios($body["correo"],$body["nombre"],$body["apellidoPaterno"],$body["apellidoMaterno"],$body["telefono"],$body["contrasena"]);
            echo json_encode("Insert Correcto");
        break;

        case "Update":
            $datos=$usuario->update_usuarios($body["nombre"],$body["apellidoPaterno"],$body["apellidoMaterno"],$body["telefono"],$body["contrasena"],$body["correo"]);
            echo json_encode("Update Correcto");
        break;

        case "Delete":
            $datos=$usuario->delete_usuarios($body["correo"]);
            echo json_encode("Delete Correcto");
        break;
    }
?>