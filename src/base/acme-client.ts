
export default class AcmeClientError extends Error {
  constructor (message: string) {
    super(message);
  }
}

export class BadCreateOrderError extends AcmeClientError {}
export class BadCreateCsrError extends AcmeClientError {}

export enum NameIdentifierType {
  DNS = 'dns'
};

export type KeyAuthorization = string;

export interface NameIdentifier {
  type: NameIdentifierType;
  value: string;
};

export enum ChallengeType {
  HTTP_01 = 'http-01',
  DNS_01 = 'dns-01'
}

export enum AuthorizationStatus {
  PENDING = 'pending',
  VALID = 'valid'
}

export interface Challenge {
  type: ChallengeType;
  url: string;
  token: string;
}

export interface Authorization {
  identifier: NameIdentifier;
  status: AuthorizationStatus;
  expires: string;
  challenges: Array<Challenge>;
  wildcard: boolean;
}

export interface CreateOrderOptions {
  identifiers: Array<NameIdentifier>
}

export interface CreateCsrOptions {
  commonName: string;
  altNames: Array<string>;
  country?: string;
  state?: string;
  locality?: string;
  organization?: string;
  organizationUnit?: string;
  emailAddress?: string;
  key?: string | Buffer;
}

export const validateNameIdentifier = function (nameIdentifier: NameIdentifier) {
  if (nameIdentifier.type !== 'dns') {
    throw new BadCreateOrderError('Identifier type invalid');
  }

  if (!nameIdentifier.value) {
    throw new BadCreateOrderError('Identifier value cannot be empty');
  }
}

export const validateCreateOrderOptions = function (createOrderOptions: CreateOrderOptions) {
  if (!Array.isArray(createOrderOptions.identifiers)) {
    throw new BadCreateOrderError('identifiers must be a valid array');
  }

  createOrderOptions.identifiers.forEach(function (identifier) {
    validateNameIdentifier(identifier);
  });
}

export const validateCsrOptions = function (csrOptions : CreateCsrOptions) {
  if (!csrOptions.commonName) {
    throw new BadCreateCsrError('Param commonName cannot be empty');
  }

  if (!csrOptions.altNames) {
    if (Array.isArray(csrOptions.altNames)) {
      throw new BadCreateCsrError('Param commonName should be an valid array');
    }
  }
}

export interface ChallengeResponder {
  add: Function;
  remove: Function;
}

export interface CertificateInstaller {
  install: Function;
}

export interface Certificate {
  names: Array<string>;
  certificate: string;
  privateKey: string;
  fullChain?: string;
}