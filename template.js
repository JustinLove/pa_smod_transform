'use strict';

// Basic template description.
exports.description = 'Create a minimal mod for Planitary Annihilation';

// Template-specific notes to be displayed before question prompts.
//exports.notes = ''

// Template-specific notes to be displayed after question prompts.
exports.after = "run `npm install` to set up Grunt."

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';



// The actual init template.
exports.template = function(grunt, init, done) {
  init.process({type: 'grunt'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'The best PA mod ever.'),
    init.prompt('author_name'),
    init.prompt('author_identifier', function(value, props, done) {
      done(null, 'pa.' + props.author_name + '.')
    }),
    init.prompt('identifier', function(value, props, done) {
      done(null, props.author_identifier + props.name)
    }),
    init.prompt('version'),
    init.prompt('licenses', 'Apache-2.0'),
    init.prompt('build'),
    init.prompt('stream', 'stable'),
  ], function(err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    //init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
