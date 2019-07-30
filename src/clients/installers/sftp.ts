import {
  Cert,
  CsrDomains
} from "acme-client";

//import { ACM } from 'aws-sdk';
import { CertificateInstaller } from '../definitions';

export interface AcmOptions {
  awsAccessClientKeyId: string;
  awsSecretAccessKey: string;
  certificateArn?: string;
  filterCertificates?: Function;
  tag?: Function;
};

export default function (options: AcmOptions) : CertificateInstaller {
  return {
    install: async function (names: CsrDomains, certificate: Cert) {
      // Code here
    }
  }
}