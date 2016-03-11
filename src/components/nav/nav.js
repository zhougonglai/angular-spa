/*
* 定义一个名称为 nav 的指令
* 待完善
*/
angular.module('nav', [])
    .factory('nav', function(){
        return {
            //获取状态
            getStatus: function(){
                
            }
        }
    })
    .constant('getNav', 'src/data/navigation.json')
    .constant('navTpl', 'src/components/nav/nav.html')
    .directive('navList', function(nav, navTpl){ // 注入上面 factory定义的 nav
        return {
            //E,A,C,M 分别代表 element, Attribute, ClassName, 注释元素
            restrict: 'E',
            templateUrl: navTpl,
            controller: function($scope, $http, $state, getNav, $location){
                //页面跳转
                $scope.goto = function(url){
                    if(!url)return;
                    $state.go(url)
                };

                $scope.data = {};
                //ajax 获取左侧菜单数据
                $http.get(getNav).success(function(res){
                    $scope.data = res;
                }).error(function(){
                    console.log('数据获取失败!')
                });
            }
        }
    });
