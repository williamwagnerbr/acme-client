import {
  Challenge,
  Authorization,
  KeyAuthorization,
  ChallengeResponder
} from "../../../base/acme-client";

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
    add: function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code here
    },
    remove: function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      // Code gere
    }
  }
}