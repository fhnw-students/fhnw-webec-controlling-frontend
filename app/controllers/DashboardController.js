/**
 * @name  DashboardController
 */
define(['views/Dashboard', 'semantic', 'services/ApiService', 'services/ProjectStoreService'],
  function (DashboardView, $, ApiService, ProjectStoreService) {
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
      ProjectStoreService.clear();
      DashboardView.render({}, function () {
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
          ProjectStoreService.set(res[0]);
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
    /**
     * Destorys the current session and redirects the user to the login page
     */
    function onClickLogout() {
      ApiService.logut();
    }

  });

