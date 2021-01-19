const { execSync, exec } = require('child_process');
const package = require('./package.json');

const name = `${package.name}-${package.version}`;

execSync(`cp -r ./src ./${name}`);
execSync(`zip -r ${name}.zip ./${name}`);
exec(`rm -rf ./${name}`);
