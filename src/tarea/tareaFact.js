app.factory("FacTarea", ["$http", function ($http) {
        var servicio = app.config.urlServicios;
    return {
        consultaComentarios: function (id) {
            return $http.get(servicio + "/tareas/" + id + "/comentarios");
        },
        agregarComentario: function (id, comentario) {
            return $http.post(servicio + "/tareas/" + id + "/comentarios", comentario);
        },
        eliminarComentario: function (id) {
            return $http.delete(servicio + "/comentarios/" + id);
        },
        editarComentario: function (id, comentario) {
            return $http.put(servicio + "/comentarios/" + id, comentario);
        },


        obtenerUsuarioPorCorreo: function (correo) {
            return $http.get(servicio + "/usuarios?correo=" + correo);
        },
        consultaTarea: function (id) {
            return $http.get(servicio + "/tareas/" + id);
        },
        editarTarea: function (id, tarea) {
            return $http.put(servicio + "/tareas/" + id, tarea);
        }

    }
}]);
