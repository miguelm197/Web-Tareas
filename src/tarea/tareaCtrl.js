app.controller("tareaCtrl", ["$scope", "$location", "$rootScope", "FacTarea", "FacTareas", function ($scope, $location, $rootScope, FacTarea, FacTareas) {
    $scope.comentarioEditado = {};
    $scope.tareaEditada = {};
    $scope.tarea = {};
    $scope.sinComentario = true;
    $scope.comEnEdicion = false;
    $scope.tareaEditada.usuarioSeleccionado = "Usuario";
    $scope.tareaEditada.tipo = "Tarea";

    $scope.listaUsuarios = [];

    var url = $location.$$url;
    var id = url.split("/")[2];

    FacTarea.consultaTarea(id).then(
        function (res) {
            var datos = res.data;

            $scope.tarea = datos;
            $scope.tarea.fechaCreado = formatoFecha(datos.fechaCreado);

            FacTarea.consultaComentarios(id).then(function (res) {
                var comentarios = res.data;
                $scope.tarea.comentarios = comentarios;
                if (comentarios.length > 0) {
                    $scope.sinComentario = false;
                } else {
                    $scope.sinComentario = true;
                }
            });
        }
    );

    FacTareas.consultaUsuarios().then(function (data) {
        data = data.data;
        for (var u = 0; u < data.length; u++) {
            var usuario = {
                id: data[u].id,
                nombre: data[u].nombre,
                apellido: data[u].apellido,
                correo: data[u].correo
            }
            $scope.listaUsuarios.push(usuario);
        }
    });

    $scope.seleccionado = function (usuario) {
        $scope.tareaEditada.usuarioSeleccionado = usuario.nombre + " " + usuario.apellido;
    }

    $scope.agregarComentario = function () {
        var correo = $rootScope.$root.$root.globals.currentUser.correo;
        FacTarea.obtenerUsuarioPorCorreo(correo).then(function (res) {

            var comentario = {
                comentario: $scope.comentarioNuevo,
                fecha: formatoFecha(new Date()),
                hora: formatoHora(new Date())
            }

            var nombre = res.data[0].nombre;
            var apellido = res.data[0].apellido;
            comentario.usuario = nombre + " " + apellido;


            FacTarea.agregarComentario(id, comentario).then(
                function (res) {
                    comentario.id = res.data.id;
                    comentario.tareaId = res.data.tareaId;
                    $scope.tarea.comentarios.push(comentario);
                    $scope.comentarioNuevo = "";
                    $scope.sinComentario = false;
                    $scope.editar = false;
                }
            )
        });
    };

    $scope.eliminarComentario = function (comentario) {
        var idComentario = comentario.id;
        var comentarios = $scope.tarea.comentarios;

        FacTarea.eliminarComentario(idComentario).then(function () {
            for (var i = 0; i < comentarios.length; i++) {
                var idCom = comentarios[i].id;
                if (idComentario == idCom) {
                    $scope.tarea.comentarios.splice(i, 1);
                }
            }
        })
    };

    $scope.editarComentario = function (comentario) {
        var comentarios = $scope.tarea.comentarios;
        var idComentario = comentario.id;

        var comentarioEditado = $scope.comentarioEditado.comentario;

        var ncomentario = comentarioEditado;
        var nfecha = formatoFecha(new Date());
        var nhora = formatoHora(new Date());
        var nusuario = comentario.usuario;
        var ntareaId = comentario.tareaId;
        var nid = comentario.id;

        var comentarioNuevo = {
            comentario: ncomentario,
            fecha: nfecha,
            hora: nhora,
            usuario: nusuario,
            tareaId: ntareaId,
            id: nid
        }

        FacTarea.editarComentario(idComentario, comentarioNuevo).then(function () {

            for (var i = 0; i < comentarios.length; i++) {
                var idCom = comentarios[i].id
                if (idComentario == idCom) {


                    $scope.tarea.comentarios[i].comentario = ncomentario;
                    $scope.tarea.comentarios[i].fecha = nfecha
                    $scope.tarea.comentarios[i].hora = nhora
                    $scope.tarea.comentarios[i].editar = false
                    $scope.tarea.comEnEdicion = false;
                }
            }
        })







    };


    $scope.emparejarEditado = function () {
        $scope.tareaEditada.estado = $scope.tarea.estado;
        $scope.tareaEditada.usuarioSeleccionado = $scope.tarea.usuarioEncargado;
        $scope.tareaEditada.descripcion = $scope.tarea.descripcion;
        $scope.tareaEditada.resumen = $scope.tarea.resumen;
        $scope.tareaEditada.tipo = $scope.tarea.tipo;
    };

    $scope.guardarTarea = function () {
        var id = $scope.tarea.id;
        var estado = $scope.tareaEditada.estado;
        var responsable = $scope.tareaEditada.usuarioSeleccionado;
        var descripcion = $scope.tareaEditada.descripcion;
        var resumen = $scope.tareaEditada.resumen;
        var tipo = $scope.tareaEditada.tipo;

        FacTarea.consultaTarea(id).then(function (res) {
            var tarea = res.data;
            tarea.descripcion = descripcion;
            tarea.usuarioEncargado = responsable;
            tarea.estado = estado;
            tarea.resumen = resumen;
            tarea.tipo = tipo;


            FacTarea.editarTarea(id, tarea).then(function () {
                $scope.tarea.estado = estado;
                $scope.tarea.descripcion = descripcion;
                $scope.tarea.usuarioEncargado = responsable;
                $scope.tarea.resumen = resumen;
                $scope.tarea.tipo = tipo;
            });
        });
    };

    $scope.resolverTarea = function () {
        var id = $scope.tarea.id;
        var estado = "Resuelta";

        FacTarea.consultaTarea(id).then(function (res) {
            var tarea = res.data;
            tarea.estado = estado;

            FacTarea.editarTarea(id, tarea).then(function () {
                $scope.tarea.estado = estado;
            });
        });
    };

    $scope.cerrarTarea = function () {
        var id = $scope.tarea.id;
        var estado = "Cerrada";

        FacTarea.consultaTarea(id).then(function (res) {
            var tarea = res.data;
            tarea.estado = estado;

            FacTarea.editarTarea(id, tarea).then(function () {
                $scope.tarea.estado = estado;
            });
        });
    };

    $scope.iniciarTarea = function () {
        var id = $scope.tarea.id;
        var estado = "En progreso";

        FacTarea.consultaTarea(id).then(function (res) {
            var tarea = res.data;
            tarea.estado = estado;

            FacTarea.editarTarea(id, tarea).then(function () {
                $scope.tarea.estado = estado;
            });
        });
    };

    $scope.reAbrirTarea = function () {
        var id = $scope.tarea.id;
        var estado = "Re abierta";

        FacTarea.consultaTarea(id).then(function (res) {
            var tarea = res.data;
            tarea.estado = estado;

            FacTarea.editarTarea(id, tarea).then(function () {
                $scope.tarea.estado = estado;
            });
        });
    };

    $scope.pararTarea = function () {
        var id = $scope.tarea.id;
        var estado = "Abierta";

        FacTarea.consultaTarea(id).then(function (res) {
            var tarea = res.data;
            tarea.estado = estado;

            FacTarea.editarTarea(id, tarea).then(function () {
                $scope.tarea.estado = estado;
            });
        });
    };


}]);

