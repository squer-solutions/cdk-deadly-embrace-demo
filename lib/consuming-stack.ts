import {Construct} from "constructs";
import {Stack, StackProps} from "aws-cdk-lib";
import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {Bucket} from "aws-cdk-lib/aws-s3";

interface ConsumingStackProps extends StackProps {
    bucket: Bucket;
}

export class ConsumingStack extends Stack {

    constructor(scope: Construct, id: string, props: ConsumingStackProps) {
        super(scope, id, props);

        const lambdaFunction = new Function(this, 'MyLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = async () => {};'),
        })

        props.bucket.grantRead(lambdaFunction);
    }
}