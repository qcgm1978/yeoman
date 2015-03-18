module.exports = function (grunt) {
    'use strict';
    //require('nopt-grunt')(grunt);
    //grunt.initOptions({
    //    // longhand
    //    'no-sort': {
    //        info: 'Some flag of interest.',
    //        type: Boolean
    //    },
    //
    //    // shorthand
    //    bar: [Number, null]
    //});
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= props.license %> */\n',
        // Task configuration
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/umweb remote.js'],
                dest: 'dist/umweb remote.js'
            }
        },
        uglify: {
            options: { banner: '<%= banner %>' },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/umweb remote.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: { src: 'gruntfile.js' },
            lib_test: {
                src: [
                    'lib/**/*.js',
                    'test/**/*.js'
                ]
            }
        },
        qunit: { files: ['test/**/*.html'] },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: [
                    'jshint:lib_test',
                    'qunit'
                ]
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    linkNatives: true,
                    //attributesEmit:true,
                    exclude: '',
                    paths: [
                        'js/',
                        'room/script/'
                    ],
                    //themedir: 'path/to/custom/theme/',
                    outdir: 'docs/docs/'    //'no-sort':''
                }
            }
        },
        plato: {
            your_task: {
                options: {
                    //jshint : false,
                    switchcase: false,
                    exclude: /(\.min)|(jquery.*)|(swfobject)\.js$/    // excludes source files finishing with ".min.js"
                },
                files: {
                    'docs/code-complexity-report': [
                        'js/*.js',
                        'room/script/**/*.js',
                        '!ajax.js',
                        '!content_zoom.js',
                        '!base64.js',
                        '!fauxconsole.js'
                    ]
                }
            }
        }    //    $ grasp -r -e 'calc($u, $t, $a, $n, $c)' -R 'calc({ user: {{u}}, target: {{t}}, action: {{a}}, amount: {{n}}, clear: {{c}} })' .
,
        readme: {}
    });
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-readme');
    grunt.loadNpmTasks('grunt-plato');    //grunt.registerTask('doc', ['yuidoc']);
};