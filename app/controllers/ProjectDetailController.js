/**
 * @name  ProjectDetailController
 */
define(['views/ProjectDetail', 'jquery', 'services/ProjectStoreService', 'models/Project'],
  function (ProjectDetailView, $, ProjectStoreService, Project) {
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
      ProjectDetailView.render({
        title: ''
      }, function () {
        afterRender();
      });
    }

    /**
     * Life cycle hooke after rendering the view
     */
    function afterRender() {
      setErrorMessage(false);
      setGraphLoading(true);
      // setTableLoading(true);
      var key = ProjectStoreService.get();
      Project.get(key)
        .then(function (response) {
          project = response;
          ProjectDetailView.getScope().find('.page-title').html(project.getData().name);
          setGraphSelectItem();
          bindEvents();
          loadGraphData(getSelectedGraph());
          loadResourceTable();
        })
        .catch(function (err) {
          setErrorMessage(true);
        });
    }

    /**
     * Binds all events to the view
     */
    function bindEvents() {
      getGraphSelectElement().find('a').on('click', onClickGraphSelectItem)
      getSettingsSelectElement().find('div.item').on('click', onClickSettingsSelectItem)
    }

    /**
     * Callback after a select item was selected
     */
    function onClickGraphSelectItem() {
      setGraphSelectItem($(this));
      loadGraphData(getSelectedGraph());
    }

    /**
     * Callback after a select item was selected
     */
    function onClickSettingsSelectItem() {
      switch ($(this).data('action')) {
        case 'update':
          window.location.hash = '#/projectform/edit';
          break;
        case 'destroy':
          openDestroyModal();
          break;
      }
    }

    /**
     * Opens confirmation dialog to delete a project
     */
    function openDestroyModal() {
      $('.ui.basic.modal')
        .modal({
          closable: false,
          onApprove: function () {
            removeProject();
          }
        })
        .modal('show');
    }

    /**
     * Deletes a project
     */
    function removeProject() {
      setModalLoading(true);
      var after = function (successful) {
        $('.ui.basic.modal').modal('hide');
        setModalLoading(false);
        if (successful) {
          window.location.hash = '#/dashboard';
        }
      };
      project.remove()
        .then(function () {
          after(true);
        })
        .catch(function () {
          after(false);
        });
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
     * Retruns the drop-down element of the settings selection
     *
     * @returns {DOMElement} - DropDown Element
     */
    function getSettingsSelectElement() {
      return ProjectDetailView.getScope().find('.settings-select');
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
        clickedSelectItem = $(getGraphSelectElement().find('a')[0]);
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
      setGraphLoading(true);
      setTimeout(function () {
        project.getGraphData(graphName)
          .then(function (data) {
            if (graph) {
              graph.destroy();
            }
            graph = new Chart($('#graph-container'), {
              type: 'line',
              data: data
            });
            setGraphLoading(false);
          }).catch(function (err) {
          console.error(err);
          setErrorMessage(true);
          setGraphLoading(false);
        });
      }, 100);
    }

    /**
     * Shows a loading dimmer over the graph's area
     */
    function setGraphLoading(isVisible) {
      var element = ProjectDetailView.getScope().find('section.graph .dimmer');
      setDimmer(element, isVisible);
    }

    /**
     * Shows a loading dimmer over the modal's area
     */
    function setModalLoading(isVisible) {
      var element = ProjectDetailView.getScope().find('.destroy-project.dimmer');
      setDimmer(element, isVisible);
    }

    /**
     * Shows and hides the dimmers
     *
     * @param  {DOMElement} element
     * @param  {boolean} isActive
     */
    function setDimmer(element, isActive) {
      if (isActive) {
        element.addClass('active');
      } else {
        element.removeClass('active');
      }
    }

    /**
     * Sets a error message to show the user that something went wrong
     *
     * @param  {boolean} hasFailed
     */
    function setErrorMessage(hasFailed) {
      var element = ProjectDetailView.getScope().find('.error-message');
      if (hasFailed) {
        element.removeClass('hidden');
      } else {
        element.addClass('hidden');
      }
    }

    /**
     * Loads the Resource Table
     */
    function loadResourceTable() {
      project.getResourceTableData()
        .then(function (list) {
          list = list.map(function (item) {
            item.relWorkload = parseInt(item.relWorkload.toFixed(0), 10);
            return item;
          });
          return ProjectDetailView.setListItems(list);
        })
        .catch(function (err) {
          console.error(err);
          setErrorMessage(true);
        });
    }

  });
