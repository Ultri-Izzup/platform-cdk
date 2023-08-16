# Ultri Platform - AWS CDK

### Included:

* ECS fargate cluster
  * Lemmy-UI
  * Lemmy
  * Pictrs
  * IFramely
  * Ultri API
  * SuperTokens
* CloudFront CDN
* EFS storage for image uploads
* Aurora Serverless Postgres DB
* Redis cache
* Bastion VPC host
* Load balancers for Lemmy, IFramely, Ultri API
* DNS records for your site

## Lemmy Quickstart

Clone [Lemmy](https://github.com/LemmyNet/lemmy) and [Lemmy-UI](https://github.com/LemmyNet/lemmy-ui) to the directory above this.

```shell
cp example.env.local .env.local
# edit .env.local
```

You should edit .env.local with your site settings.

```shell
npm install -g aws-cdk
npm install
cdk bootstrap
cdk deploy
```

## Useful CDK commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
