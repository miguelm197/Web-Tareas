app.factory("FacRegistro", ["$http", function ($http) {   
     var servicio = app.config.urlServicios;

    return {
        agregarUsuario: function (objeto) {
            return $http.post(servicio + "/usuarios", objeto);
        },
        existenciaCorreo: function (correo) {
            var a = $http.get(servicio + "/usuarios/?correo=" + correo);
            console.log(a)
            return $http.get(servicio + "/usuarios/?correo=" + correo);
        }
    }
}]);