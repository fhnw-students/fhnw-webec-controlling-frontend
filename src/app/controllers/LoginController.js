/**
 * @name LoginController
 */
define(['views/Login'], function (LoginView) {

    /**
     * (description)
     */
    function initialize() {
        console.log('login-ctrl->initialize()');
        LoginView.render({
            title: 'Bubu'
        });
        bindEvents();
    }

    /**
     * binds all events to the view
     */
    function bindEvents() {
        console.log('login-ctrl->bindEvents()');
    }

    return {
        initialize: initialize
    };
});
