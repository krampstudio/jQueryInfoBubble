module.exports = function(grunt){
	grunt.initConfig({
		pkg: '<json:package.json>',
  		meta: {
  			banner: '/**\n'+
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
					' * <%= pkg.name %> - v<%= pkg.version %> \n' +
					' * @author <%=pkg.author.name%> <<%=pkg.author.email%>>\n' +
					' * @license <%= _.pluck(pkg.licenses, "url").join(", ")\n'+
                    ' */'
		},
		min : {
			dist : {
				src: 'src/jquery.infobubble.js',
				dest: 'jquery.infobubble.min.js'
			}
		},
		concat : {
			dist : {
				src : [ '<banner>', 'jquery.infobubble.min.js'],
				dest: 'jquery.infobubble.min.js'
			}
		},
		qunit : {
			all : ['test/*.html']
		}
	});
	 grunt.registerTask('default', 'min concat');
};
