$(document).ready(function () {


});
    


function formatoFecha(fecha) {
    var fech = new Date(fecha);
    var dia = fech.getDate();
    var mes = fech.getMonth() + 1;
    var ani = fech.getFullYear();

    if (dia < 10) {
        dia = "0" + dia;
    }
    if (mes < 10) {
        mes = "0" + mes;
    }

    var fechaSalida = dia + "/" + mes + "/" + ani;
    return fechaSalida;
}

function formatoHora(fecha) {
    var fech = new Date(fecha);
    var hora = fech.getHours();
    var minuto = fech.getMinutes();

    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minuto < 10) {
        minuto = "0" + minuto;
    }

    var horaSalida = hora + ":" + minuto;
    return horaSalida;
}