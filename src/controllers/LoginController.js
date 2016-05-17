/**
 * @name LoginController
 */
define(['views/Login'], function (LoginView) {

    /**
     * (description)
     */
    function start() {
        console.log('login-ctrl->start()');
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
        start: start
    };
});
