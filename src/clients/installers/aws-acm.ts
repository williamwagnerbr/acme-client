import {
  Certificate,
  CertificateInstaller,
} from "../../base/acme-client";

export interface AcmOptions {
  awsAccessClientKeyId: string;
  awsSecretAccessKey: string;
  certificateArn?: string;
  filterCertificates?: Function;
  tag?: Function;
  createIfNotExists: boolean;
};

export default function (options: AcmOptions) : CertificateInstaller {
  return {
    install: function (names: Array<string>, certificate: Certificate) {
      // Code here
    }
  }
}