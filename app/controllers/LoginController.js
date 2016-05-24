/**
 * @name LoginController
 */
define(['views/Login', 'semantic'], function (LoginView, $) {
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
    LoginView.render({
      title: 'Bubu'
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
