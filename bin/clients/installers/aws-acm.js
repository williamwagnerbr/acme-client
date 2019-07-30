"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
;
function default_1(options) {
    const acm = new aws_sdk_1.ACM({
        accessKeyId: options.awsAccesstKeyId,
        secretAccessKey: options.awsSecretAccessKey
    });
    function importCertificate(certificate, certificateArn) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                Certificate: certificate.cert.toString('utf8'),
                PrivateKey: certificate.privateKey.toString('utf8'),
                CertificateChain: certificate.fullChain.toString('utf8')
            };
            if (certificateArn) {
                params.CertificateArn = certificateArn;
            }
            let result = acm.importCertificate(params).promise();
            return result;
        });
    }
    return {
        install: function (names, certificate) {
            return __awaiter(this, void 0, void 0, function* () {
                //let certificates = acm.listCertificates({}).promise();
                let importCertificateOptions = {
                    cert: certificate,
                    privateKey: certificate,
                    fullChain: certificate
                };
                yield importCertificate(importCertificateOptions);
                return false;
            });
        }
    };
}
exports.default = default_1;
