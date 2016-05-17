define(['jquery'], function ($) {

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
  var defaultRoute = '#dashboard';
  var currentHash = '';

  /**
   * (description)
   */
  function startRouting() {
    $(window).on('hashchange', function () {
      // On every hash change the render function is called with the new hash.
      // This is how the navigation of our app happens.
      hashCheck(decodeURI(window.location.hash));
    });
    hashCheck(decodeURI(window.location.hash));
  }

  /**
   * (description)
   */
  function hashCheck() {
    if (window.location.hash != currentHash) {
      for (var i = 0, currentRoute; currentRoute = routes[i++];) {
        if (window.location.hash == currentRoute.hash) {
          loadController(currentRoute.controller);
        }
      }
      currentHash = window.location.hash;
    }
  }

  /**
   * (description)
   *
   * @param controllerName (description)
   */
  function loadController(controllerName) {
    require(['controllers/' + controllerName], function (controller) {
      controller.start();
    });
  }

  return {
    startRouting: startRouting
  };
});