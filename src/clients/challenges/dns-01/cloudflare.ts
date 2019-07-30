import {
  Challenge,
  Authorization,
  KeyAuthorization,
  ChallengeResponder
} from "../../../base/acme-client";

export interface CloudflareOptions {
  token: string;
  appId?: string;
};

export default function (options: CloudflareOptions) : ChallengeResponder {
  return {
    add: function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code here
    },
    remove: function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code gere
    }
  }
}