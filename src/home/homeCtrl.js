app.controller("homeCtrl", ["$scope", "$location", function ($scope, $location) {
    
    $scope.nuevaTarea = function () {
        $location.path("/nuevaTarea");
    }
    $scope.listaTareas = function () {
        $location.path("/listaTareas");
    }
    $scope.perfil = function () {
        $location.path("/perfil");
    }

}]);    