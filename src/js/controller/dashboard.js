angular.module('adminApp')
    .controller('dashboardCtrl', ['$scope', 'cfpLoadingBar', function($scope, cfpLoadingBar){
        cfpLoadingBar.complete();
    }])