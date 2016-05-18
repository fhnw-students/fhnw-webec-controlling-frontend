/**
 * @name TemplateService
 */
define(['jquery', 'Handlebars'], function ($, Handlebars) {

  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
    get: get
  };

  //////////////////////////////////////////////////////////////////////////////////

  function get(templateName) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        cache: false,
        contentType: "text/html; charset=utf-8",
        url: 'views/' + templateName
      })
        .done(function (data) {
          console.log('success', data);
          resolve(Handlebars.compile(data))
        })
        .fail(function (e) {
          console.log('fail', e);
          reject(e);
        });
    });
  }

});
