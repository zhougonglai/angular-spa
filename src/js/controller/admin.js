angular.module('adminApp')
    .controller('adminCtrl', ['$scope', '$window', '$state', function($scope, $window, $state){

        //重置页面的尺寸 
        $scope.height = $window.innerHeight;
        angular.element($window).bind('resize', function(){
            $scope.$apply(function(){
                //当更新 $scope 对象上的数据 视图不更新时，使用$scope.$apply即可。
                $scope.height = $window.innerHeight;
            });
        });

        //跳转页面，在子模板中也能使用 相当于全局方法。
        $scope.toPage = function(page){
            $state.go(page)
        };

    }])