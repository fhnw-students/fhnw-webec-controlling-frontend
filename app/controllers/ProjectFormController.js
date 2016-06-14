/**
 * @name  ProjectFormController
 */
define(['views/ProjectForm', 'semantic', 'models/Project', 'services/ProjectStoreService'], function (ProjectFormView, $, Project, ProjectStoreService) {
    /**
     * Variable current project
     */
    var project;
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
            title: isEdit() ? 'Edit' : 'Create',
            backUrl: isEdit() ? '#/detail' : '#/dashboard'
        }, function () {
            afterRender();
        });
    }


    /**
     * Check if form is used to edit or create a project
     *
     * @returns {boolean} is edit mode
     */
    function isEdit() {
        return window.location.hash === '#/projectform/edit';
    }

    /**
     * Life cycle hooke after rendering the view
     */
    function afterRender() {
        buildFormModel();
        bindForm();
        bindEvents();
    }

    function buildFormModel() {
        if (isEdit()) {
            var key = ProjectStoreService.get();
            setDimmer(true);
            setErrorMessage(false);
            Project.get(key)
                .then(function (_project) {
                    project = _project;
                    setFormProjectData();
                    setDimmer(false);
                })
                .catch(function (err) {
                    console.error(err);
                    setDimmer(false);
                    setErrorMessage(true);
                });
        } else {
            project = Project.create({});
        }
    }

    /**
     * Binds all events to the view
     */
    function bindEvents() {
        ProjectFormView.getScope().find('.save').on('click', onClickSave);
        ProjectFormView.getScope().find('#pid-dropdown').on('change', onChangeWriteName);
    }

    /**
     * Submits the form for a new project
     */
    function onClickSave() {
        ProjectFormView.getScope().find('.ui.form').submit();
    }

    /**
     * Writes Project Name to input field
     */
    function onChangeWriteName() {
        var text = ProjectFormView.getScope().find('#pid-dropdown option:selected').text();
        text = text.split(' - ');
        ProjectFormView.getScope().find('input[name="name"]').val(text[1]);
    }

    /**
     * Sets data in form for editing project
     */
    function setFormProjectData(){
        ProjectFormView.getScope().find('input[name="pid"]').val(project['data']['pid']);
        ProjectFormView.getScope().find('input[name="name"]').val(project['data']['name']);
        ProjectFormView.getScope().find('input[name="weekload"]').val(project['data']['weekload']);
        ProjectFormView.getScope().find('input[name="maxhours"]').val(project['data']['maxhours']);
        ProjectFormView.getScope().find('input[name="teamSize"]').val(project['data']['teamSize']);
        ProjectFormView.getScope().find('input[name="rangestart"]').val(project['data']['rangestart']);
        ProjectFormView.getScope().find('input[name="rangeend"]').val(project['data']['rangeend']);
        ProjectFormView.getScope().find('input[name="description"]').val(project['data']['description']);
    }

    /**
     * Sets the loading dimmer over the whole page
     *
     * @param  {boolean} isPending
     */
    function setDimmer(isPending) {
        var element = ProjectFormView.getScope().find('.dimmer');
        if (isPending) {
            element.addClass('active');
        } else {
            element.removeClass('active');
        }
    }

    /**
     * Sets a error message to show the user that something went wrong
     *
     * @param  {boolean} hasFailed
     */
    function setErrorMessage(hasFailed) {
        var element = ProjectFormView.getScope().find('.error-message');
        if (hasFailed) {
            element.removeClass('hidden');
        } else {
            element.addClass('hidden');
        }
    }

    /**
     * Binds all fields of the form to the view
     */
    function bindForm() {
        if (isEdit()){
            ProjectFormView.getScope().find('#pid-dropdown').after('<input type="text" name="pid" disabled>');
            ProjectFormView.getScope().find('#pid-dropdown').remove();
        } else {
            ProjectFormView.getScope().find('#pid-dropdown').children('option').remove();
            ProjectFormView.getScope().find('#pid-dropdown').append('<option value="">JIRA Project Key</option>');
            Project.getAllFromJira().then(function (projects) {
                for (var i = 0; i < projects.length; i++) {
                    ProjectFormView.getScope().find('#pid-dropdown').append('<option value="' + projects[i]['key'] + '">' + projects[i]['key'] + ' - ' + projects[i]['name'] + '</option>');
                }
            });
            ProjectFormView.getScope().find('#pid-dropdown').dropdown();
        }
        ProjectFormView.getScope().find('.ui.form').form({
            fields: {
                pid: {
                    identifier: 'pid',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'JIRA Project Key: Please choose a project key'
                        }
                    ]
                },
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Name: Please enter a name for the project'
                        }
                    ]
                },
                weekload: {
                    identifier: 'weekload',
                    rules: [
                        {
                            type: 'integer[0..168]',
                            prompt: 'Week Load (in hours): Please enter a valid number between 0 and 168'
                        }
                    ]
                },
                maxhours: {
                    identifier: 'maxhours',
                    rules: [
                        {
                            type: 'integer',
                            prompt: 'Max Working Hours Per Person: Please enter a valid number'
                        }
                    ]
                },
                teamSize: {
                    identifier: 'teamSize',
                    rules: [
                        {
                            type: 'integer',
                            prompt: 'Teamsize: Please enter a valid number'
                        }
                    ]
                },
                rangestart: {
                    identifier: 'rangestart',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Start Date: Please enter a start date for the project'
                        }
                    ]
                },
                rangeend: {
                    identifier: 'rangeend',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'End Date: Please enter a end date for the project'
                        }
                    ]
                }
            },
            on: 'blur',
            onSuccess: function () {
                project.setData({
                    pid: ProjectFormView.getScope().find('#pid-dropdown option:selected').val(),
                    name: ProjectFormView.getScope().find('input[name="name"]').val(),
                    weekload: ProjectFormView.getScope().find('input[name="weekload"]').val(),
                    maxhours: ProjectFormView.getScope().find('input[name="maxhours"]').val(),
                    teamSize: ProjectFormView.getScope().find('input[name="teamSize"]').val(),
                    rangestart: ProjectFormView.getScope().find('input[name="rangestart"]').val(),
                    rangeend: ProjectFormView.getScope().find('input[name="rangeend"]').val(),
                    description: ProjectFormView.getScope().find('textarea[name="description"]').val()
                });
                project.save()
                    .then(function () {
                        window.location.hash = '#/dashboard';
                    })
                    .catch(function (err) {
                        console.error(err);
                        setDimmer(false);
                        setErrorMessage(true);
                    });
                return false;
            }

        });

    }

});
