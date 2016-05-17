/**
 * @name LoginView
 */
define(['jquery', 'Handlebars'], function ($, Handlebars) {

  /**
   * Renders the login view
   *
   * @param parameters (description)
   */
  function render(parameters) {
    console.log('login-ctrl->render()');
    var source = '<div class="container">\
      <h1>{{title}}</h1>\
    </div>';
    var template = Handlebars.compile(source);
    $('main').html(template(parameters));
  }

  return {
    render: render
  };
});
