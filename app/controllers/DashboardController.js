/**
 * @name  DashboardController
 */
define(['views/Dashboard', 'semantic', 'services/SessionService'], function (DashboardView, $, SessionService) {
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
                'P1',
                'P2',
                'P3',
                'P4',
                'P5',
                'P6'
            ]
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
        DashboardView.getScope().find('a.logout').on('click', onClickLogout.bind(this))
    }

    function onClickLogout() {
        SessionService.clearToken();
    }

});
