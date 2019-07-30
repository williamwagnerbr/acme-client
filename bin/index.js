"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acme_client_1 = __importDefault(require("acme-client"));
const filesystem_1 = require("./clients/challenges/http-01/filesystem");
let csrOptions = {
    keySize: 2048,
    commonName: 'nekoweb.com.br',
    altNames: ['www.nekoweb.com.br']
};
acme_client_1.default.forge.createCsr(csrOptions)
    .then(function ([privateKey, csr]) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Generated CSR', csr.toString('utf8'));
        console.log('PrivateKey', privateKey.toString('utf8'));
        let handlerOptions = {
            directory: '/srv/.fake/.well-known/acme-challenge',
            mkdirRecursive: true,
            chmod: '777'
        };
        let challengeHandler = filesystem_1.createHttpResponder(handlerOptions);
        let acmeAutoOptions = {
            termsOfServiceAgreed: true,
            csr: csr.toString('utf8'),
            challengeCreateFn: challengeHandler.add,
            challengeRemoveFn: challengeHandler.remove
        };
        let autoOptions = {
            directoryUrl: acme_client_1.default.directory.letsencrypt.staging,
            accountKey: privateKey.toString('utf8')
        };
        let client = new acme_client_1.default.Client(autoOptions);
        return client.auto(acmeAutoOptions);
    });
});
