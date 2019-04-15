import convict = require("convict");

import { IDefaultConfig } from "./interfaces/IDefaultConfig";
import { ConfigSchema } from "./types/ConfigSchema";
import { ELogLevel } from "./types/ELogLevel";


export const CONFIG_DIR = "config";

export const PROVIDER_CONFIG = "PROVIDER_CONFIG";

export const DEFAULT_CONFIG_SCHEMA: ConfigSchema<IDefaultConfig> = {
    appEnv: {
        format: ["prod", "dev", "test"],
        default: "dev",
        arg: "appEnv",
        env: "APP_ENV"
    },
    nodeEnv: {
        format: ["production", "development"],
        default: "development",
        arg: "nodeEnv",
        env: "NODE_ENV"
    },
    server: {
        port: {
            format: "port",
            default: 8080,
            arg: "appPort",
            env: "APP_PORT"
        }
    },
    logLevel: {
        format: Object.keys(ELogLevel).map(k => ELogLevel[k]),
        default: ELogLevel.DEBUG,
        arg: "logLevel",
        env: "LOG_LEVEL"
    }
};

export const CUSTOM_CONVICT_FORMATS: { [name: string]: convict.Format } = {
    "float-percent": {
        validate: (val: any) => {
            if (val !== 0 && (!val || val > 1 || val < 0)) {
                throw new Error("must be a float between 0 and 1, inclusive");
            }
        },
        coerce: (val: any) => {
            return parseFloat(val);
        }
    },
    "hex-string": {
        validate: (val: any) => {
            if (/^[0-9a-fA-F]+$/.test(val)) {
                throw new Error("must be a hexidecimal string");
            }
        }
    }
};
