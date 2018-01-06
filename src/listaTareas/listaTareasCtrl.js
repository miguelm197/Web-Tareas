app.controller("listaTareasCtrl", ["$scope", "FacListaTareas", function ($scope, FacListaTareas) {
    $scope.listaTareas = [];

    $scope.datos = {
        configuracion: {
        },
        datos: []
    };



    FacListaTareas.consultaTareas().then(function (data) {
        var resultado = [];
        data = data.data;
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            FacListaTareas.consultaTareaId(id).then(function (res) {
                var data = res.data;
                var usuarioEncargado = data.usuarioEncargado;
                var tarea = {
                    id: data.id,
                    estado: data.estado,
                    resumen: data.resumen,
                    asignado: usuarioEncargado,
                    creada: formatoFecha(data.fechaCreado),
                    enlace: function () { return "#!/tarea/" + tarea.id }
                }
                $scope.datos.datos.push(tarea);
            });
        }
    });

}]);