import {
  Challenge,
  Authorization,
  KeyAuthorization,
  ChallengeResponder
} from "../../../base/acme-client";

export interface Route53Options {
  awsAccessClientKeyId: string;
  awsSecretAccessKey: string;
  tag?: Function;
};

export default function (options: Route53Options) : ChallengeResponder {
  return {
    add: function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code here
    },
    remove: function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code gere
    }
  }
}