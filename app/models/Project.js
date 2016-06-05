/**
 * @name ProjectModel
 */
define(function(){
    /**
     * @name Project
     * @param  {string} key
     */
    function Project(data){
        this.data = data;
    }

    Project.prototype.getData = function () {
        return this.data;
    };

    Project.prototype.setData = function (data) {
        this.data = data;
    };

    return Project;
});
