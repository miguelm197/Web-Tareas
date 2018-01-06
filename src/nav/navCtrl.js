app.controller("navCtrl", ["$scope", "FacLogin", "$location", '$rootScope', function ($scope, FacLogin, $location, $rootScope) {
    $scope.sesion = {

    }
    cargarDatosSesion();

    // $scope.$watch("globals", function(){
    //     cargarDatosSesion();
    // })

    $scope.$watch("globals",function(newValue,oldValue) {
        cargarDatosSesion();
     })

    function cargarDatosSesion() {
        var cook = $rootScope.globals;
        if (cook) {
            var rolUsuario = cook.currentUser.rolUsuario;
            var nombre = cook.currentUser.nombre;
            var apellido = cook.currentUser.apellido;

            $scope.sesion.rol = rolUsuario;
            $scope.sesion.nombre = nombre.toUpperCase() + " " + apellido.toUpperCase();
        }
    }

    $scope.cerrarSesion = function () {
        FacLogin.ClearCredentials();
        $location.path('/login');
    }
}]);