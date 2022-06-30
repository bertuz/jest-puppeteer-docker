const getConfig = require('../../../lib/config');

const baseConfig = getConfig();
const customConfig = Object.assign({}, baseConfig);

customConfig.useImage = 'bertuz/docker-chromium:chromium103.0.5060.53';

customConfig.connect.defaultViewport = {
    width: 500,
    height: 500
};

customConfig.chromiumFlags = ['–ignore-certificate-errors'];

module.exports = customConfig;
