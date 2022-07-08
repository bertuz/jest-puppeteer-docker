const path = require('path');
const baseConfig = require('../lib/config')();

baseConfig.useDockerBuild = {
    dockerFile: 'Dockerfile',
    contextPath: path.join(__dirname, 'dockerFiles')
};

module.exports = baseConfig;
