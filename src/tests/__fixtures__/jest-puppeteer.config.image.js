const getConfig = require('../../../lib/config');
const path = require('path');

const baseConfig = getConfig();
const customConfig = Object.assign({}, baseConfig);

customConfig.useDockerBuild = {
    dockerFile: 'Dockerfile',
    contextPath: path.join(__dirname, 'dockerFiles')
};

customConfig.connect.defaultViewport = {
    width: 500,
    height: 500
};

customConfig.chromiumFlags = ['–ignore-certificate-errors'];

module.exports = customConfig;
