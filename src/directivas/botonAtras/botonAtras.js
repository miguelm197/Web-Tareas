app.directive('dirAtras', function () {
    return {
        restrict: 'E',
        templateUrl:'./src/directivas/botonAtras/botonAtras.html',
        
        link: function (scope, element) {
            scope.back = function () {
                console.log(scope.tituloDirectiva);
                history.back();
            }
        }
    };
});
