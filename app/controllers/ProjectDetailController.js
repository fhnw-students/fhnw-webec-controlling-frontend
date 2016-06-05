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

    function onClickGraphSelectItem(a) {
      setGraphSelectItem(jQuery(this));
      loadGraphData(getSelectedGraph());
    }

    function getGraphSelectElement() {
      return ProjectDetailView.getScope().find('.graph-select');
    }

    function getSelectedGraph() {
      return getGraphSelectElement().data('selected');
    }

    function setGraphSelectItem(clickedSelectItem) {
      if (!clickedSelectItem) {
        clickedSelectItem = jQuery(getGraphSelectElement().find('a')[0]);
      }
      getGraphSelectElement().data('selected', clickedSelectItem.data('graph'));
      getGraphSelectElement().find('.selected-graph-text').html(clickedSelectItem.html());
    }

    function loadGraphData(graphName) {
      showGraphLoading();
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
    }

    function showGraphLoading() {
      ProjectDetailView.getScope().find('section.graph .dimmer').addClass('active');
    }

    function hideGraphLoading() {
      ProjectDetailView.getScope().find('section.graph .dimmer').removeClass('active');
    }

  });
