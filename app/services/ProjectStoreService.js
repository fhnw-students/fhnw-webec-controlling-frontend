/**
 * @name ProjectStoreService
 */
define(['models/Project'], function (Project) {
	/**
	 * The key for the local storage database
	 */
  var localStorageKey = 'fhnw-jira-selected-project';
  /**
   * Public API
   * All the returned function are available from outside
   */
  return {
    get: get,
    set: set,
    clear: clear
  };
  //////////////////////////////////////////////////////////////////////////////////
  /**
   * Returns the selected project
   *
   * @returns {Project}
   */
  function get() {
    return localStorage.getItem(localStorageKey);
  }
  /**
   * Saves the selected project in the local storage
	 *
   * @param  {Project} project
   */
  function set(key) {
    localStorage.setItem(localStorageKey, key);
  }
	/**
	 * Removes the selected project from the local storage.
	 */
  function clear() {
    localStorage.removeItem(localStorageKey);
  }

});
