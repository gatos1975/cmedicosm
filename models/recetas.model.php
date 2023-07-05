<?php
//TODO: archivos requeridos
require_once('../config/config.php');
class RecetasModel
{
    public function todos(){  //TODO: CProcedimeinto para obtener todos los registros de la BDD
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM `recetas` INNER JOIN pacientes on recetas.paciente_ced=pacientes.paciente_ced order by recetas.receta_fec DESC";
        $datos = mysqli_query($con,$cadena);
        return $datos;
    }
    public function uno($historial_cod){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM `historial` INNER JOIN pacientes on historial.paciente_ced=pacientes.paciente_ced where historial_cod=$historial_cod";
        $datos = mysqli_query($con, $cadena);
        return $datos;
    }  
    public function Insertar($receta_pres, $receta_indi,$paciente_ced, $medico_cod){
        $con = new ClaseConexion();
        $con = $con->ProcedimientoConectar();
        $cadena = "INSERT INTO `recetas`(`receta_pres`, `receta_indi`, `paciente_ced`, `medico_cod`) VALUES ('$receta_pres', '$receta_indi','$paciente_ced', '$medico_cod')";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }        
    }
    public function Actualizar($historial_cod, $historial_det, $historial_diag, $historial_trat){
        $con = new ClaseConexion();
        $con=$con->ProcedimientoConectar();
        $cadena = "UPDATE historial SET historial_det='$historial_det', historial_det='$historial_det', historial_diag='$historial_diag', historial_trat='$historial_trat' WHERE historial_cod=$historial_cod";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
    }
    public function Eliminar($historial_cod){
        $con = new ClaseConexion();
        $con=$con->ProcedimientoConectar();
        $cadena = "DELETE FROM `historial` WHERE historial_cod=$historial_cod ";
        if (mysqli_query($con, $cadena)){
            return 'ok';
        }else{
            return mysqli_error($con);
        }
    
    }
    
}
