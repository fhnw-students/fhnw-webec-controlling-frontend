/**
 * @name ApiService
 */
define(['jquery', 'services/SessionService'], function ($, SessionService) {
	/**
	 * This is the default jira backend uri
	 */
	var baseUrl = 'http://fhnw.w3tec.ch/api/public';
	var baseUrl = 'http://api.wjc';
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		login: login,
		getAllProjects: getAllProjects
  };
  //////////////////////////////////////////////////////////////////////////////////

	function login(username, password) {
		SessionService.activate(username, password);
		return request('/login', 'POST', {
			username: username,
			password: password
		});
	}
	/**
	 * Request all jira projects of the user
	 *
	 * @returns {Promise<Object[]>} Collection of Jira projects
	 */
	function getAllProjects() {
		return request('/all/projects');
	}
	/**
	 * Makes a requst to the jira api backend
	 *
	 * @param  {string} url - rest api path
	 * @param  {string} key - identifier
	 * @returns  {Promise<Object[]>} Collection
	 */
	function request(url, key) {
		var url = jiraRoute + url + ((key === undefined) ? '' : '/' + key);
		return request(url);
	}
	/**
	 * Makes a requst to the jira api backend
	 *
	 * @param  {string} url - rest api path
	 * @returns {Promise<Object[]>} Collection
	 */
	function request(url, method, data) {
		return new Promise(function (resolve, reject) {
			var options = {
        type: method || 'GET',
				url: baseUrl + url,
        cache: false,
				async: false,
				// crossDomain: true,
				// xhrFields: {
				// 	withCredentials: true
				// },
				headers: {
					Accept: 'application/json; charset=utf-8',
					'Content-Type': 'application/json; charset=utf-8'
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + SessionService.getToken());
				}
      };

			if (data) {
				options.data = data;
			}

			$.ajax(options)
        .done(function (data) {
          resolve(data);
        })
        .fail(function (e) {
          reject(e);
        });
		});
	}

});
