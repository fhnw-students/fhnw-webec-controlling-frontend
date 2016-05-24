/**
 * @name DashboardView
 */
define(['jquery', 'Handlebars', 'services/TemplateService'], function ($, Handlebars, templateService) {

  /**
   * Renders the dashboard view
   *
   * @param parameters (description)
   */
  function render(parameters) {
    console.log('dashboad-view->render()', parameters);
    // var source = '<div class="container">\
    //   <h1>Dashboard</h1>\
    // </div>';
    // var template = Handlebars.compile(source);
    // $('main').html(template(parameters));


    templateService.get('DashboardTemplate.html')
      .then(function (html) {
        template = html;
        $('main').html(template(parameters));
      })
      .catch(function (error) {
        console.error('LoginTemplate could not be loaded', error)
      });
  }

  return {
    render: render
  };
});
