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
    return new Project(JSON.parse(localStorage.getItem(localStorageKey)));
  }
  /**
   * Saves the selected project in the local storage
	 *
   * @param  {Project} project
   */
  function set(project) {
    localStorage.setItem(localStorageKey, JSON.stringify(project.getData()));
  }
	/**
	 * Removes the selected project from the local storage.
	 */
  function clear() {
    localStorage.removeItem(localStorageKey);
  }

});
