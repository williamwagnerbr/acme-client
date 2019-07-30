import {
  Challenge,
  Authorization,
  KeyAuthorization,  
} from "acme-client";

import { Route53 } from 'aws-sdk';
import { ChallengeResponder } from '../../definitions';
import { HostedZone } from "aws-sdk/clients/route53";

export interface Route53Options {
  awsAccesstKeyId: string;
  awsSecretAccessKey: string;
  tag?: Function;
};

export const createDnsResponder = function (options: Route53Options) : ChallengeResponder {

  let route53 = new Route53({
    accessKeyId: options.awsAccesstKeyId,
    secretAccessKey: options.awsSecretAccessKey
  });

  return {
    add: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      let params = {
        DNSName: authz.identifier.value
      };

      let response = await route53.listHostedZonesByName(params).promise();      
      console.log('zonas', response);

      await Promise.all(response.HostedZones.map(function (zone: HostedZone) {
        let changeParams : any = {
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
    },
    remove: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      return false;
    }
  }
}

export default createDnsResponder;