<?php
error_reporting(0);
//TODO: Requerimeintos
require_once('../config/sesiones.php');
require_once('../models/pacientes.model.php');
$Paciente = new PacienteModel; //TODO:Declaracion de variable
switch ($_GET['op']) {  //TODO: Clausula de desicion para obtener variable tipo GET

    case 'todos':
        $datos = array();
        $datos = $Paciente->todos();
        while ($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;
        
        case 'uno':
            $paciente_ced = $_POST['paciente_ced'];    
            $datos = array();   
            $datos = $Paciente->uno($paciente_ced);   
            $respuesta = mysqli_fetch_assoc($datos);   
            echo json_encode($respuesta);   
            break;

            case 'repetido':
                $paciente_ced = $_POST['paciente_ced'];    
                $datos = array();   
                $datos = $Paciente->repetido($paciente_ced);   
                $respuesta = mysqli_fetch_assoc($datos);   
                echo json_encode($respuesta);   
                break;
    
        case 'insertar':
            $paciente_ced = $_POST['paciente_ced'];
            $paciente_apel = $_POST['paciente_apel'];
            $paciente_fnac = $_POST['paciente_fnac'];
            $paciente_gen = $_POST['paciente_gen'];         
            $paciente_tel = $_POST['paciente_tel'];
            $paciente_cor = $_POST['paciente_cor'];
            $paciente_dom = $_POST['paciente_dom'];                    
            $datos = array();
            //$datos = $Usuario->Insertar($Nombres, $Apellidos, $correo, $contrasenia,$idRoles); 
            $datos = $Paciente->Insertar($paciente_ced, $paciente_apel, $paciente_fnac, $paciente_gen, $paciente_tel, $paciente_cor, $paciente_dom);
            echo json_encode($datos);
            break;
    
            case 'actualizar':
                $paciente_ced = $_POST['paciente_ced'];
                $paciente_apel = $_POST['paciente_apel'];               
                $paciente_fnac = $_POST['paciente_fnac'];
                $paciente_gen = $_POST['paciente_gen'];               
                $paciente_tel = $_POST['paciente_tel'];
                $paciente_cor = $_POST['paciente_cor'];
                $paciente_dom = $_POST['paciente_dom'];
                     
                $datos = array();        
                $datos = $Paciente->Actualizar($paciente_ced, $paciente_apel, $paciente_fnac, $paciente_gen, $paciente_tel, $paciente_cor, $paciente_dom);        
                //$respuesta = mysqli_fetch_assoc($datos);        
                echo json_encode($datos);        
                break;
        
            case 'eliminar':        
                $paciente_ced = $_POST['paciente_ced'];
                    
                $datos = array();        
                $datos = $Paciente->Eliminar($paciente_ced);       
               //$respuesta = mysqli_fetch_assoc($datos);       
                echo json_encode($datos);       
                break;    
}
