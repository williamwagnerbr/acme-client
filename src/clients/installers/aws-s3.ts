import {
  Certificate,
  CertificateInstaller,
} from "../../base/acme-client";

export interface S3Options {
  awsAccessClientKeyId: string;
  awsSecretAccessKey: string;
  bucketName: string;
  folder?: string;
};

export default function (options: S3Options) : CertificateInstaller {
  return {
    install: function (names: Array<string>, certificate: Certificate) {
      // Code here
    }
  }
}