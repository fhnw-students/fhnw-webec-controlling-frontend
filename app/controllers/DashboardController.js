/**
 * @name  DashboardController
 */
define(['views/Dashboard', 'semantic'], function (DashboardView, $) {
    var projects = [];
    /**
     * Public API
     */
    return {
        initialize: initialize
    };
    ///////////////////////////////////////////////////////////
    /**
     * Initialize this controller and renders the view
     */
    function initialize() {
        DashboardView.render({
            title: 'Bubu',
            projects: [
                'Project1',
                'Project2',
                'Project3'
            ],
        }, function () {
            afterRender();
        });
    }
    /**
     * Life cycle hooke after rendering the view
     */
    function afterRender() {
        bindEvents();
    }
    /**
     * Binds all events to the view
     */
    function bindEvents() {
        ;
    }

});
