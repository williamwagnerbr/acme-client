import {
  Challenge,
  Authorization,
  KeyAuthorization
} from "acme-client";

import { ChallengeResponder } from '../../definitions';

export interface CloudflareOptions {
  email: string;
  key: string;
};

export const createDnsResponder = function (options: CloudflareOptions) : ChallengeResponder {
  return {
    add: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code here
    },
    remove: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code gere
    }
  }
}

export default createDnsResponder;