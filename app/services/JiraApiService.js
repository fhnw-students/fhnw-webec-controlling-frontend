/**
 * @name JiraApiService
 */
define(['jquery', 'services/SessionService'], function ($, SessionService) {
	/**
	 * This is the default jira backend uri
	 */
	var baseUrl = 'https://www.cs.technik.fhnw.ch/jira/rest';
	/**
	 * Route to the main jira api
	 */
	var jiraRoute = '/api/2';
	/**
	 * Route to the jira plugin tempo
	 */
	var tempoRoute = '/tempo-timesheets/3/worklogs';
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		getAllProjects: getAllProjects,
		getIssue: getIssue,
		getWorklogs: getWorklogs
  };
  //////////////////////////////////////////////////////////////////////////////////
	/**
	 * Request all jira projects of the user
	 *
	 * @returns {Promise<Object[]>} Collection of Jira projects
	 */
	function getAllProjects() {
		return requestJira('/project');
	}
	/**
	 * Request the issue with the given key
	 *
	 * @param  {string} key
	 * @returns {Promise<Object>} Jira issue
	 */
	function getIssue(key) {
		return requestJira('/issue', key);
	}
	/**
	 * @param  {any} projectKey
	 * @param  {any} dateFrom
	 * @param  {any} dateTo
	 * @returns {Promise<Object[]>} Collection of Jira worklogs
	 */
	function getWorklogs(projectKey, dateFrom, dateTo) {
		var url = tempoRoute + '/?projectKey=' + projectKey + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
		return request(url);
	}
	/**
	 * Makes a requst to the jira api backend
	 *
	 * @param  {string} url - rest api path
	 * @param  {string} key - identifier
	 * @returns  {Promise<Object[]>} Collection
	 */
	function requestJira(url, key) {
		var url = jiraRoute + url + (key) ? '/' + key : '',
		return request(url);
	}
	/**
	 * Makes a requst to the jira api backend
	 *
	 * @param  {string} url - rest api path
	 * @returns {Promise<Object[]>} Collection
	 */
	function request(url) {
		return new Promise(function (resolve, reject) {
			$.ajax({
        type: 'GET',
				url: baseUrl + url,
        cache: false,
				async: false,
				crossDomain: true,
				headers: {
					Accept: 'application/json; charset=utf-8',
					'Content-Type': 'application/json; charset=utf-8'
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + SessionService.getToken());
				}
      })
        .done(function (data) {
          resolve(data);
        })
        .fail(function (e) {
          reject(e);
        });
		});
	}

});
