import {
  Certificate,
  CertificateInstaller,
} from "../../base/acme-client";

export interface FilesystemOptions {
  directory: string;
  useDomainFolder: boolean;
  saveMultipleCertificates: boolean;
};

export default function (options: FilesystemOptions) : CertificateInstaller {
  return {
    install: function (names: Array<string>, certificate: Certificate) {
      // Code here
    }
  }
}