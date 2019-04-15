import { Global, Module } from "@nestjs/common";
import * as path from "path";

import { ConfigManager, PROVIDER_CONFIG } from "../../../config";
import { CONFIG_SCHEMA } from "../../config/config.schema";

@Global()
@Module({
    providers: [{
        provide: PROVIDER_CONFIG,
        useFactory: () => {
            const configManager = new ConfigManager(
                path.join(process.cwd(), "config"),
                CONFIG_SCHEMA
            );

            return configManager.getConfig();
        }
    }],
    exports: [
        PROVIDER_CONFIG
    ]
})
export class ConfigModule { }
