import {
  Challenge,
  Authorization,
  KeyAuthorization,
  Cert,
  CsrDomains
} from "acme-client";

export interface ChallengeResponder {
  add(authz: Authorization, challenge: Challenge, key: KeyAuthorization) : Promise<any>;
  remove(authz: Authorization, challenge: Challenge, key: KeyAuthorization) : Promise<any>;
}

export interface CertificateInstaller {
  install (names: CsrDomains, Certificate: Cert) : Promise<any>;
}

export function chooseBestName (dnsName: string, nameList: Array<string>) : string {
  return '';
}