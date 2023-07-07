//TODO: Archivo de javascript para agregar la funcionalidad a la apgina usuarios.html
function init() {
  $("#usuarios_form").on("submit", (e) => {
    guardayeditarPacientes(e);
  });
}

$().ready(() => {
  cargaTablaUsuarios();
});
var cargaTablaUsuarios = () => {
  var html = "";
  $.post(
    "../../controllers/pacientes.controller.php?op=todos",
    (listamedico) => {
      listapaciente = JSON.parse(listamedico);
      $.each(listapaciente, (index, pacientes) => {
        html +=
          `<tr>` +
          `<td>${index + 1}</td>` +
          `<td>${pacientes.paciente_ced}</td>` +
          `<td>${pacientes.paciente_apel}</td>` +
          `<td>${pacientes.paciente_fnac}</td>` +
          `<td>${pacientes.paciente_gen}</td>` +
          `<td>${pacientes.paciente_tel}</td>` +
          `<td>${pacientes.paciente_cor}</td>` +
          `<td>${pacientes.paciente_dom}</td>` +
          `<td>` +
          `<button title='Modificar Datos de Paciente' class='btn btn-success' onclick='uno(${pacientes.paciente_ced})'><i class="fa-solid fa-pen-to-square"></i></button>` +
          `<button title='Eliminar Registro' class='btn btn-danger' onclick='eliminar(${pacientes.paciente_ced})'><i class="fa-solid fa-trash"></i></button>` +
          `</td>` +
          `</tr>`;
      });
      $("#TablaUsuarios").html(html);
    }
  );
};

var repetido = () => {
  var paciente_ced = document.getElementById("paciente_ced").value;
  $.post(
    "../../controllers/pacientes.controller.php?op=repetido",
    { paciente_ced: paciente_ced },
    (datos) => {
      datos = JSON.parse(datos);

      if (parseInt(datos.codigopac) > 0) {
        $("#mensaje").removeClass("d-none");
        $("#mensaje").html("El Paciente ya existe");
        $("button[type='submit']").prop("disabled", true);

        document.getElementById("paciente_ced").value = "";
        document.getElementById("paciente_ced").focus();
      } else {
        $("#mensaje").addClass("d-none");
        $("button[type='submit']").prop("disabled", false);
      }
    }
  );
};

var guardayeditarPacientes = (e) => {
  e.preventDefault();
  var url = "";
  var form_Data = new FormData($("#usuarios_form")[0]);
  //var input = document.getElementById("paciente_ced");
  //input.removeAttribute("disabled");
  var paciente_ced = document.getElementById("bandera").value;

  if (paciente_ced === undefined || paciente_ced === "") {
    url = "../../controllers/pacientes.controller.php?op=actualizar";
  } else {
    url = "../../controllers/pacientes.controller.php?op=insertar";
    //
  }

  /*for (var pair of form_Data.entries()) {
      console.log(pair[0] + ", " + pair[1]);*/

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
        Swal.fire("PACIENTES", "Se guardo con éxito", "success");
        //alert("Se guardo con exito");
        limpiar();
        cargaTablaUsuarios();
      } else {
        alert("Ocurrio un error al guardar. " + respuesta);
      }
    },
  });
};

var uno = (paciente_ced) => {
  $.post(
    "../../controllers/pacientes.controller.php?op=uno",
    {
      paciente_ced: paciente_ced,
    },
    (res) => {
      console.log(res);
      res = JSON.parse(res);
      $("#paciente_ced").val(res.paciente_ced);
      $("#paciente_apel").val(res.paciente_apel);
      $("#paciente_fnac").val(res.paciente_fnac);
      $("#paciente_gen").val(res.paciente_gen);
      $("#paciente_tel").val(res.paciente_tel);
      $("#paciente_cor").val(res.paciente_cor);
      $("#paciente_dom").val(res.paciente_dom);
    }
  );
  document.getElementById("titulModalUsuarios").innerHTML = "Editar Pacientes";
  $("#paciente_ced").addClass("d-none");
  //$("#mensaje").addClass("d-none")
  //$("#mensaje").removeClass("d-none");
  //var input = document.getElementById("paciente_ced");
  //input.setAttribute("disabled", "disabled");
  $("#modalUsuarios").modal("show");
};

var eliminar = (paciente_ced) => {
  Swal.fire({
    title: "PACIENTES",
    text: "Esta seguro que desea eliminar...???",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar!!!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "../../controllers/pacientes.controller.php?op=eliminar",
        {
          paciente_ced: paciente_ced,
        },
        (res) => {
          res = JSON.parse(res);
          if (res === "ok") {
            cargaTablaUsuarios();
            Swal.fire("Paciente", "Se eliminó con éxito", "success");
            limpiar();
            cargaTablaUsuarios();
          } else {
            Swal.fire("Paciente", "NO Se eliminó", "success");
          }
        }
      );
    }
  });
};

var limpiar = () => {
  document.getElementById("paciente_ced").value = "";
  document.getElementById("paciente_apel").value = "";
  $("#paciente_fnac").val("");
  $("#paciente_gen").val("");
  $("#paciente_tel").val("");
  $("#paciente_cor").val("");
  $("#paciente_dom").val("");

  $("#paciente_ced").removeClass("d-none");

  $("#modalUsuarios").modal("hide");
};
init();
function verificarCedulaEcuador(cedula) {
  if (
    typeof cedula == "string" &&
    cedula.length == 10 &&
    /^\d+$/.test(cedula)
  ) {
    var digitos = cedula.split("").map(Number);
    var codigo_provincia = digitos[0] * 10 + digitos[1];

    //if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia == 30) && digitos[2] < 6) {

    if (
      codigo_provincia >= 1 &&
      (codigo_provincia <= 24 || codigo_provincia == 30)
    ) {
      var digito_verificador = digitos.pop();

      var digito_calculado =
        digitos.reduce(function (valorPrevio, valorActual, indice) {
          return (
            valorPrevio -
            ((valorActual * (2 - (indice % 2))) % 9) -
            (valorActual == 9) * 9
          );
        }, 1000) % 10;
      return digito_calculado === digito_verificador;
    }
  }
  return false;
}
var imprimirJavascript = () => {
  var contenidoImprimir = document.getElementById("Impresion").innerHTML;
  var contenidoOriginal = document.body.innerHTML;
  document.body.innerHTML = contenidoImprimir;
  window.print();
  document.body.innerHTML = contenidoOriginal;
};
function validarCedula(cedula) {
  var esValida = verificarCedulaEcuador(cedula);
  console.log(esValida);
  if (!esValida) {
    //console.log("La cédula no es válida");
    //alert("La cédula ingresada no es válida");
    document.getElementById("mensaje").innerHTML =
      "Error: Digite cedula correcta";
    document.getElementById("paciente_ced").value = "";
    document.getElementById("paciente_ced").focus();
  } else {
    document.getElementById("mensaje").innerHTML = "";
  }
}
