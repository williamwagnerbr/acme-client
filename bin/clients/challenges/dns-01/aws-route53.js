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
    let route53 = new aws_sdk_1.Route53({
        accessKeyId: options.awsAccesstKeyId,
        secretAccessKey: options.awsSecretAccessKey
    });
    return {
        add: function (authz, challenge, key) {
            return __awaiter(this, void 0, void 0, function* () {
                let params = {
                    DNSName: authz.identifier.value
                };
                let response = yield route53.listHostedZonesByName(params).promise();
                console.log('zonas', response);
                yield Promise.all(response.HostedZones.map(function (zone) {
                    let changeParams = {
                        ChangeBatch: {
                            Changes: []
                        }
                    };
                    changeParams.ChangeBatch.Changes.push({
                        Action: 'UPSERT',
                        ResourceRecordSet: {
                            Type: 'TXT',
                            Name: `_acme-challenge.${authz.identifier.value}`,
                            TTL: 1,
                            ResourceRecords: [
                                {
                                    Value: key
                                }
                            ]
                        }
                    });
                    return route53.changeResourceRecordSets(changeParams).promise();
                }));
                return false;
            });
        },
        remove: function (authz, challenge, key) {
            return __awaiter(this, void 0, void 0, function* () {
                return false;
            });
        }
    };
}
exports.default = default_1;
