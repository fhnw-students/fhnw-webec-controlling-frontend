/**
 * @name LoginView
 */
define(['jquery', 'Handlebars', 'services/TemplateService'], function ($, Handlebars, templateService) {
  /**
   * Stores the jquery element of this view
   */
  var $Scope;
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
    render: render,
    getScope: getScope
  };
  ///////////////////////////////////////////////////////////
  /**
   * @returns {JQuery|Object} - JQuery scope of the view
   */
  function getScope() {
    return $Scope;
  }
  /**
   * Renders the login view
   *
   * @param {Object} parameters - This is the context for the view
   * @param {Function} done - This is a callback function with returns the view element
   */
  function render(parameters, done) {
    templateService
      .renderView('#login-view', 'LoginTemplate.html', parameters)
      .then(function (scope) {
        $Scope = scope;
        afterRender();
        done($Scope);
      });
  }
  /**
   * Life cycle hook. Is triggered after rendering the view
   */
  function afterRender() {
    bindForm();
  }
  /**
   * Binds the form to the html
   */
  function bindForm() {
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
