/**
 * @name TemplateService
 */
define(['jquery', 'Handlebars'], function ($, Handlebars) {
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
    get: get,
    renderView: renderView
  };
  //////////////////////////////////////////////////////////////////////////////////
  /**
   * Loads the template file and builds a handlebar template.
   *
   * @param   {string} templateUrl - Path to the template file
   * @returns {Promise<Handlebars.template>}
   */
  function get(templateUrl) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        cache: false,
        contentType: "text/html; charset=utf-8",
        url: 'app/views/' + templateUrl
      })
        .done(function (data) {
          resolve(Handlebars.compile(data))
        })
        .fail(function (e) {
          console.log('fail', e);
          reject(e);
        });
    });
  }
  /**
   * This renders the view directly with the handlebars framwork and
   * return the JQuery scope of the view element
   *
   * @param  {string} id -
   * @param  {string} templateUrl - Path to the template file
   * @param  {Object} parameters - This is the context for the view
   */
  function renderView(id, templateUrl, parameters) {
    return new Promise(function (resolve, reject) {
      get(templateUrl)
        .then(function (template) {
          $('main').html(template(parameters));
          resolve($Scope = $(id));
        })
        .catch(function (error) {
          console.error('Template could not be loaded', error)
          reject(error);
        });
    });
  }

});
