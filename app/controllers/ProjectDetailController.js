/**
 * @name  ProjectDetailController
 */
define(['views/ProjectDetail', 'semantic', 'services/ApiService', 'services/ProjectStoreService', 'jquery'],
  function (ProjectDetailView, $, ApiService, ProjectStoreService, jQuery) {
    /**
     * Selected Project
     */
    var project;
    /**
     * Current chart.js object
     */
    var graph;
    /**
     * Public API
     */
    return {
      initialize: initialize
    };
    ///////////////////////////////////////////////////////////
    /**
     * Initialize this controller and renders the view
     */
    function initialize() {
      project = ProjectStoreService.get();
      ProjectDetailView.render({
        title: project.getData().name
      }, function () {
        afterRender();
      });
    }
    /**
     * Life cycle hooke after rendering the view
     */
    function afterRender() {
      setGraphSelectItem();
      bindEvents();
      loadGraphData(getSelectedGraph());
    }
    /**
     * Binds all events to the view
     */
    function bindEvents() {
      getGraphSelectElement().find('a').on('click', onClickGraphSelectItem)
    }
    /**
     * Callback after a select item was selected
     */
    function onClickGraphSelectItem() {
      setGraphSelectItem(jQuery(this));
      loadGraphData(getSelectedGraph());
    }
    /**
     * Retruns the drop-down element of the chart selection
     *
     * @returns {DOMElement} - DropDown Element
     */
    function getGraphSelectElement() {
      return ProjectDetailView.getScope().find('.graph-select');
    }
    /**
     * Returns the selected graph's name
     *
     * @returns {string} - name of the graph
     */
    function getSelectedGraph() {
      return getGraphSelectElement().data('selected');
    }
    /**
     * Sets the new chart element to the dom
     *
     * @param  {string} - name of the graph
     */
    function setGraphSelectItem(clickedSelectItem) {
      if (!clickedSelectItem) {
        clickedSelectItem = jQuery(getGraphSelectElement().find('a')[0]);
      }
      getGraphSelectElement().data('selected', clickedSelectItem.data('graph'));
      getGraphSelectElement().find('.selected-graph-text').html(clickedSelectItem.html());
    }
    /**
     * Loads the data for the given chart
     *
     * @param  {string} - name of the graph
     */
    function loadGraphData(graphName) {
      showGraphLoading();
      setTimeout(function () {
        ApiService.getProjectGraphData(project.getData().pid, graphName)
          .then(function (data) {
            if (graph) {
              graph.destroy();
            }
            graph = new Chart(jQuery('#graph-container'), {
              type: 'line',
              data: data
            });
            hideGraphLoading();
          });
      }, 100);
    }
    /**
     * Shows a loading dimmer over the graph's area
     */
    function showGraphLoading() {
      ProjectDetailView.getScope().find('section.graph .dimmer').addClass('active');
    }
    /**
     * Hides a loading dimmer over the graph's area
     */
    function hideGraphLoading() {
      ProjectDetailView.getScope().find('section.graph .dimmer').removeClass('active');
    }

  });
