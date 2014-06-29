# {%= title %}

{%= description %}

## Features

- Rainbows
- Unicorns

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

### Available Tasks

- copy:unitFiles - copy json files into the mod, with optional filename regexp
- copy:build - copy build.js into the mod
- proc:health - process unit files; set up for double health as an example.  Expectation is that several proc:X tasks will me made.
- patch_67998 - rename the fired property, and edit anim_trees paths.
- jsonlint - lint all the mod json files
- json_schema - partial validation of mod json files format using schema by exterminans https://forums.uberent.com/threads/wip-units-ammo-and-tools-json-validation-schema.60451/
- default: json_schema, jsonlint
