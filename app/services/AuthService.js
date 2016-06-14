/**
 * @name ApiService
 */
define(['jquery', 'services/ApiService', 'services/SessionService', 'models/User'], function ($, ApiService, SessionService, User) {
	/**
	 * Api object to the auth route
	 */
	var api = ApiService('/auth');
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
		login: login,
		logout: logout
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
			api.create({
				username: username,
				password: password
			}, '/login')
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
	function logout() {
		SessionService.clearToken();
	}

});
