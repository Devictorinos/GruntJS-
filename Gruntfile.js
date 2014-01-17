module.exports = function(grunt) {

    //описываем конфигурацию
    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      jshint: {
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true,
            $: true,
            console: true
            }
        },
        '<%= pkg.name %>': {
        src: ['src/js/**/*.js']
        }
      },


      // // Metadata.
      // meta: {
      //     basePath: '..',
      //     srcPath: 'src/sass/',
      //     deployPath: 'dest/css/'
      // },


      concat: {
        dist: {
          src:['src/js/file1.js', 'src/js/file2.js'],
          dest: 'dest/js/build.js'
        }

      },

      uglify: {
        options: {
            stripBanners: true,
            banner: '/* <%= pkg.name %> -v <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> %>*/\n',
            
        },

        build: {
          src: 'dest/js/build.js',
          dest: 'dest/js/build.min.js'
        }
      },

      // cssmin: {
      //  combine: {
      //    files: {
      //      'path/to/output.css': ['path/to/input_one.css', 'path/to/input_two.css']
      //    }
      //  }
      // }


      cssmin: {
        with_banner: {
          options: {
            banner: '/* My minified CSS*/\n',
          },

          files: {
            'dest/css/style.min.css' : ['dest/css/main.css','dest/css/nnn.css']
          }
        }
      },

      watch: {
         coffee: {
         files: ['src/coffee/*.coffee'],
         tasks: ['coffee']

      },

      scripts: {
                files: ['src/js/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['jshint', 'concat', 'uglify', 'removelogging']  //при их изменении запускать следующие задачи
      },

      css: {
          files: ['dest/css/*.css','src/sass/*.scss'],
          tasks: ['cssmin','sass']
        }
      },

      removelogging: {
        dist: {
            src: "dest/js/build.min.js",
            dest: "dest/js/build.clean.js"
        }
      },

      // coffee:{
      //   glob_to_multiple: {
      //   expand: true,
      //   flatten: true,
      //   cwd: 'src/coffee',
      //   src: ['*.coffee'],
      //   dest: 'src/js/',
      //   ext: '.js'
      //   }

      // },

      sass: {
        dist: {
          options: {
            style: 'expanded'
          },

          
            files: {
              'dest/css/main.css': [ // в эту папку получиться скомпелированный и сконкатенированный css файл готовый для продакшена
                  'src/sass/style1.scss' 
                   //из этого файла              
                ]
            }
          
        }
      }
    
      // sass: {
      //   dist: {
      //       files: {
      //           '<%= meta.deployPath %>main.css':'<%= meta.srcPath %>style_one.scss'
      //       }
      //    }
      // },

      // requirejs: {
      //   compile: {
      //     options: {
      //       name: 'main',
      //       include: ['build'],
      //       baseUrl: "src/js",
      //       mainConfigFile: "src/js/build.js",
      //       out: "dest/js/main.min.js"
      //     }
      //   }
      // }

    });

    //подгружаем необходимые модули
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-contrib-sass');
   // grunt.loadNpmTasks('grunt-contrib-coffee');
   // grunt.loadNpmTasks('grunt-contrib-requirejs');

    //регистрируем задачу
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass',  'removelogging', 'watch']);
    grunt.registerTask('test', ['']);
};
