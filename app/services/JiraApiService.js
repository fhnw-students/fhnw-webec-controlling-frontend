/**
 * @name JiraApiService
 */
define(['jquery', 'services/SessionService'], function ($, SessionService) {
	/**
	 * This is the default jira backend uri
	 */
	var baseUrl = 'https://www.cs.technik.fhnw.ch/jira/rest/api/2';
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		getAllProjects: getAllProjects
  };
  //////////////////////////////////////////////////////////////////////////////////
	/**
	 * Request all jira projects of the user
	 */
	function getAllProjects() {
		return request('/project');
	}
	/**
	 * Makes a requst to the jira api backend
	 *
	 * @param  {string} url - rest api path
	 * @return {Promise<Object[]>} Collection
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
