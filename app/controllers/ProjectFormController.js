/**
 * @name  ProjectFormController
 */
define(['views/ProjectForm', 'semantic', 'models/Project'], function (ProjectFormView, $, Project) {
    /**
     * Public API
     */
    return {
        initialize: initialize
    };
    ///////////////////////////////////////////////////////////
    /**
     * Initialize this controller and renders the view
     */
    function initialize() {
        ProjectFormView.render({
            title: 'Bubu'
        }, function () {
            afterRender();
        });
    }
    /**
     * Life cycle hooke after rendering the view
     */
    function afterRender() {
        bindForm();
        bindEvents();
    }
    /**
     * Binds all events to the view
     */
    function bindEvents() {
        ProjectFormView.getScope().find('.save').on('click', onClickSave);
    }

    /**
     * Submits the form for a new project
     */
    function onClickSave(){
        ProjectFormView.getScope().find('.ui.form').submit();
    }

    /**
     * Binds all fields of the form to the view
     */
    function bindForm(){
        ProjectFormView.getScope().find('.ui.form').form({
            fields: {
                pid: {
                    identifier: 'pid',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a JIRA project key'
                        }
                    ]
                },
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a name for the project'
                        }
                    ]
                },
                weekload: {
                    identifier: 'weekload',
                    rules:[
                        {
                            type: 'integer[0..168]',
                            prompt: 'Please enter a valid number between 0 and 168'
                        }
                    ]
                },
                maxhours: {
                    identifier: 'maxhours',
                    rules:[
                        {
                            type: 'integer',
                            prompt: 'Please enter a valid number'
                        }
                    ]
                },
                rangestart: {
                    identifier: 'rangestart',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a start date for the project'
                        }
                    ]
                },
                rangeend: {
                    identifier: 'rangeend',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a end date for the project'
                        }
                    ]
                }
            },
            on: 'blur',
            onSuccess: function () {
                var project = new Project({
                    pid: LoginView.getScope().find('input[name="pid"]').val(),
                    name: LoginView.getScope().find('input[name="name"]').val(),
                    weekload: LoginView.getScope().find('input[name="weekload"]').val(),
                    maxhours: LoginView.getScope().find('input[name="maxhours"]').val(),
                    rangestart: LoginView.getScope().find('input[name="rangestart"]').val(),
                    rangeend: LoginView.getScope().find('input[name="rangeend"]').val(),
                    description: LoginView.getScope().find('input[name="description"]').val()
                });
                project.save();
                return false;
            }

        });

    }

});
