import {
  Challenge,
  Authorization,
  KeyAuthorization  
} from "acme-client";

import fs from 'fs';
import { join } from 'path';
import { ChallengeResponder } from '../../definitions';
import { promisify } from "util";

export interface FilesystemOptions {
  directory: string;
  mkdirRecursive: boolean;
  chmod?: string;
};

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

export const createHttpResponder = function (options: FilesystemOptions) : ChallengeResponder {
  return {
    add: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      
      // TODO: Make dir if not exists

      let name = join(options.directory, challenge.token);
      await writeFileAsync(name, key);      
      return 'ok';
    },
    remove: async function (authz: Authorization, challenge: Challenge, key: KeyAuthorization) {
      try {
        let name = join(options.directory, challenge.token);
        await unlinkAsync(name);
        return 'ok';
      } catch (e) {
        return 'fail';
      }
    }
  }
};

export default createHttpResponder;