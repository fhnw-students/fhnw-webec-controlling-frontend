/**
 * @name DashboardView
 */
define(['jquery', 'Handlebars'], function ($, Handlebars) {

  /**
   * Renders the dashboard view
   *
   * @param parameters (description)
   */
  function render(parameters) {
    console.log('dashboad-ctrl->render()');
    var source = '<div class="container">\
      <h1>Dashboard</h1>\
    </div>';
    var template = Handlebars.compile(source);
    $('main').html(template(parameters));
  }

  return {
    render: render
  };
});
