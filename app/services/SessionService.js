/**
 * @name SessionService
 */
define([], function () {
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		getToken: getToken,
		hasToken: hasToken,
		activate: activate,
		clearToken: clearToken
  };
  //////////////////////////////////////////////////////////////////////////////////
	function generateToken(username, password) {
		return btoa(username + ':' + password);
	}

	function hasToken() {
		return getToken() !== null;
	}

	function getToken() {
		return localStorage.getItem('token');
	}

	function activate(username, password) {
		localStorage.setItem('token', generateToken(username, password));
	}

	function clearToken(token) {
		localStorage.removeItem('token');
	}

});
