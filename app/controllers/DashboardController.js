/**
 * @name  DashboardController
 */
define(['views/Dashboard', 'semantic', 'services/ApiService'], function (DashboardView, $, ApiService) {
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
    ApiService.getProjects()
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {

      })
  }
  /**
   * Binds all events to the view
   */
  function bindEvents() {
    DashboardView.getScope().find('a.logout').on('click', onClickLogout.bind(this))
  }

  function onClickLogout() {
    ApiService.logut();
  }

});
