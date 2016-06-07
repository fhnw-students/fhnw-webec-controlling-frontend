/**
 * @name ProjectModel
 */
define(['services/ApiService'], function (ApiService) {
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

  Project.prototype.getData = function () {
    return this.data;
  };

  Project.prototype.setData = function (data) {
    this.data = data;
  };

  Project.prototype.create = function () {
    return api.create(this.data);
  };

  Project.prototype.update = function () {
    return api.update(this.data.pid, this.data);
  };

  Project.prototype.remove = function () {
    return api.destroy(this.data.pid);
  };
  /**
   * @param  {string} projectKey
   * @param  {string} graphName
   * @returns {Promise<Object>}
   */
  Project.prototype.getGraphData = function (graphName) {
    return api.read('/' + this.data.pid + '/' + graphName + '/graph')
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
  }
  /**
   * Public API
   */
  return {
    create: function (data) {
      return new Project(data);
    },
    getAllFromJira: function () {
      return api
        .custom('/all/projects');
    },
    getAll: function () {
      return api
        .read()
        .then(function (responseData) {
          return responseData.map(function (project) {
            return new Project(project);
          });
        });
    },
    get: function (key) {
      return api
        .read(key)
        .then(function (responseData) {
          return new Project(responseData);
        });
    }
  };
});
