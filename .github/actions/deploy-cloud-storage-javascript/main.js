const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run () {
  core.notice('Deploying to Google Cloud Storage...');
}

run();