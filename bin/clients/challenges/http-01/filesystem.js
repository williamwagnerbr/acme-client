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
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const util_1 = require("util");
;
const writeFileAsync = util_1.promisify(fs_1.default.writeFile);
const unlinkAsync = util_1.promisify(fs_1.default.unlink);
exports.createHttpResponder = function (options) {
    return {
        add: function (authz, challenge, key) {
            return __awaiter(this, void 0, void 0, function* () {
                // TODO: Make dir if not exists
                let name = path_1.join(options.directory, challenge.token);
                yield writeFileAsync(name, key);
                return 'ok';
            });
        },
        remove: function (authz, challenge, key) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let name = path_1.join(options.directory, challenge.token);
                    yield unlinkAsync(name);
                    return 'ok';
                }
                catch (e) {
                    return 'fail';
                }
            });
        }
    };
};
exports.default = exports.createHttpResponder;
