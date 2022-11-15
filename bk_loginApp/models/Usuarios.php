<?php
    class Usuarios extends Conectar{
        public function get_usuarios(){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM USUARIOS";
            $sql=$conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function get_usuarios_x_id($correo){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM USUARIOS WHERE correo = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $correo);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function get_correos_utilizados(){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="SELECT correo FROM USUARIOS";
            $sql=$conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function insert_usuarios($correo,$nombre,$apellidoPaterno,$apellidoMaterno,$telefono,$contrasena){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="INSERT INTO USUARIOS(correo,nombre,apellidoPaterno,apellidoMaterno,telefono,contrasena) VALUES (?,?,?,?,?,?);";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $correo);
            $sql->bindValue(2, $nombre);
            $sql->bindValue(3, $apellidoPaterno);
            $sql->bindValue(4, $apellidoMaterno);
            $sql->bindValue(5, $telefono);
            $sql->bindValue(6, $contrasena);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function update_usuarios($nombre,$apellidoPaterno,$apellidoMaterno,$telefono,$contrasena,$correo){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="UPDATE USUARIOS SET
                nombre = ?,
                apellidoPaterno= ?,
                apellidoMaterno =?,
                telefono=?,
                contrasena=?
                WHERE
                correo = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $nombre);
            $sql->bindValue(2, $apellidoPaterno);
            $sql->bindValue(3, $apellidoMaterno);
            $sql->bindValue(4, $telefono);
            $sql->bindValue(5, $contrasena);
            $sql->bindValue(6, $correo);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function delete_usuarios($correo){
            $conectar= parent::conexion();
            parent::set_names();
            $sql="DELETE FROM USUARIOS
                WHERE
                correo = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $correo);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

    }
?>