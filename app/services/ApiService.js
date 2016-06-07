/**
 * @name ApiService
 */
define(['jquery', 'services/SessionService'], function ($, SessionService) {
	/**
	 * This is the default jira backend uri
	 */
	var baseUrl = 'https://fhnw.w3tec.ch/api/public';
  /**
   * Public API
   * All the returned function are available from outside
   */
	return function (route) {
		return {
			create: create,
			read: read,
			update: update,
			destroy: destroy,
			custom: custom
		};

		function create(data, path) {
			path = buildRoute(route, path);
			return request(path, 'POST', data);
		}

		function read(path, key) {
			path = buildRoute(route, path, key);
			return request(path, 'GET');
		}

		function update(key, data, path) {
			path = buildRoute(route, path, key);
			return request(path, 'PUT', data);
		}

		function destroy(path, key) {
			path = buildRoute(route, path, key);
			return request(path, 'DELETE');
		}

		function custom(path, method) {
			if (!path) {
				path = '';
			}
			return request(path, method || 'GET');
		}
	};
	//////////////////////////////////////////////////////////////////////////////////
	function buildRoute(route, path, key) {
		var uri = route;
		if (path && path.charAt(0) === '/') {
			uri += path;
			if (key) {
				uri += '/' + key;
			}
		} else {
			if (path && !key) {
				uri += '/' + path;
			} else {
				if (key) {
					uri += '/' + key;
				}
			}
		}
		return uri;
	}
	/**
	 * Makes a requst to the jira api backend
	 *
	 * @param  {string} url - rest api path
	 * @param  {string} method - http metohd (GET, POST, PUT, DELETE)
	 * @param  {any} data - payload
	 * @returns {Promise<Object[]>} Collection
	 */
	function request(url, method, data) {
		return new Promise(function (resolve, reject) {
			var options = {
        type: method || 'GET',
				url: baseUrl + url,
        cache: false,
				async: true,
				headers: {
					Accept: 'application/json; charset=utf-8',
					'Content-Type': 'application/json; charset=utf-8'
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Basic ' + SessionService.getToken());
				}
      };

			if (data) {
				options.data = JSON.stringify(data);
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
