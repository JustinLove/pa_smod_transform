# PA Server Mod Balance Grunt

A [grunt-init](http://gruntjs.com/project-scaffolding) template for Planitary Annihilation balance server mod, set up to run grunt tasks.

run `npm install` to set up Grunt

## Available Tasks

- copy:unitFiles - copy json files into the mod, with optional filename regexp
- copy:build - copy build.js into the mod
- proc:health - process unit files; set up for double health as an example.  Expectation is that several proc:X tasks will me made.
- patch_67998 - rename the fired property, and edit anim_trees paths.
- jsonlint - lint all the mod json files
- json_schema - partial validation of mod json files format using schema by exterminans https://forums.uberent.com/threads/wip-units-ammo-and-tools-json-validation-schema.60451/
- default: json_schema, jsonlint

For further modding info, check out the forums.

- https://forums.uberent.com/threads/pa-modding-reference-guides-applications-tools.48136/
- https://forums.uberent.com/threads/guide-getting-your-mod-on-pamm.55189/
