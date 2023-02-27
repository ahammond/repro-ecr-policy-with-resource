import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { AnyPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const r = new Repository(this, 'MyEcrRepo', {
      removalPolicy: RemovalPolicy.DESTROY,
    });
    r.addToResourcePolicy(new PolicyStatement({
      actions: ['ecr:GetDownloadUrlForLayer'],
      principals: [new AnyPrincipal()],
      // Every other resource policy I've ever written requires a resource.
      // They're really only good for limiting access within a resource.
      // I understand why they're allowed, but not why they're required.
      // Strangely, not only does Cfn for ECR not allow
      // us to specify a resource policy for a specific image,
      // it will straight up fail if a resource section is present at all.
      resources: ['*'], // This will break, so CDK should warn. At least until Cfn (and possibly ECR) is fixed.
    }));
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
new EcrStack(app, 'MyEcrStack',  { env: devEnv });

app.synth();