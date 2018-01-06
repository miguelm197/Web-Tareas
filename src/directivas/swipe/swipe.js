app.directive('dirSwipe', ["$swipe", function ($swipe) {
    return {
        restrict: 'A',
        templateUrl: './src/directivas/swipe/swipe.html',

        link: function (scope, element) {
            scope.izquierda = function (tarea) {
                tarea.color = {
                    "background-color": "#5ea72b"
                };
            };

            scope.derecha = function (tarea) {
                tarea.color = {
                    "background-color": "#2b77a7"
                };

            };


            $swipe.bind(element, {
                "start": function (coordenadas) {
                    console.log("Comienzo");
                },
                "move": function (coordenadas) {
                    console.log(coordenadas);
                },
                "end": function (coordenadas) {
                    console.log("Fin");
                },

            })
        }
    };
}]);
