/**
 * @name  DashboardController
 */
define(['views/Dashboard'], function(DashboardView){

    /**
     * (description)
     */
    function start(){
        console.log('dashboard-ctrl->start()');
        DashboardView.render();
    }

    return {
        start:start
    };
});
