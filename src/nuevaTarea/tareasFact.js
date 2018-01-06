app.factory("FacTareas", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaUsuarios: function () {
            return $http.get(servicio + "/usuarios");
        },
        agregarTarea: function (objeto) {
            return $http.post(servicio + "/tareas", objeto);
        }


    }
}]);