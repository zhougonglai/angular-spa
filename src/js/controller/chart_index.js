angular.module('adminApp')
    .controller('chartIndexCtrl', ['$scope', '$state', 'cfpLoadingBar', function($scope, $state, cfpLoadingBar){
        
        cfpLoadingBar.complete();

        $scope.data = {};


    }])