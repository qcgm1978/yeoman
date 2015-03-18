//'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inquirer = require("inquirer");
module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
        this.paths();
    },
    prompting: {
        promptReadme: function () {
            var done = this.async();
            // Have Yeoman greet the user.
            this.log(yosay(
                'Welcome to the ultimate ' + chalk.red('CommonModules') + ' generator!'
            ));
            var prompts = [{
                type: 'confirm',
                name: 'readme',
                message: 'Would you like to enable to generate README file by grunt-readme?',
                default: true
            }];
            this.prompt(prompts, function (props) {
                this.log(props.readme)
                this.hasReadMe = props.readme;
                done();
            }.bind(this));
        },
        promptGrunt: function () {
            var done = this.async();
            var prompts = [{
                type: 'confirm',
                name: 'grunt',
                message: 'Would you like to enable to install Grunt\'s command line interface and JavaScript Task Runner Grunt?',
                default: true
            }];
            this.prompt(prompts, function (props) {
                this.log(props.grunt)
                this.hasGrunt = props.grunt;
                done();
            }.bind(this));
        },
        promptJsDivision: function () {
            var done = this.async();
            var prompts = [{
                type: 'checkbox',
                choices: [
                    new inquirer.Separator("The usual JS modules:"),
                    {
                        name: "views",
                        checked: true,
                        disabled: 'forced choice'
                    },
                    {
                        name: "common"//custom widgets
                    },
                    {
                        name: "models(you may not choose the option if the code not complicated)",
                        value: 'models'
                    },
                    {
                        name: "controllers(you may not choose the option if the code not complicated)",
                        value: 'controllers'
                    },
                    {
                        name: "templates"
                    },
                    {
                        name: "libraries",//toolkits
                    },
                    {
                        name: "core"//an application core
                    }
                ],
                name: 'arrJsFolders',
                message: 'Would you like to divide js folders? Press space key to choose',
            }];
            this.prompt(prompts, function (props) {
                this.arrJsFolders = props.arrJsFolders;
                this.log(props, arguments.length)
                done();
            }.bind(this));
        },
        promptLibraryFolder: function () {
            var done = this.async();
            var prompts = [{
                type: 'checkbox',
                choices: [
                    new inquirer.Separator("The usual library modules:"),
                    {
                        name: "jQuery(It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers)",
                        value:'jquery',
                        checked: true
                    },
                    {
                        name: "jQuery UI(a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library)",
                        value:'jquery-ui'
                    },
                    {
                        name: "Backbone(gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface)",
                        value:'backbone'
                    },
                    {
                        name: "jQuery.loadTemplate(jQuery Template is a jQuery plugin that makes using templates easy and quick)",
                        value:'jquery-load-template'
                    },
                    {
                        name: "core(default core library is RequireJs, RequireJS is a JavaScript file and module loader)",//http://requirejs.org/docs/optimization.html#mainConfigFile
                        value:'requirejs'
                    }
                ],
                name: 'arrJsLibraries',
                message: 'Would you like to divide js folders? Press space key to choose',
                default: true
            }];
            this.prompt(prompts, function (props) {
                this.arrJsLibraries = props.arrJsLibraries;
                done();
            }.bind(this));
        },
        promptCssDivision: function () {
            var done = this.async();
            var prompts = [{
                type: 'checkbox',
                choices: [
                    new inquirer.Separator("The usual CSS modules:"),
                    {
                        name: "base",
                        checked: true,
                        disabled: 'forced choice'
                    },
                    {
                        name: "grids",
                    },
                    {
                        name: "forms"
                    },
                    {
                        name: "buttons",
                    },
                    {
                        name: "tables"
                    },
                    {
                        name: "menus",
                    }
                ],
                name: 'js folders',
                message: 'Would you like to divide js folders? Press space key to choose',
                default: true
            }];
            this.prompt(prompts, function (props) {
                this.someOption = props.someOption;
                done();
            }.bind(this));
        },

    },
    writing: {
        app: function () {
            this.gruntfile.insertConfig("readme", "{}");
        },
        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        }
    },
    install: function () {
        if (this.hasReadMe) {
            //this.npmInstall(['grunt-readme'], {'saveDev': true});
        }
        if (this.hasGrunt) {
            //this.npmInstall(['grunt-cli'], {'saveDev': false});
            //this.npmInstall(['grunt'], {'saveDev': true});
        }
    },
    paths: function () {
        this.destinationRoot();
        // returns '~/projects'
        this.destinationPath('index.js');
        // returns '~/projects/index.js'
    },
    end: function (data) {
        var targetPath = 'generator-common-modules/app/js/';
        this.arrJsFolders.push("views");
        for (var i = 0; i < this.arrJsFolders.length; i++) {
            this.mkdir(targetPath + this.arrJsFolders[i]);
        }
    }
});
