import {
  Cert,
  CsrDomains
} from "acme-client";

//import { ACM } from 'aws-sdk';
import { CertificateInstaller } from '../definitions';

export interface FilesystemOptions {
  directory: string;
  useDomainFolder: boolean;
  saveMultipleCertificates: boolean;
};

export default function (options: FilesystemOptions) : CertificateInstaller {
  return {
    install: async function (names: CsrDomains, certificate: Cert) {
      throw new Error('Not available yet.');
    }
  }
}