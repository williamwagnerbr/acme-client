import {
  Challenge,
  Authorization,
  KeyAuthorization
} from "acme-client";

import { ChallengeResponder } from '../../definitions';

export interface SftpConnection {
  host: string;
  user: string;
  password: string;
  port?: string;
}

export interface SftpOptions {
  connection: SftpConnection;
  directory: string;
  makeDir: boolean;
  chmod?: string;
};

export default function (options: SftpOptions) : ChallengeResponder {
  return {
    add: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code here
    },
    remove: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code gere
    }
  }
}