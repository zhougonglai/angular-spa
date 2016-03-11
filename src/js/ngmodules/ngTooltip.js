
/*
* 暂时未完成
*/
angular.module('ngTooltip', [])
    .directive('ngTooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, elem, attrs){
                var direction = attrs['direction'] || 'bottom';
                var text      = attrs['ngTooltip'];
                var tooltip   = angular.element('<div class="tooltip">'+ text +'</div>');

                angular.element(document.body).append(tooltip);

                elem.on('mouseover', function(e){
                    e.stopPropagation();
                    var x = e.pageX, y = e.pageY,
                        w = this.offsetWidth,
                        h = this.offsetHeight,
                        w2 = tooltip[0].offsetWidth,
                        left = 0, top = 0;

                    switch(tooltip){
                        case 'left':
                            left = x - w2;
                            top  = y + h/2;
                            break;
                        case 'right':
                            left = x + w;
                            top  = y + h/2;
                            break;
                        case 'top':
                            left = x + w/2;
                            top  = y;
                            break;
                        default:
                            left = x + w/2;
                            top = y + h;
                        break;
                    }
                    tooltip.css({left: left+'px', top: top+'px'}).fadeIn(200).addClass('tooltip tooltip-'+direction);
                })
                
                .on('mouseover', function(){
                    //tooltip.removeClass('tooltip-'+direction)
                })

            }
        }
    })

