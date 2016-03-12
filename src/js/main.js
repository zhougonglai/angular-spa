/*
* 制作人: hishion
* site: www.byex.cn
*/
var _G = {
    baseUrl: 'src/',
    tplDir: 'src/views/',
    ctrlDir: 'src/js/controller/',
    /*
    *  获取模板
    */
    getTemplate: function(module, operation){
        return this.tplDir + module + (operation ? '_' + operation : '') + '.html'
    },
    /**
    *  获取控制器
    */
    getControl: function(module, operation){
        return this.ctrlDir + module + (operation ? '_' + operation : '') + '.js'
    },


    /**
    *  获取路由配置
    *  opt => {
    *       module: 功能模块
    *       operation: 模块下的操作
    *       files:   Array 需要动态加载的css,js文件
    *       params: 参数
    *
    *  }
    */
    getRouteOptions: function(opt){
        if(!opt)return;
        var url = [opt.module];
        opt.operation && url.push(opt.operation);
        opt.params    && url.push(opt.params)

        return {
            url: '/' + url.join('/') + '/' ,
            templateUrl: this.getTemplate(opt.module, opt.operation),
            resolve: {
                deps: ['$ocLazyLoad', 'cfpLoadingBar', function($ocLazyLoad, cfpLoadingBar){
                    cfpLoadingBar.start();
                    return $ocLazyLoad.load([
                            _G.getControl(opt.module, opt.operation)
                        ].concat(opt.files || []));
                }]
            }
        }
    }
}

angular.module('adminApp', ['ui.router','oc.lazyLoad', 'angular-loading-bar', 'nav', 'topbar'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider){
        //此处关闭了 html5模式
        //$locationProvider.html5Mode(true);
        cfpLoadingBarProvider.includeSpinner = true;
        //配置路由
        $stateProvider
            /*.state('dashboard',{
                url: '/dashboard/',
                templateUrl: _G.getTemplate('dashboard')
            })*/
            .state('user/list', _G.getRouteOptions({
                    module: 'user', 
                    operation: 'list',
                    files: [
                        'src/components/ngDialog/ngDialog.js',
                        'src/components/ngDialog/ngDialog.css',
                        'src/components/ngDialog/ngDialog-theme-default.css',

                        //分页
                        'src/js/ngmodules/paging.js',
                        'src/css/'
                    ]
                })
            )
            .state('user/add', _G.getRouteOptions({
                    module: 'user', 
                    operation: 'add'
                })
            )
            .state('user/edit', _G.getRouteOptions({
                    module: 'user', 
                    operation: 'edit',
                    params: ':id'
                })
            )
            .state('dashboard', _G.getRouteOptions({
                    module: 'dashboard',
                    files: ['http://echarts.baidu.com/dist/echarts.min.js']
                })
            )

            
            .state('chart/index', _G.getRouteOptions({
                    module: 'chart', 
                    operation: 'index'
                })
            )
            
            .state('editor/index', _G.getRouteOptions({
                    module: 'editor', 
                    operation: 'index'
                })
            )

        
            //默认地址
            $urlRouterProvider.otherwise('/dashboard/')
    })