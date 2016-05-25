/**
 * @name JiraApiService
 */
define(['jquery', 'services/SessionService'], function ($, SessionService) {
	var baseUrl = 'https://www.cs.technik.fhnw.ch/jira/rest/api/2';
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		getAllProjects: getAllProjects
  };
  //////////////////////////////////////////////////////////////////////////////////
	function getAllProjects() {
		return request('/project');
	}

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
					// xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
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
