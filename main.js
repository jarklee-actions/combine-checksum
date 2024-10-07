const core = require('@actions/core');
const { createHash } = require('crypto');
const fs = require('fs');


const INPUTS = {
    files: 'files',
    fileSeparator: 'files_separator'
}

const OUTPUTS = {
    sha256: 'sha256',
    short256: 'short256',
}

function updateHash(hash, file) {
    return new Promise((resolve, reject) => {
        hash.update(`file:${file}\n`);
        fs.createReadStream(file)
            .on('data', (chunk) => {
                hash.update(chunk);
            })
            .on('end', resolve)
            .on('error', reject);
    });
}

async function run() {
    const fileSeparator = core.getInput(INPUTS.fileSeparator, { required: false }) || '\n';
    const files = core.getInput(INPUTS.files, { required: true })
        .split(fileSeparator)
        .map(it => it.trim())
        .filter(it => it.length > 0);

    try {
        const hash = createHash('sha256');
        hash.update('__init__\n');
        for (const file of files) {
            await updateHash(hash, file);
        }
        const hashString = hash.digest('hex');
        core.setOutput(OUTPUTS.sha256, hashString);
        core.setOutput(OUTPUTS.short256, hashString.substring(0, 6));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
