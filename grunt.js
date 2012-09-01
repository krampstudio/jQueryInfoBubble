module.exports = function(grunt){
	grunt.initConfig({
		pkg: '<json:package.json>',
  		meta: {
    		banner: '/**\n'+
					' * <%= pkg.name %> - v<%= pkg.version %> \n' +
					' * @author <%=pkg.author.name%> <<%=pkg.author.email%>>\n' +
					' * @license <%=pkg.licenses[0].url%>\n'+
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
		}
	});
};
