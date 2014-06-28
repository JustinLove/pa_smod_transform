var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var stream = '{%= stream %}'
var media = require('./lib/path').media(stream)
var build = 'ui/main/shared/js/build.js'

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            src: media + build,
            dest: build,
          },
        ],
      },
    },
    proc: {
      health: {
        filename_regexp: null,
        process: function(spec) {
          if (spec.max_health) {
            spec.max_health *= 2
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('copy:unitFiles', 'copy files into the mod from PA', function() {
    var done = this.async()
    prompt.get(['filename_regexp'], function(err,result) {
      var specs = spec.specFiles(grunt, result.filename_regexp, media)
      spec.copyUnitFiles(grunt, specs)
      done()
    })
  })

  var proc = function(filename_regexp, process) {
    var specs = spec.specFiles(grunt, filename_regexp)
    spec.copyUnitFiles(grunt, specs, process)
  }

  grunt.registerMultiTask('proc', 'Process unit files', function() {
    var process = this.data.process
    if (this.data.filename_regexp) {
      proc(this.data.filename_regexp, process)
    } else {
      var done = this.async()
      prompt.get(['filename_regexp'], function(err,result) {
        proc(result.filename_regexp, process)
        done()
      })
    }
  })

  grunt.registerTask('patch_67998', 'fixup specs for PTE changes', function() {
    var patch = require('./lib/patch_67998')
    patch.fixSpecs(grunt)
  })

  // Default task(s).
  grunt.registerTask('default', []);

};

