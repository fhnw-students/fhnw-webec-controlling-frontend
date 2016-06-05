/**
 * @name SessionService
 */
define([], function () {
	/**
	 * This is the logedin user
	 */
	var mySelf;
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		getMySelf: getMySelf,
		setMySelf: setMySelf,
		getToken: getToken,
		hasToken: hasToken,
		activate: activate,
		clearToken: clearToken
  };
  //////////////////////////////////////////////////////////////////////////////////
	/**
	 * Returns the logedin user
	 * @returns {User}
	 */
	function getMySelf() {
		return mySelf;
	}
	/**
	 * Stores a new logedin user
	 * @param  {User} user
	 */
	function setMySelf(user) {
		mySelf = user;
	}
	/**
	 * Builds the token with the username and the password. This is base 64
	 * encoding.
	 *
	 * @param  {string} username - this is the email of the user
	 * @param  {string} password
	 */
	function generateToken(username, password) {
		return btoa(username + ':' + password);
	}
	/**
	 * Tells if a token is given
	 *
	 * @returns {boolean} - hasToken
	 */
	function hasToken() {
		return getToken() !== null;
	}
	/**
	 * Returns the token from the local storage
	 *
	 * @returns {string} token
	 */
	function getToken() {
		return localStorage.getItem('token');
	}
	/**
	 * Activates a new session and build the new token and stores them in the local storage
	 *
	 * @param  {string} username
	 * @param  {string} password
	 */
	function activate(username, password) {
		localStorage.setItem('token', generateToken(username, password));
	}
	/**
	 * Removes the token from the local storage. This is used to kill a session
	 */
	function clearToken() {
		localStorage.removeItem('token');
	}

});
