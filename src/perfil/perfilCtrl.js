app.controller("perfilCtrl", ["$scope", "$rootScope", "$location", "FacPerfil", "FacLogin", "md5", function ($scope, $rootScope, $location, FacPerfil, FacLogin, md5) {
    $scope.editar = false;
    $scope.reestablecerPwd = false;
    $scope.usuario = {};
    $scope.usuarioEditado = {};
    var correo = $rootScope.globals.currentUser.correo;

    FacPerfil.obtenerUsuarioPorCorreo(correo).then(function (res) {
        $scope.usuario = res.data[0];
        $scope.usuarioEditado.nombre = res.data[0].nombre;
        $scope.usuarioEditado.apellido = res.data[0].apellido;
        $scope.usuarioEditado.correo = res.data[0].correo;
        $scope.usuarioEditado.id = res.data[0].id;
    });

    $scope.emparejar = function () {
        $scope.usuarioEditado.nombre = $scope.usuario.nombre;
        $scope.usuarioEditado.apellido = $scope.usuario.apellido;
        $scope.usuarioEditado.correo = $scope.usuario.correo;
        $scope.usuarioEditado.id = $scope.usuario.id;
    }

    $scope.editarUsuario = function () {
        if ($scope.usuario.correo != $scope.usuarioEditado.correo) {
            alertify.confirm('Perfil', 'Si continúa deberá ingresar nuevamente al sistema.',
                function () {
                    editar();
                    FacLogin.ClearCredentials();
                    $location.path('/login');
                }, function () {
                    alertify.error('Se canceló la edición');
                }
            );
        } else {
            editar();
        }


        function editar() {
            alertify.success('Ok');
            var id = $scope.usuario.id;
            $scope.usuario.nombre = $scope.usuarioEditado.nombre;
            $scope.usuario.apellido = $scope.usuarioEditado.apellido;
            $scope.usuario.correo = $scope.usuarioEditado.correo;
            FacPerfil.editarUsuario(id, $scope.usuario).then(function (res) {
                alertify.dialog('alert').set({ transition: 'flipx', message: 'Se editó el usuario ' + $scope.usuario.correo }).show();
                $(".ajs-header").text("Perfil");
            });
        }
    }

    $scope.editarPwd = function () {
        var claveUno = $scope.usuarioEditado.claveUno;
        var claveDos = $scope.usuarioEditado.claveDos;

        if (claveUno == claveDos) {
            var id = $scope.usuario.id;
            $scope.usuario.clave = md5.createHash(claveDos);

            FacPerfil.editarUsuario(id, $scope.usuario).then(function (res) {
                alertify.dialog('alert').set({ transition: 'flipx', message: 'Se editó la contraseña del usuario ' + $scope.usuario.correo }).show();
                $(".ajs-header").text("Perfil");
                $scope.reestablecerPwd = false;

            });
        } else {
            alertify.dialog('alert').set({ transition: 'flipx', message: 'Las contraseñas no son iguales' }).show();
            $(".ajs-header").text("Perfil");
        }


    };

}]);