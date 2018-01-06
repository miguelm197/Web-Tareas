app.factory("FacListaTareas", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaTareas: function () {
            return $http.get(servicio + "/tareas");
        },
        consultaTareaId: function (id) {
            return $http.get(servicio + "/tareas/" + id);
        }

    }
}]);
