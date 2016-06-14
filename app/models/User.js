/**
 * @name UserModel
 */
define(function () {
	/**
	 * @name User
	 * @param  {Object} data
	 */
	function User(data) {
		this.data = data;
	}
	/**
	 * Gets the models data
	 *
	 * @returns {Object} data
	 */
	User.prototype.getData = function () {
		return this.data;
	};
	/**
	 * Updates the models data
	 *
	 * @param  {Object} data
	 */
	User.prototype.setData = function (data) {
		this.data = $.extend({}, this.data, data);
	};

	return User;
});
