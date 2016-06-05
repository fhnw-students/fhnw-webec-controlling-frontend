/**
 * @name ApiService
 */
define(['jquery', 'services/SessionService', 'models/User', 'models/Project'], function ($, SessionService, User, Project) {
	/**
	 * This is the default jira backend uri
	 */
	var baseUrl = 'https://fhnw.w3tec.ch/api/public';
	// var baseUrl = 'http://api.wjc';

  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		login: login,
		logut: logut,
		getAllProjects: getAllProjects,
		getProjects: getProjects
  };
  //////////////////////////////////////////////////////////////////////////////////
	/**
	 * Saves the toke and tries to login to our backend.
	 * @param  {string} username
	 * @param  {string} password
	 * @returns {Promise<User>}
	 */
	function login(username, password) {
		return new Promise(function (resolve, reject) {
			SessionService.activate(username, password);
			request('/login', 'POST', {
				username: username,
				password: password
			})
				.then(function (res) {
					SessionService.setMySelf(new User(res));
					return resolve(SessionService.getMySelf());
				})
				.catch(function (err) {
					SessionService.clearToken();
					return reject(err);
				});
		});
	}
	/**
	 * Destroys the auth token from the localstorage
	 */
	function logut() {
		SessionService.clearToken();
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
	 * Request all my projects of the user
	 *
	 * @returns {Promise<Projects[]>} Collection of Jira projects
	 */
	function getProjects(key) {
		return request('/projects' + ((key) ? '/' + key : ''))
			.then(function (projects) {
				return projects.map(function (project) {
					return new Project(project);
				})
			});
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
