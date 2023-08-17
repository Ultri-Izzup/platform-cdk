import { SecurityGroup, Vpc } from "@aws-cdk/aws-ec2";
import * as rds from "@aws-cdk/aws-rds";
import * as core from "@aws-cdk/core";
import { siteConfig } from "./config";

export const DB_NAME = "ultri";

interface IUltriAppProps {
  vpc: Vpc;
}

export class Database extends core.Construct {
  cluster: rds.ServerlessCluster;
  securityGroup: SecurityGroup;

  constructor(scope: core.Construct, id: string, { vpc }: IUltriAppProps) {
    super(scope, id);

    this.securityGroup = new SecurityGroup(this, "DBSecurityGroup", {
      vpc,
      description: "Database ingress",
    });

    this.cluster = new rds.ServerlessCluster(this, "UltriCluster", {
      engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(
        this,
        "ParameterGroup",
        "default.aurora-postgresql10"
      ),
      defaultDatabaseName: DB_NAME,
      vpc,
      securityGroups: [this.securityGroup],
      clusterIdentifier: "ultri",
      scaling: {
        minCapacity: 2,
        maxCapacity: siteConfig.dbMaxCapacity,
        autoPause: core.Duration.hours(siteConfig.dbSleepHours),
      },
    });
  }
}
