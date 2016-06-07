/**
 * @name UserModel
 */
define(function () {
    /**
     * @name User
     * @param  {string} name
     */
    function User(data) {
        this.data = data;
    }

    User.prototype.getData = function () {
        return this.data;
    };

    User.prototype.setData = function (data) {
        this.data = data;
    };

    return User;
});
