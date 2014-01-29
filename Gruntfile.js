module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/* <%= pkg.name %>.js - v<%= pkg.version %>,' +
              ' @license <%= pkg.license %>,' +
              ' Copyright (c) <%= grunt.template.today("yyyy") %>' +
              ' <%= pkg.author.name %> */'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= meta.banner %>\n'
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        stripBanners: true,
        banner: '<%= meta.banner %>\n'
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    simplemocha: {
      all: {
        src: ['test/**/*.js'],
        options: {
          ui: 'bdd'
        }
      }
    },
    watch: {
      files: ['src/**/*.js', 'test/**/*.js'],
      tasks: ['test']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('build', ['jshint', 'concat','uglify', 'simplemocha']);
};