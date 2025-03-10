import {Construct} from "constructs";
import {Stack} from "aws-cdk-lib";
import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {Bucket} from "aws-cdk-lib/aws-s3";
import {StringParameter} from "aws-cdk-lib/aws-ssm";

export class ConsumingStack extends Stack {

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const lambdaFunction = new Function(this, 'MyLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = async () => {};'),
        })

        // const myBucketArnParam = StringParameter.fromStringParameterName(this, 'MyBucketArn', 'MyBucketArn');
        const myBucketNameParam = StringParameter.fromStringParameterName(this, 'MyBucketArn', 'MyBucketArn');
        // const myBucket = Bucket.fromBucketArn(this, 'MyBucket', myBucketArnParam.stringValue);
        const myBucket = Bucket.fromBucketName(this, 'MyBucket', myBucketNameParam.stringValue); // In case of a bucket we don't even need to specify the ARN. We can reference it by name.

        myBucket.grantRead(lambdaFunction);
    }
}