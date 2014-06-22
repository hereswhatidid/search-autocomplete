module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		uglify: {
			development: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					'js/search-autocomplete.dev.js': [
						'js/search-autocomplete.js'
					]
				}
			},
			production: {
				options: {
					compress: {
						global_defs: {
							'DEBUG': false
						},
						dead_code: true,
						drop_console: true
					}
				},
				files: {
					'js/search-autocomplete.min.js': [
						'js/search-autocomplete.js'
					]
				}
			}
		},
		watch: {
			js: {
				files: [
					'Gruntfile.js',
					'js/search-autocomplete.js'
				],
				tasks: ['uglify:development'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		},
		clean: {
			dist: [
				'js/search-autocomplete.min.js',
				'js/search-autocomplete.dev.js'
			]
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('default', [
		'clean',
		'uglify'
		]);
	grunt.registerTask('prod', [
		'clean',
		'uglify:production'
		]);
	grunt.registerTask('dev', [
		'watch'
		]);

};
