import {
  Cert,
  CsrDomains
} from "acme-client";

//import { ACM } from 'aws-sdk';
import { CertificateInstaller } from '../definitions';

export interface S3Options {
  awsAccessClientKeyId: string;
  awsSecretAccessKey: string;
  bucketName: string;
  folder?: string;
};

export default function (options: S3Options) : CertificateInstaller {
  return {
    install: async function (names: CsrDomains, certificate: Cert) {
      // Code here
    }
  }
}