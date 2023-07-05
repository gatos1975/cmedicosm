//TODO: Archivo de javascript para agregar la funcionalidad a la apgina usuarios.html
function init() {
  $("#usuarios_form").on("submit", (e) => {
    guardayeditarSignos(e);
  });
}
$().ready(() => {
  cargaTablaRoles();
});
var cargaTablaRoles = () => {
  var html = "";
  $.post(
    //"../../controllers/usuario.controller.php?op=todos",
    "../../controllers/signosvitales.controller.php?op=todos",
    (listasignos) => {
      listasignos = JSON.parse(listasignos);
      $.each(listasignos, (index, signos) => {
        html +=
          `<tr>` +
          `<td>${index + 1}</td>` +
          `<td>${signos.paciente_apel}</td>` +
          `<td>${signos.paciente_nom}</td>` +
          `<td>${signos.signos_fec}</td>` +
          `<td>${signos.signos_tem}</td>` +
          `<td>${signos.signos_pre}</td>` +
          `<td>${signos.signos_pes}</td>` +
          `<td>${signos.signos_talla}</td>` +
          `<td>` +
          `<button class='btn btn-success' onclick='uno(${signos.signos_cod})'><i class="fa-solid fa-pen-to-square"></i></button>` +
          `<button class='btn btn-danger' onclick='eliminar(${signos.signos_cod})'><i class="fa-solid fa-trash"></i></button>` +
          `</td>` +
          `</tr>`;
      });
      $("#TablaUsuarios").html(html);
    }
  );
};
var cargaSelectPacientes = () => {
  var html = ' <option value="0">Seleccione una Opcion</option>';
  $.post(
    "../../controllers/pacientes.controller.php?op=todos",
    (listapacientes) => {
      listapacientes = JSON.parse(listapacientes);
      $.each(listapacientes, (index, pacientes) => {
        html += `<option value="${pacientes.paciente_ced}">${
          pacientes.paciente_apel + " " + pacientes.paciente_nom
        }</option>`;
      });
      $("#paciente_ced").html(html);
    }
  );
};
var guardayeditarSignos = (e) => {
  e.preventDefault();
  var url = "";
  var form_Data = new FormData($("#usuarios_form")[0]);
  var signos_cod = document.getElementById("signos_cod").value;
  //console.log(signos_cod);
  if (signos_cod === undefined || signos_cod === "") {
    // console.log(signos_cod);
    url = "../../controllers/signosvitales.controller.php?op=insertar";
  } else {
    url = "../../controllers/signosvitales.controller.php?op=actualizar";
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
    cache: false,
    success: (respuesta) => {
      //console.log(respuesta);
      respuesta = JSON.parse(respuesta);
      if (respuesta == "ok") {
        Swal.fire("Signos Vitales", "Se guardo con éxito", "success");
        limpiar();
        cargaTablaRoles();
        //cargaTablaUsuarios();
      } else {
        alert("Ocurrio un error al guardar. " + respuesta);
        console.log(respuesta);
      }
    },
  });
};

var uno = (signos_cod) => {
  $.post(
    "../../controllers/signosvitales.controller.php?op=uno",
    {
      signos_cod: signos_cod,
    },
    (res) => {
      console.log(res);
      res = JSON.parse(res);
      $("#signos_cod").val(res.signos_cod);
      $("#signos_fec").val(res.signos_fec);
      $("#signos_tem").val(res.signos_tem);
      $("#signos_pre").val(res.signos_pre);
      $("#signos_talla").val(res.signos_talla);
    }
  );

  document.getElementById("titulModalUsuarios").innerHTML =
    "Editar Signos Vitales";
  $("#modalUsuarios").modal("show");
};

var eliminar = (signos_cod) => {
  Swal.fire({
    title: "SIGNOS VITALES",
    text: "Esta seguro que desea eliminar...???",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar!!!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "../../controllers/signosvitales.controller.php?op=eliminar",
        {
          signos_cod: signos_cod,
        },
        (res) => {
          res = JSON.parse(res);
          if (res === "ok") {
            Swal.fire("Signos Vitales", "Se eliminó con éxito", "success");
            limpiar();
            cargaTablaRoles();
          }
        }
      );
    }
  });
};

var limpiar = () => {
  document.getElementById("signos_cod").value = "";
  //document.getElementById("signos_fec").value = "";
  $("#signos_tem").val("");
  $("#signos_pre").val("");
  $("#signos_pes").val("");
  $("#signos_talla").val("");

  $("#modalUsuarios").modal("hide");
};
init();
