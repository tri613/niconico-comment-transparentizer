const { exec } = require('child_process');
const package = require('./package.json');

exec(`zip ${package.name}-${package.version}.zip ./src/*`);
