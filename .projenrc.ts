import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'repro-ecr-policy-with-resource',
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,
});
project.synth();