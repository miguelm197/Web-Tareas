app.controller("registroCtrl", ["$scope", "$location", "FacRegistro", "FacLogin", "md5", function ($scope, $location, FacRegistro, FacLogin, md5) {

    $scope.registrarse = function () {
        var nombre = $scope.usuario.nombre;
        var apellido = $scope.usuario.apellido;
        var correo = $scope.usuario.correo;
        var claveUno = $scope.usuario.claveUno;
        var claveDos = $scope.usuario.claveDos;
        var rol = $scope.usuario.rol;
        rol = "admin";
        if (claveUno === claveDos) {
            var objeto = {
                "nombre": nombre,
                "apellido": apellido,
                "correo": correo,
                "rol": rol,
                "clave": md5.createHash(claveDos),
                "activo": "true"
            }
            FacRegistro.existenciaCorreo(correo).then(
                function (res) {
                    var datos = res.data;
                    if (datos.length == 0) {
                        FacRegistro.agregarUsuario(objeto).then(
                            function (res) {
                                FacLogin.setCredentials(objeto.correo, objeto.clave, objeto.rol, objeto.nombre, objeto.apellido);
                                $location.path('/home');
                            }
                        );
                    } else {
                        alertify.dialog('alert').set({ transition: 'flipx', message: 'Ya existe un usuario con este correo' }).show();
                        $(".ajs-header").text("Registro");

                    }
                }
            );



        } else {
            //  Alertify.alert().set('message', 'Las contraseñas no son iguales').show(); 
            alertify.dialog('alert').set({ transition: 'flipx', message: 'Las contraseñas no son iguales' }).show();
            $(".ajs-header").text("Registro");
        }
    }
}]);