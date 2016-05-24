/**
 * @name LoginController
 */
define(['views/Login', 'semantic'], function (LoginView, $) {

  var $Scope;

  /**
   * Public API
   */
  return {
    initialize: initialize
  };

  ///////////////////////////////////////////////////////////
  /**
   * (description)
   */
  function initialize() {
    LoginView.render({
      title: 'Bubu'
    }, function (scope) {
      $Scope = scope
      bindEvents();
    });
  }

  /**
   * binds all events to the view
   */
  function bindEvents() {
    console.log('login-ctrl->bindEvents()', $Scope, $Scope.find('.ui.form'));
    $Scope.find('.ui.form').form({
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your e-mail'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your password'
            }
          ]
        }
      }
    });


  }

});
