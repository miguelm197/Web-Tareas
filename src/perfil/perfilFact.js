app.factory("FacPerfil", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    
    return {

        obtenerUsuarioPorCorreo: function (correo) {
            return $http.get(servicio + "/usuarios?correo=" + correo);
        },
        editarUsuario: function (id, usuario) {
            return $http.put(servicio + "/usuarios/" + id, usuario);
        }
    }
}]);
