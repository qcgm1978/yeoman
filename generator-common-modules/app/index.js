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
                        name: "jQuery(provides an easy-to-use API that works across a multitude of browsers)",
                        value: 'jquery',
                        checked: true
                    },
                    {
                        name: "jQuery UI(a curated set of user interface)",
                        value: 'jquery-ui'
                    },
                    {
                        name: "Backbone(gives structure to your existing API, undersore lib would install automatically)",
                        value: 'backbone'
                    },
                    {
                        name: "jQuery.loadTemplate(makes using templates easy and quick)",
                        value: 'jquery-load-template'
                    },
                    {
                        name: "core(default core library is RequireJs)",//http://requirejs.org/docs/optimization.html#mainConfigFile
                        value: 'requirejs'
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
        //promptDistributeJsFiles: function () {
        //    var done = this.async();
        //    var prompts = [{
        //        type: 'confirm',
        //        name: 'isDistributeFiles',
        //        message: 'Would you like to enable to copy js library mini files to relevant folders?',
        //        default: true
        //    }];
        //    this.prompt(prompts, function (props) {
        //        this.log(props.grunt)
        //        this.isDistributeFiles = props.isDistributeFiles;
        //        done();
        //    }.bind(this));
        //},
        promptCssLibrary: function () {
            var done = this.async();
            var prompts = [{
                type: 'confirm',
                name: 'hasPure',
                message: 'Would you like to download css library pure?',
                default: true
            }];
            this.prompt(prompts, function (props) {
                this.hasPure = props.hasPure;
                done();
            }.bind(this));
        },
    },
    writing: {
        app: function () {
            this.gruntfile.insertConfig("readme", "{}");
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
        if (this.arrJsLibraries.length) {
            //for(var i=0;i<this.arrJsLibraries.length;i++)
            //this.bowerInstall(this.arrJsLibraries[i])
        }
        if(this.hasPure){
            this.bowerInstall('pure')
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
        //if (this.isDistributeFiles) {
        //    var libraryFolder = 'generator-common-modules/app/js/libraries';
        //    var arrSourceFiles = [
        //        'bower_components/jquery/dist/jquery.min.js',
        //        'bower_components/backbone/backbone.js',
        //        'bower_components/jquery-load-template/jquery-loadTemplate/jquery.loadTemplate-1.4.5.min.js',
        //        'bower_components/requirejs/require.js',
        //        'bower_components/underscore/underscore-min.js'
        //    ];
        //    for (var i = 0; i < arrSourceFiles.length; i++) {
        //        this.copy(
        //            arrSourceFiles[i],
        //            libraryFolder
        //        );
        //    }
        //    this.directory(
        //        'bower_components/jquery-ui',
        //        libraryFolder
        //    );
        //}
    }
});
