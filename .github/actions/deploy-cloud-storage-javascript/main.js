const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const fs = require('fs');

function run () {
  core.notice('Deploying to Google Cloud Storage...');

  const bucket = core.getInput('bucket', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });
  const gcpKey = core.getInput('gcp-key', { required: true });

  // Write the key to a file
  const keyPath = './gcp-key.json';
  fs.writeFileSync(keyPath, gcpKey);

  // Authenticate with gcloud
  exec.exec(`gcloud auth activate-service-account --key-file=${keyPath}`);

  const cloudStorageUri = `gs://${bucket}`;
  exec.exec(`gcloud storage cp ${distFolder} ${cloudStorageUri}`);
}

run();