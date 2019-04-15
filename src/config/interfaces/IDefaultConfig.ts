import { ELogLevel } from "../types/ELogLevel";

export interface IDefaultConfig {
    appEnv: string;
    nodeEnv: string;
    server: {
        port: number;
    };
    logLevel: ELogLevel;
}
