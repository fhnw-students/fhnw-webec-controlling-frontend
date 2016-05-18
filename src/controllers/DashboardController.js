/**
 * @name  DashboardController
 */
define(['views/Dashboard'], function(DashboardView){

    /**
     * (description)
     */
    function initialize(){
        console.log('dashboard-ctrl->initialize()');
        DashboardView.render();
    }

    return {
        initialize:initialize
    };
});
