/**
 * @name  DashboardController
 */
define(['views/Dashboard', 'services/ProjectStoreService', 'services/AuthService', 'models/Project', 'jquery'],
  function (DashboardView, ProjectStoreService, AuthService, Project, $) {
    /**
     * List of all project of the current user
     */
    var list = [];
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
      setDimmer(true);
      setEmptyMessage(false);
      setErrorMessage(false);
      bindEvents();
      setTimeout(function () {
        Project.getAll()
          .then(function (projects) {
            console.log(projects);
            list = projects;
            if (list && list.length > 0) {
              DashboardView.setListItems(list, function () {
                DashboardView.getScope().find('.project-list > .item').on('click', onClickProject);
              });
            } else {
              setEmptyMessage(true);
            }
            setDimmer(false);
          })
          .catch(function (err) {
            console.error(err);
            setDimmer(false);
            setErrorMessage(true);
          });
      }, 100);
    }
    /**
     * Binds all events to the view
     */
    function bindEvents() {
      DashboardView.getScope().find('a.logout').on('click', onClickLogout);
    }
    /**
     * Click event after selection of project tile
     */
    function onClickProject() {
      ProjectStoreService.set($(this).data('key'));
      window.location.hash = '#/detail';
    }
    /**
     * Destorys the current session and redirects the user to the login page
     */
    function onClickLogout() {
      AuthService.logout();
    }
    /**
     * Sets the loading dimmer over the whole page
     *
     * @param  {boolean} isPending
     */
    function setDimmer(isPending) {
      var element = DashboardView.getScope().find('.dimmer');
      if (isPending) {
        element.addClass('active');
      } else {
        element.removeClass('active');
      }
    }
    /**
     * Sets a empty message to show the user that he has no projects yet
     *
     * @param  {boolean} isEmpty
     */
    function setEmptyMessage(isEmpty) {
      var element = DashboardView.getScope().find('.is-empty-message');
      showMessageBox(element, isEmpty);
    }
    /**
     * Sets a error message to show the user that something went wrong
     *
     * @param  {boolean} hasFailed
     */
    function setErrorMessage(hasFailed) {
      var element = DashboardView.getScope().find('.error-message');
      showMessageBox(element, hasFailed);
    }
    /**
     * Shows and hides the messages
     *
     * @param  {DOMElement} element
     * @param  {boolean} isVisible
     */
    function showMessageBox(element, isVisible) {
      if (isVisible) {
        element.removeClass('hidden');
      } else {
        element.addClass('hidden');
      }
    }

  });

