import * as path from "path";

import { ConfigSchema, DEFAULT_CONFIG_SCHEMA } from "../../config";
import { IAppConfig } from "./IAppConfig";

export const CONFIG_SCHEMA: ConfigSchema<IAppConfig> = {
    ...DEFAULT_CONFIG_SCHEMA,
    logFolder: {
        format: String,
        default: path.join(process.cwd(), "logs")
    },
    firebaseAdmin: {
        saKeyPath: {
            format: String,
            default: "",
            arg: "firebaseSaKeyPath",
            env: "FIREBASE_SA_KEY_PATH",
            sensitive: true
        },
        databaseURL: {
            format: "url",
            default: "http://127.0.0.1",
            sensitive: true
        }
    }
};
