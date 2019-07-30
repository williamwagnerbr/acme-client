import {
  Challenge,
  Authorization,
  KeyAuthorization  
} from "acme-client";

import { ChallengeResponder } from '../../definitions';

export interface FilesystemOptions {
  directory: string;
  makeDir: boolean;
  chmod?: string;
};

export default function (options: FilesystemOptions) : ChallengeResponder {
  return {
    add: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code here
    },
    remove: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code gere
    }
  }
}