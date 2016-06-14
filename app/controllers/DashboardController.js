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
      setProjectListSegment(false);
      bindEvents();
      Project.getAll()
        .then(function (projects) {
          list = projects;

          list = list.map(function (item) {
            var diff = getDaysBetween(new Date(item.getData().rangestart), new Date(item.getData().rangeend));
            var diffCurrent = getDaysBetween(new Date(item.getData().rangestart), new Date());
            item.statusTime = (100 / diff * diffCurrent).toFixed(0);
            item.statusTimeSpent = (100 / (item.getData().maxhours * item.getData().teamSize) * item.getData().timeSpent).toFixed(0);
            return item;
          });

          if (list && list.length > 0) {
            DashboardView.setListItems(list, function () {
              DashboardView.getScope().find('.project-list > .item').on('click', onClickProject);
            });
            setProjectListSegment(true);
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
      showContainer(element, isEmpty);
    }
    /**
     * Sets a error message to show the user that something went wrong
     *
     * @param  {boolean} hasFailed
     */
    function setErrorMessage(hasFailed) {
      var element = DashboardView.getScope().find('.error-message');
      showContainer(element, hasFailed);
    }
    /**
     * Shows list of projects if not failed
     *
     * @param  {boolean} hasFailed
     */
    function setProjectListSegment(hasFailed) {
      var element = DashboardView.getScope().find('.project-list-segment');
      showContainer(element, hasFailed);
    }
    /**
     * Shows and hides the messages
     *
     * @param  {DOMElement} element
     * @param  {boolean} isVisible
     */
    function showContainer(element, isVisible) {
      if (isVisible) {
        element.removeClass('hidden');
      } else {
        element.addClass('hidden');
      }
    }
    /**
     * Calculates Days between two dates
     *
     * @param  {any} date1
     * @param  {any} date2
     * @return {Integer} days
     */
    function getDaysBetween(date1, date2) {

      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime()
      var date2_ms = date2.getTime()

      // Calculate the difference in milliseconds
      var difference_ms = Math.abs(date1_ms - date2_ms)

      // Convert back to days and return
      return Math.round(difference_ms / ONE_DAY)
    }

  });

