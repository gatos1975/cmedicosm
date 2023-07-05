//TODO: Archivo de javascript para agregar la funcionalidad a la apgina usuarios.html
function init() {
  $("#usuarios_form").on("submit", (e) => {
    guardayeditarRecetas(e);
  });
}
//$().ready(() => {
//  cargaTablaRoles();
//});
$().ready(() => {
  //$("#historial_det").summernote();
  //cargaTabla();
  cargaTablaRoles();
});
var cargaTablaRoles = () => {
  var html = "";
  $.post(
    //"../../controllers/usuario.controller.php?op=todos",
    "../../controllers/recetas.controller.php?op=todos",
    (listarecetas) => {
      listarecetas = JSON.parse(listarecetas);
      $.each(listarecetas, (index, recetas) => {
        html +=
          `<tr>` +
          `<td>${index + 1}</td>` +
          `<td>${recetas.paciente_apel}</td>` +
          `<td>${recetas.paciente_nom}</td>` +
          `<td>${recetas.receta_fec}</td>` +
          `<td>${recetas.receta_pres}</td>` +
          `<td>${recetas.receta_indi}</td>` +
          `<td>` +
          `</tr>`;
      });
      $("#TablaUsuarios").html(html);
    }
  );
};

var cargaSelectPacientes1 = () => {
  var html = ' <option value="0">Seleccione un Paciente</option>';
  $.post(
    "../../controllers/pacientes.controller.php?op=todos",
    (listapacientes) => {
      listapacientes = JSON.parse(listapacientes);
      $.each(listapacientes, (index, pacientes) => {
        html += `<option value="${pacientes.paciente_ced}">${
          pacientes.paciente_apel + " " + pacientes.paciente_nom
        }</option>`;
      });
      $("#paciente_ced1").html(html);
    }
  );
};
var cargaSelectMedicos1 = () => {
  var html = ' <option value="0">Seleccione un medico</option>';
  $.post("../../controllers/medico.controller.php?op=todos", (listamedicos) => {
    listamedicos = JSON.parse(listamedicos);
    $.each(listamedicos, (index, medicos) => {
      html += `<option value="${medicos.medico_cod}">${
        medicos.medico_ape + " " + medicos.medico_nom
      }</option>`;
    });
    $("#medico_cod1").html(html);
  });
};
var guardayeditarRecetas = (e) => {
  e.preventDefault();
  var url = "";
  var form_Data = new FormData($("#usuarios_form")[0]);
  var receta_cod = document.getElementById("receta_cod").value;
  if (receta_cod === undefined || receta_cod === "") {
    url = "../../controllers/recetas.controller.php?op=insertar";
  } else {
    url = "../../controllers/recetas.controller.php?op=actualizar";
  }
  //for (var pair of form_Data.entries()) {
  // console.log(pair[0] + ", " + pair[1]);
  //}
  //var form_data = new FormData($("#usuarios_form")[0]);
  $.ajax({
    url: url,
    type: "POST",
    data: form_Data,
    processData: false,
    contentType: false,
    //cache: false,
    success: (respuesta) => {
      respuesta = JSON.parse(respuesta);
      if (respuesta === "ok") {
        Swal.fire("RECETAS", "Se guardo con éxito", "success");
        limpiar();
        cargaTablaRoles();
        //cargaTablaUsuarios();
      } else {
        Swal.fire("RECETAS", "OCURRIO UN PROBLEMA AL GUARDAR", "danger");
        //alert("Ocurrio un error al guardar. " + respuesta);
      }
    },
  });
};

var uno = (historial_cod) => {
  $.post(
    "../../controllers/historial.controller.php?op=uno",
    {
      historial_cod: historial_cod,
    },
    (res) => {
      console.log(res);
      res = JSON.parse(res);
      $("#historial_cod").val(res.historial_cod);
      $("#historial_det").val(res.historial_det);
      $("#historial_diag").val(res.historial_diag);
      $("#historial_trat").val(res.historial_trat);
    }
  );

  document.getElementById("titulModalUsuarios").innerHTML = "Editar HISTORIAL";
  $("#modalUsuarios").modal("show");
};

var eliminar = (historial_cod) => {
  Swal.fire({
    title: "HISTORIAL DE PACIENTES",
    text: "Esta seguro que desea eliminar...???",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar!!!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "../../controllers/historial.controller.php?op=eliminar",
        {
          historial_cod: historial_cod,
        },
        (res) => {
          res = JSON.parse(res);
          if (res === "ok") {
            Swal.fire("Historial", "Se eliminó con éxito", "success");
            limpiar();
            cargaTablaRoles();
          }
        }
      );
    }
  });
};

var limpiar = () => {
  document.getElementById("receta_cod").value = "";
  document.getElementById("receta_pres").value = "";
  $("#receta_indi").val("");
  //$("#historial_trat").val("");

  $("#modalRecetas").modal("hide");
};
init();
