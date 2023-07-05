<?php
//TODO: archivos requeridos
require_once('../config/config.php');
class PacienteModel
{
    public function todos(){  //TODO: CProcedimeinto para obtener todos los registros de la BDD
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM pacientes";
        $datos = mysqli_query($con,$cadena);
        return $datos;
    }
    public function uno($paciente_ced){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM pacientes where paciente_ced=$paciente_ced";
        $datos = mysqli_query($con, $cadena);
        return $datos;
    }  
    public function Insertar($paciente_ced, $paciente_apel, $paciente_nom, $paciente_fnac, $paciente_gen, $paciente_eciv, $paciente_tel, $paciente_cor, $paciente_dom, $paciente_otro){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "INSERT INTO `pacientes`(`paciente_ced`, `paciente_apel`, `paciente_nom`, `paciente_fnac`, `paciente_gen`, `paciente_eciv`, `paciente_tel`, `paciente_cor`, `paciente_dom`, `paciente_otro`) VALUES ('$paciente_ced', '$paciente_apel', '$paciente_nom', '$paciente_fnac', '$paciente_gen', '$paciente_eciv', '$paciente_tel', '$paciente_cor', '$paciente_dom', '$paciente_otro')";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
        //$datos = mysqli_query($con, $cadena);
        
    }
    public function Actualizar($paciente_ced, $paciente_apel, $paciente_nom, $paciente_fnac, $paciente_gen, $paciente_eciv, $paciente_tel, $paciente_cor, $paciente_dom, $paciente_otro){
        $con = new ClaseConexion();
        $con=$con->ProcedimientoConectar();
        $cadena = "UPDATE pacientes SET paciente_ced='$paciente_ced', paciente_apel='$paciente_apel', paciente_nom='$paciente_nom', paciente_fnac='$paciente_fnac', paciente_gen='$paciente_gen', paciente_eciv='$paciente_eciv', paciente_tel='$paciente_tel', paciente_cor='$paciente_cor', paciente_dom='$paciente_dom', paciente_otro='$paciente_otro'  WHERE paciente_ced=$paciente_ced";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
    }
    public function Eliminar($paciente_ced){
        $con = new ClaseConexion();
        $con=$con->ProcedimientoConectar();
        $cadena = "DELETE FROM `paciente` WHERE paciente_ced=$paciente_ced ";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
    
    }
    
}
