angular.module('adminApp')
    .controller('editorIndexCtrl', ['$scope', '$state', 'cfpLoadingBar', function($scope, $state, cfpLoadingBar){
        
        cfpLoadingBar.complete();

        $scope.data = {};


    }])