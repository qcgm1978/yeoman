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
                    },
                    {
                        name: "controllers(you may not choose the option if the code not complicated)",
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
                name: 'js folders',
                message: 'Would you like to divide js folders? Press space key to choose',
                default: true
            }];
            this.prompt(prompts, function (props) {
                this.someOption = props.someOption;
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
        promptLibraryFolder: function () {
            var done = this.async();
            var prompts = [{
                type: 'checkbox',
                choices: [
                    new inquirer.Separator("The usual library modules:"),
                    {
                        name: "jQuery(It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers)",
                        checked: true
                    },
                    {
                        name: "jQuery UI(a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library)",
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
        }
    },
    writing: {
        app: function () {
            this.gruntfile.insertConfig("readme", "{}");
            this.mkdir('/generator-common-modules/app');
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
            );
            this.fs.copy(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json')
            );
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
        if(this.hasGrunt){
            //this.npmInstall(['grunt-cli'], {'saveDev': false});
            //this.npmInstall(['grunt'], {'saveDev': true});

        }
    },
    paths: function () {
        this.destinationRoot();
        // returns '~/projects'
        this.destinationPath('index.js');
        // returns '~/projects/index.js'
    }
});
