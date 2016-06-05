/**
 * @name ProjectDetailView
 */
define(['jquery', 'services/TemplateService'], function ($, templateService) {
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
   * Renders this view
   *
   * @param {Object} parameters - This is the context for the view
   * @param {Function} done - This is a callback function with returns the view element
   */
  function render(parameters, done) {
    templateService
      .renderView('#project-detail-view', 'ProjectDetailTemplate.html', parameters)
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
    $Scope.find('.graph-select').dropdown();
  }

});
