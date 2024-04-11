const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const fs = require('fs');

async function run () {
  core.notice('Deploying to Google Cloud Storage...');

  const bucket = core.getInput('bucket', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });
  const gcpKey = core.getInput('gcp-key', { required: true });
  const gcpServiceAccount = core.getInput('gcp-service-account', { required: true });

  // Write the service account credentials to a file
  const keyPath = './gcp-key.json';
  fs.writeFileSync(keyPath, gcpKey);

  // Authenticate with gcloud
  await exec.exec(`gcloud auth activate-service-account ${gcpServiceAccount} --key-file=${keyPath}`);

  // Upload dist files to cloud storage
  const cloudStorageUri = `gs://${bucket}`;
  exec.exec(`gcloud storage cp -r ${distFolder} ${cloudStorageUri}`);
}

run();