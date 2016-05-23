/**
 * @name LoginView
 */
define(['jquery', 'Handlebars', 'services/TemplateService'], function ($, Handlebars, templateService) {

  /**
   *
   */
  // var template = '';



  /**
   * Renders the login view
   *
   * @param parameters (description)
   */
  function render(parameters) {
    console.log('bbb');
    templateService.get('LoginTemplate')
      .then(function (html) {
        template = html;
        $('main').html(template(parameters));
      })
      .catch(function (error) {
        console.error('LoginTemplate could not be loaded', error)
      });
    // var template = Handlebars.compile(source);

  }

  return {
    render: render
  };
});
