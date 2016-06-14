/**
 * @name ProjectModel
 */
define(['services/ApiService', 'jquery'], function (ApiService, $) {
  /**
   * Api object to the auth route
   */
  var api = ApiService('/projects');
  /**
   * Has some basic colors for the charts
   */
  var colors = [
    '#db2828',
    '#f2711c',
    '#fbbd08',
    '#b5cc18',
    '#21ba45',
    '#00b5ad',
    '#2185d0',
    '#6435c9',
    '#a333c8',
    '#e03997',
    '#a5673f',
    '#767676',
    '#1b1c1d',
  ];
  /**
   * Has all names of the months
   */
  var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];
  /**
   *
   */
  function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year
  }

  /**
   * @name Project
   * @param  {Object} data
   */
  function Project(data) {
    this.data = data;
    this.api = api;
    this.display = {
      rangestart: formatDate(new Date(this.data.rangestart)),
      rangeend: formatDate(new Date(this.data.rangeend))
    };
  }
  /**
   * Gets the models data
   *
   * @returns {Object} data
   */
  Project.prototype.getData = function () {
    return this.data;
  };
  /**
   * Updates the models data
   *
   * @param  {Object} data
   */
  Project.prototype.setData = function (data) {
    this.data = $.extend({}, this.data, data);
  };
  /**
   * Saves the model. If a user-id is given it updates the model,
   * otherwise it creates a new one.
   *
   * @returns Promise<Project>
   */
  Project.prototype.save = function () {
    var promise;
    if (this.data.uid) {
      promise = api.update(this.data.pid, this.data);
    } else {
      promise = api.create(this.data);
    }
    if (promise) {
      promise.then(function (data) {
        this.data = data;
        return this.data;
      });
    }
    return promise;
  };

  Project.prototype.remove = function () {
    return api.destroy(this.data.pid);
  };
  /**
   * Loads the graphs data from the backend
   *
   * @param  {string} projectKey
   * @param  {string} graphName
   * @returns {Promise<Object>}
   */
  Project.prototype.getGraphData = function (graphName) {
    return api.read(this.data.pid, '/' + graphName + '/graph')
      .then(function (data) {
        var indexColor = 0;
        data.datasets = data.datasets.map(function (dataset) {
          dataset.backgroundColor = 'transparent';
          dataset.borderColor = colors[indexColor++];
          dataset.fill = false;
          return dataset;
        });
        return data;
      });
  };
  /**
   * gets resource information for the table
   *
   * @returns {Promise<Object[]>}
   */
  Project.prototype.getResourceTableData = function () {
    return api.read(this.data.pid, '/resources/table')
  };
  /**
   * Public API
   */
  return {
    /**
     * Creates a new model
     *
     * @param  {Object} data
     * @returns {Project}
     */
    create: function (data) {
      return new Project(data);
    },
    /**
     * Loads all JIRA projects from the loged in user
     *
     * @returns {Promise<Object[]>}
     */
    getAllFromJira: function () {
      return api
        .custom('/all/projects');
    },
    /**
     * Loads all projects from our backend
     *
     * @returns {Promise<Project[]>}
     */
    getAll: function () {
      return api
        .read()
        .then(function (responseData) {
          return responseData.map(function (project) {
            return new Project(project);
          });
        });
    },
    /**
     * Loads the project with the given key from our backend
     *
     * @param {string} key of the project
     * @returns {Promise<Project>}
     */
    get: function (key) {
      return api
        .read(key)
        .then(function (responseData) {
          return new Project(responseData);
        });
    }
  };




});
