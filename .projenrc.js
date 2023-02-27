const { awscdk, javascript } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'repro-ecr-policy-with-resource',
  packageManager: javascript.PackageManager.NPM,
});
project.synth();