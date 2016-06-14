/**
 * @name LoginController
 */
define(['semantic', 'views/Login', 'services/AuthService'], function ($, LoginView, AuthService) {
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
    LoginView.render({}, function () {
      afterRender();
    });
  }
  /**
    * Life cycle hooke after rendering the view
    */
  function afterRender() {
    bindForm();
    bindEvents();
  }
  /**
   * Binds all events to the view
   */
  function bindEvents() {
    ;
  }
  /**
   * This is triggered after the login form is filled out and valid
   *
   * @param  {string} email
   * @param  {string} password
   */
  function onLogin(email, password) {
    hideMessageForWrongLogin();
    setPending(true);
    AuthService.login(email, password)
      .then(function (res) {
        setPending(false);
        window.location.hash = '#/dashboard';
      })
      .catch(function (err) {
        setPending(false);
        showMessageForWrongLogin();
      });
  }
  /**
   * Binds the form to the html
   */
  function bindForm() {
    LoginView.getScope().find('.ui.form').form({
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your e-mail'
            },
            {
              type: 'email',
              prompt: 'Please enter a valid e-mail'
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
      },
      on: 'blur',
      onSuccess: function (event, fields) {
        onLogin(fields.email, fields.password);
        return false;
      }
    });
  }
  /**
   * Adds  a loader to the submit button and disables the form inputs
   *
   * @param  {boolean} isPending
   */
  function setPending(isPending) {
    var $SubmitButton = LoginView.getScope().find('.submit');
    var $Fields = LoginView.getScope().find('.field');
    if (isPending) {
      $SubmitButton.addClass('loading').prop('disabled', true);
      $Fields.addClass('disabled');
    } else {
      $SubmitButton.removeClass('loading').prop('disabled', false);
      $Fields.removeClass('disabled');
    }
  }
  /**
   * Shows the error message to show the user that his credentials
   * are wrong.
   */
  function showMessageForWrongLogin() {
    LoginView.getScope().find('.msg-wrong-login').removeClass('hidden');
  }
  /**
   * Hides the error message
   */
  function hideMessageForWrongLogin() {
    LoginView.getScope().find('.msg-wrong-login').addClass('hidden');
  }

});
