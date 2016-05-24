/**
 * @name ProjectModel
 */
define(function(){
    /**
     * @name Project
     * @param  {Object} params
     */
    function Project(params){
        this.pid = params.pid;
        this.name = params.name;
        this.weekload = params.weekload;
        this.maxhours = params.maxhours;
        this.rangestart = params.rangestart;
        this.rangeend = params.rangeend;
        this.description = params.description;
    }

    Project.prototype.save = function(){

    };

    return Project;
});
