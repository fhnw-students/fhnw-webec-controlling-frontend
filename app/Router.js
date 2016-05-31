/**
 * @name Router
 */
define(['jquery', 'services/SessionService'], function ($, SessionService) {
  /**
   * Define all routes of the application here.
   */
  var routes = [
    {
      hash: '#dashboard',
      controller: 'DashboardController'
    },
    {
      hash: '#login',
      controller: 'LoginController'
    },
    {
      hash: '#projectform',
      controller: 'ProjectFormController'
    }
  ];
  /**
   * This is the default route and will be called if the hash at
   * the hashchange was not defined in the route var.
   */
  var defaultRoute = 0;
  var loginRoute = 1;
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
    start: start
  };
  //////////////////////////////////////////////////////////////////////////////////
  /**
   * Watches the hash change and on every change the start function of
   * the controller is called
   */
  function start() {
    $(window).on('hashchange', function () {
      // On every hash change the render function is called with the new hash.
      // This is how the navigation of our app happens.
      routing(decodeURI(window.location.hash));
    });
    //For the first time we need to call the routing function to load the view
    routing(decodeURI(window.location.hash));
  }
  /**
   * Evalutes the controller from the given hash string. Then it
   * loads the controller.
   * @param  {string} newRouteHash
   */
  function routing(newRouteHash) {
    newRouteHash = evaluateAccess(newRouteHash);
    var currentHash = $('main').data('view');
    if (newRouteHash !== currentHash) {
      var notFound = true;
      for (var i = 0; i < routes.length; i++) {
        if (newRouteHash === routes[i].hash) {
          loadController(routes[i].controller);
          notFound = false;
        }
      }
      if (notFound) {
        newRouteHash = routes[defaultRoute].hash;
        loadController(routes[defaultRoute].controller);
      }
    }
    window.location.hash = newRouteHash
    $('main').data('view', window.location.hash);
  }
  /**
   * Checks if a token is available and if there is a token the user
   * will be redirected to the dashboard
   *
   * @param  {string} newRouteHash
   */
  function evaluateAccess(newRouteHash) {
    if (!SessionService.hasToken()) {
      newRouteHash = routes[loginRoute].hash;
    } else {
      if (newRouteHash === routes[loginRoute].hash) {
        newRouteHash = routes[defaultRoute].hash;
      }
    }
    return newRouteHash;
  }
  /**
   * Requires the controller and calls the initialize function of it.
   *
   * @param controllerName (description)
   */
  function loadController(controllerName) {
    require(['controllers/' + controllerName], function (controller) {
      controller.initialize();
    });
  }

});
