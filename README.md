# PA Server Mod Balance Grunt

A [grunt-init](http://gruntjs.com/project-scaffolding) template for Planitary Annihilation balance server mod, set up to run grunt tasks.

run `npm install` to set up Grunt

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use the generated project in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

## Available Tasks

- copy:unitFiles - copy json files into the mod, with optional filename regexp
- copy:build - copy build.js into the mod
- copy:mod - copy the mod files into server_mods
- proc:health - process unit files; set up for double health as an example.  Expectation is that several proc:X tasks will me made.
- jsonlint - lint all the mod json files
- json_schema - partial validation of mod json files format using schema by exterminans https://forums.uberent.com/threads/wip-units-ammo-and-tools-json-validation-schema.60451/
- default: json_schema, jsonlint

For further modding info, check out the forums.

- https://forums.uberent.com/threads/pa-modding-reference-guides-applications-tools.48136/
- https://forums.uberent.com/threads/guide-getting-your-mod-on-pamm.55189/
