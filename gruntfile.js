'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        testFolderToRun: process.env.TEST_TYPE_TO_RUN || "**",
        jasmine: {
            options: {
                helpers: 'test/*-helper.js',
                specs: ['test/<%= testFolderToRun %>/**/*.js']
            },
            pure: {
                src: ['lib/*.js'],
                options: {
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            paths: {
                                "knockout3": "test/vendor/knockout-3.0.0.debug"
                            }
                        }
                    }
                }
            },
            withCoverage: {
                src: ['lib/*.js'],
                options: {
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
                                    "lib": '.grunt/grunt-contrib-jasmine/lib/',
                                    "knockout3": "test/vendor/knockout-3.0.0.debug"
                                }
                            }
                        }
                    }
                }
            }
        },
        coveralls: {
            src: 'coverage-result/lcov.info'
        },
        dox: {
            options: {
                title: 'Knockout Dependency Graph'
            },
            files: {
                src: 'lib/',
                dest: 'docs'
            }
        },
        "gh-pages": {
            options: {
                base: '.'
            },
            src: 'docs/**/*'
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
                src: ['test/**/*.js', '!test/vendor/*.js']
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
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.loadNpmTasks('grunt-dox');
    grunt.loadNpmTasks('grunt-gh-pages');


    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // Default task.
    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['jshint', 'jasmine:pure']);

    grunt.registerTask('ci', ['test', 'coverage']);
    grunt.registerTask('coverage', ['jasmine:withCoverage', 'coveralls']);

    grunt.registerTask('browser-test', ['jasmine:pure:build', 'open:jasmine', 'connect:test:keepalive']);

};
