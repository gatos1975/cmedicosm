<?php
//TODO: archivos requeridos
require_once('../config/config.php');
class PacienteModel
{
    public function todos(){  //TODO: CProcedimeinto para obtener todos los registros de la BDD
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM pacientes order by paciente_apel ASC";
        $datos = mysqli_query($con,$cadena);
        return $datos;
    }
    public function repetido($paciente_ced){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT count(paciente_ced) as codigopac FROM pacientes where paciente_ced=$paciente_ced";
        $datos = mysqli_query($con, $cadena);
        return $datos;
    }  
    public function uno($paciente_ced){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM pacientes where paciente_ced=$paciente_ced";
        $datos = mysqli_query($con, $cadena);
        return $datos;
    }  
    public function Insertar($paciente_ced, $paciente_apel, $paciente_fnac, $paciente_gen, $paciente_tel, $paciente_cor, $paciente_dom){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "INSERT INTO `pacientes`(`paciente_ced`, `paciente_apel`, `paciente_fnac`, `paciente_gen`, `paciente_tel`, `paciente_cor`, `paciente_dom`) VALUES ('$paciente_ced', '$paciente_apel', '$paciente_fnac', '$paciente_gen', '$paciente_tel', '$paciente_cor', '$paciente_dom')";
        
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
        //$datos = mysqli_query($con, $cadena);
        
    }
    public function Actualizar($paciente_ced, $paciente_apel, $paciente_fnac, $paciente_gen, $paciente_tel, $paciente_cor, $paciente_dom){
        $con = new ClaseConexion();
        $con=$con->ProcedimientoConectar();
        $cadena = "UPDATE pacientes SET paciente_ced='$paciente_ced', paciente_apel='$paciente_apel', paciente_fnac='$paciente_fnac', paciente_gen='$paciente_gen', paciente_tel='$paciente_tel', paciente_cor='$paciente_cor', paciente_dom='$paciente_dom'  WHERE paciente_ced=$paciente_ced";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
    }
    public function Eliminar($paciente_ced){
        $con = new ClaseConexion();
        $con=$con->ProcedimientoConectar();
        $cadena = "DELETE FROM `pacientes` WHERE paciente_ced=$paciente_ced ";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
    
    }
    
}
