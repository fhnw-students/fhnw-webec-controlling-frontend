/**
 * @name Router
 */
define(['jquery'], function ($) {
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
    }
  ];
  /**
   * This is the default route and will be called if the hash at
   * the hashchange was not defined in the route var.
   */
  var defaultRoute = 0;
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
   */
  function routing() {
    var currentHash = $('main').data('view');
    if (window.location.hash != currentHash) {
      var notFound = true;
      for (var i = 0; i < routes.length; i++) {
        if (window.location.hash == routes[i].hash) {
          loadController(routes[i].controller);
          notFound = false;
        }
      }
      if (notFound) {
        window.location.hash = routes[defaultRoute].hash;
        loadController(routes[defaultRoute].controller);
      }
      $('main').data('view', window.location.hash);
    }
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
