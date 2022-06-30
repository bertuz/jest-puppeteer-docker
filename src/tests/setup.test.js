const path = require('path');
const { spawn } = require('child_process');

describe('setup', () => {
    it.each`
        givenConfig                                                               | expectedOutput
        ${path.resolve(__dirname, '__fixtures__/jest-puppeteer.config.image.js')} | ${'chromium-image uses an image, skipping'}
        ${path.resolve(__dirname, '__fixtures__/jest-puppeteer.config.js')}       | ${'Setting Chromium version to rev-12345...'}
    `(
        'should set Chromium version correctly',
        async ({ givenConfig, expectedOutput }) => {
            const success = await spawnAndWaitFor(givenConfig, expectedOutput);
            expect(success).toBeTruthy();
        }
    );

    it.each`
        givenConfig                                                               | expectedOutput
        ${path.resolve(__dirname, '__fixtures__/jest-puppeteer.config.image.js')} | ${'Setting Chromium flags to –ignore-certificate-errors...'}
        ${path.resolve(__dirname, '__fixtures__/jest-puppeteer.config.js')}       | ${'Setting Chromium flags to –ignore-certificate-errors...'}
    `(
        'should set Chromium flags correctly',
        async ({ givenConfig, expectedOutput }) => {
            const success = await spawnAndWaitFor(givenConfig, expectedOutput);
            expect(success).toBeTruthy();
        }
    );
});

const spawnAndWaitFor = (givenConfigPath, output) => {
    return new Promise((resolve, reject) => {
        const env = Object.create(process.env);

        env.JEST_PUPPETEER_CONFIG = givenConfigPath;

        const childProcess = spawn('node', ['src/tests/__fixtures__/run.js'], {
            env
        });

        childProcess.stdout.on('data', data => {
            const dataStr = data.toString().trim();

            if (dataStr.indexOf(output) !== -1) {
                resolve(1);
                childProcess.kill('SIGINT');
            }
        });

        childProcess.stderr.on('data', () => {
            reject(0);
        });
    });
};
