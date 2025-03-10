import {Construct} from 'constructs';
import {RemovalPolicy, Stack, StackProps} from "aws-cdk-lib";
import {Bucket} from "aws-cdk-lib/aws-s3";
import {StringParameter} from "aws-cdk-lib/aws-ssm";

export class ProducingStack extends Stack {

  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'MyBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new StringParameter(this, 'BucketArn', {
      parameterName: 'MyBucketArn',
      stringValue: bucket.bucketArn,
    });

    new StringParameter(this, 'BucketName', {
      parameterName: 'MyBucketName',
      stringValue: bucket.bucketName,
    })
  }
}
