import acme, { CreateCsrOptions, AcmeClientAutoOptions } from 'acme-client';
import { createHttpResponder, FilesystemOptions  } from './clients/challenges/http-01/filesystem';
import { ChallengeResponder } from './clients/definitions';

let csrOptions: CreateCsrOptions = {
  keySize: 2048,
  commonName: 'nekoweb.com.br',
  altNames: ['www.nekoweb.com.br']
};

acme.forge.createCsr(csrOptions)
  .then(async function ([ privateKey, csr ]) {

    console.log('Generated CSR', csr.toString('utf8'));
    console.log('PrivateKey', privateKey.toString('utf8'))

    let handlerOptions: FilesystemOptions = {
      directory: '/srv/.fake/.well-known/acme-challenge',
      mkdirRecursive: true,
      chmod: '777'
    };

    let challengeHandler: ChallengeResponder = createHttpResponder(handlerOptions);
    
    let acmeAutoOptions: AcmeClientAutoOptions = {
      termsOfServiceAgreed: true,
      csr: csr.toString('utf8'),
      challengeCreateFn: challengeHandler.add,
      challengeRemoveFn: challengeHandler.remove
    };

    let autoOptions : any = {
      directoryUrl: acme.directory.letsencrypt.staging,
      accountKey: privateKey.toString('utf8')
    };

    let client = new acme.Client(autoOptions);
    return client.auto(acmeAutoOptions);
  });