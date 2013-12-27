'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        jasmine: {
            src: ['lib/*.js'],
            options: {
                specs: 'test/*-test.js',
                helpers: 'test/*-helper.js',
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'coverage-result/coverage.json',
                    report: [
                        {
                            type: 'html',
                            options: {
                                dir: 'coverage-result'
                            }
                        },
                        {
                            type: 'lcov',
                            options: {
                                dir: 'coverage-result'
                            }
                        }
                    ],

                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            paths: {
                                "knockout3": "test/vendor/knockout-3.0.0.debug"
                            }
                        }
                    }
                }
            }
        },
        open: {
            jasmine: {
                path: 'http://127.0.0.1:8000/_SpecRunner.html'
            }
        },
        connect: {
            test: {
                port: 8000,
                keepalive: true
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib: {
                options: {
                    jshintrc: 'lib/.jshintrc'
                },
                src: ['lib/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'jasmine']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'jasmine']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // Coveralls running task
    grunt.registerTask('coveralls', 'Push coverage results to coveralls.io', function () {
        var done = this.async();

        var child_process = require('child_process');
        var coveralls = child_process.spawn("node",["node_modules/.bin/coveralls"], {
            stdio: ['pipe', process.stdout, process.stderr]
        });

        coveralls.on('exit', function (code) {
           done(code === 0);
        });

        var fs = require('fs');
        coveralls.stdin.end(fs.readFileSync('./coverage-result/lcov.info', 'utf8'));
    });

    // Default task.
    grunt.registerTask('default', ['test']);
    grunt.registerTask('ci', ['test', 'coveralls']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('integration-test', ['jasmine:src:build', 'open:jasmine', 'connect:test:keepalive']);

};
