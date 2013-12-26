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
        intern: {
            browser: {
                options: {
                    runType: 'runner',
                    reporters: ['lcov', 'runner'],
                    config: 'test/intern-config.js'
                }
            },
            node: {
                options: {
                    runType: 'client',
                    reporters: ['lcov', 'console'],
                    config: 'test/intern-config.js'
                }
            }
        },
        jshint: {
            js: {
                options: {
                    jshintrc: 'lib/.jshintrc'
                },
                src: ['lib/**/*.js', '!lib/vendor/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js', '!test/lib/*.js']
            }
        },
        watch: {
            js: {
                files: '<%= jshint.js.src %>',
                tasks: ['jshint:js', 'connect:briefly', 'intern:node']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'connect:briefly', 'intern:node']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // Default task.
    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['jshint', 'intern:node']);

};
