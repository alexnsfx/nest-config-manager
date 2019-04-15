import * as convict from "convict";
import * as dotenv from "dotenv";
import * as path from "path";

import { CONFIG_DIR, CUSTOM_CONVICT_FORMATS } from "../constants";
import { IDefaultConfig } from "../interfaces/IDefaultConfig";

export class ConfigManager<C extends IDefaultConfig> {
    private pathToConfig: string;
    private configSchema: convict.Schema<C>;
    private config: convict.Config<C>;

    constructor(pathToConfig: string, configSchema: convict.Schema<C>) {
        this.pathToConfig = pathToConfig;
        this.configSchema = configSchema;
    }

    public getConfig() {
        this.setup();
        return this.config.getProperties();
    }

    private setup() {
        this.loadDotEnv();

        this.loadCustomConvictFormats();
        this.config = convict(this.configSchema);

        const appEnv = this.config.get("appEnv");
        this.config.loadFile([
            path.join(this.pathToConfig, `config.common.json`),
            path.join(this.pathToConfig, `config.${appEnv}.json`)
        ]);

        // throws error if config does not conform to schema
        this.config.validate({ allowed: "strict" });
    }

    private loadDotEnv() {
        const dotenvConfig: dotenv.DotenvConfigOptions = {
            path: path.join(process.cwd(), CONFIG_DIR, ".env")
        };

        if (process.env.DEBUG !== undefined && process.env.DEBUG.startsWith("dotenv")) {
            dotenvConfig.debug = true;
        }

        // Loads .env file into process.env
        dotenv.config(dotenvConfig);
    }

    private loadCustomConvictFormats() {
        convict.addFormats(CUSTOM_CONVICT_FORMATS);
    }
}
