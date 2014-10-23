var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/{%= identifier %}/'
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
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
    },
    jsonlint: {
      all: {
        src: [
          'pa/ammo/**/*.json',
          'pa/tools/**/*.json',
          'pa/units/**/*.json'
        ]
      },
    },
    json_schema: {
      all: {
        files: {
          'lib/schema.json': [
            'pa/ammo/**/*.json',
            'pa/tools/**/*.json',
            'pa/units/**/*.json'
          ]
        },
      },
    },
    // change local files in-place
    modify: {
      health: {
        filename_regexp: null,
        process: function(spec) {
          if (spec.max_health) {
            spec.max_health *= 2
          }
        }
      }
    },
    // copy files from PA, transform, and put into mod
    proc: {
      // form 1: just the relative path, media src is assumed
      adv_comfab: {
        targets: [
          'pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json'
        ],
        process: function(spec) {
          spec.build_metal_cost = 1000
        }
      },
      // form 2: munge one or more specs from PA into one in the mod
      antinuke: {
        src: [
          'pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json',
          'pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json'
        ],
        cwd: media,
        dest: 'pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json',
        process: function(spec, ammo) {
          spec.factory.default_ammo = [ spec.factory.initial_build_spec ]
          spec.build_metal_cost += ammo.build_metal_cost
          return spec
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-json-schema');

  grunt.registerTask('copy:unitFiles', 'copy files into the mod from PA', function() {
    var done = this.async()
    prompt.get(['filename_regexp'], function(err,result) {
      var specs = spec.specFiles(grunt, result.filename_regexp, media)
      spec.copyUnitFiles(grunt, specs)
      done()
    })
  })

  var modify = function(filename_regexp, process) {
    var specs = spec.specFiles(grunt, filename_regexp)
    spec.copyUnitFiles(grunt, specs, process)
  }

  grunt.registerMultiTask('modify', 'Modify unit files in place', function() {
    var process = this.data.process
    if (this.data.filename_regexp) {
      modify(this.data.filename_regexp, process)
    } else {
      var done = this.async()
      prompt.get(['filename_regexp'], function(err,result) {
        modify(result.filename_regexp, process)
        done()
      })
    }
  })

  grunt.registerMultiTask('proc', 'Process unit files into the mod', function() {
    if (this.data.targets) {
      var specs = spec.copyPairs(grunt, this.data.targets, media)
      spec.copyUnitFiles(grunt, specs, this.data.process)
    } else {
      var specs = this.filesSrc.map(function(s) {return grunt.file.readJSON(media + s)})
      var out = this.data.process.apply(this, specs)
      grunt.file.write(this.data.dest, JSON.stringify(out, null, 2))
    }
  })

  // Default task(s).
  grunt.registerTask('default', ['json_schema', 'jsonlint']);

};

