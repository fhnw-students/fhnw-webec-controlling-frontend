/**
 * @name ProjectDetailView
 */
define(['semantic', 'services/TemplateService'], function ($, templateService) {
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
    getScope: getScope,
    setListItems: setListItems
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
    $Scope.find('.settings-select').dropdown();
  }
  /**
   * @param  {Array} list of the projects
   * @param  {Function} done callback
   */
  function setListItems(list, done) {
    templateService
      .get('ProjectDetailTableRow.html')
      .then(function (templateItem) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
          html += templateItem(list[i]);
        }
        $Scope.find('tbody > tr').remove();
        $Scope.find('tbody').append(html);
        if (done) {
          done();
        }
      });
  }

});
