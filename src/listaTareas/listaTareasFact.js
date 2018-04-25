app.factory("FacListaTareas", ["$http", function ($http) {
    var servicio = app.config.urlServicios;

    return {
        consultaTareas: function () {
            var a = $http.get(servicio + "/tareas");
            return a;
        },
        consultaTareaId: function (id) {
            return $http.get(servicio + "/tareas/" + id);
        }

    }
}]);
