/**
 * @name LoginView
 */
define(['jquery', 'Handlebars', 'services/TemplateService'], function ($, Handlebars, templateService) {

  /**
   * Local varibales
   */
  var onAfterRenderCallbacks = [];

  /**
   * Public API
   */
  return {
    render: render,
    onAfterRender: onAfterRender
  };
  ///////////////////////////////////////////////////////////

  /**
   * Renders the login view
   *
   * @param {Object} parameters - This is the context for the view
   * @param {Function} done - This is a callback function with returns the view element
   */
  function render(parameters, done) {
    templateService.get('LoginTemplate.html')
      .then(function (html) {
        template = html;
        $('main').html(template(parameters));
        afterRender();
        done($('#login-view'));
      })
      .catch(function (error) {
        console.error('LoginTemplate could not be loaded', error)
      });
  }
  /**
   * This is a life cycle hook of this view
   */
  function afterRender() {
    for (var i = 0; i < onAfterRenderCallbacks.length; i++) {
      onAfterRenderCallbacks[i]();
    }
  }
  /**
   * Use this function to subscribe this life cycle hook
   *
   * @param  {Function} callback
   * @return {Function} disposer - This removes the life cycle hook
   */
  function onAfterRender(callback) {
    if (typeof callback === 'function') {
      throw new Error('callback must be a function');
    }
    onAfterRenderCallbacks.push(callback);
    // Disposer function
    return function () {
      var idx = onAfterRenderCallbacks.indexOf(callback);
      if (idx >= 0) {
        onAfterRenderCallbacks.splice(idx, 1);
      }
      return idx >= 0;
    }
  }

});
