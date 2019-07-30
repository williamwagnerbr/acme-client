import {
  Cert,
  CsrDomains,
  PrivateKey
} from "acme-client";

type FullChain = string | Buffer;
import { ACM } from 'aws-sdk';
import { CertificateInstaller } from '../definitions';

export interface AcmOptions {
  awsAccesstKeyId: string;
  awsSecretAccessKey: string;
  certificateArn?: string;
  filterCertificates?: Function;
  tag?: Function;
  createIfNotExists: boolean;
};

interface CertificateInput {
  cert: Cert;
  privateKey: PrivateKey;
  fullChain: FullChain;
}

export default function (options: AcmOptions) : CertificateInstaller {

  const acm = new ACM({
    accessKeyId: options.awsAccesstKeyId,
    secretAccessKey: options.awsSecretAccessKey
  });  

  async function importCertificate (certificate: CertificateInput, certificateArn?: string) {
    let params: any = {
      Certificate: certificate.cert.toString('utf8'),
      PrivateKey: certificate.privateKey.toString('utf8'),
      CertificateChain: certificate.fullChain.toString('utf8')
    };

    if (certificateArn) {
      params.CertificateArn = certificateArn;
    }

    let result = acm.importCertificate(params).promise();
    return result;
  }

  return {
    install: async function (names: CsrDomains, certificate: Cert) {
      //let certificates = acm.listCertificates({}).promise();
      
      let importCertificateOptions: CertificateInput = {
        cert: certificate,
        privateKey: certificate,
        fullChain: certificate    
      };

      await importCertificate(importCertificateOptions);
      return false;
    }
  }
}