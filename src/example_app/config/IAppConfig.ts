import { IDefaultConfig } from "../../config";

interface IGcpServiceConfig {
    saKeyPath: string;
}

interface IFirebaseAdminConfig extends IGcpServiceConfig {
    databaseURL: string;
    name?: string;
}

export interface IAppConfig extends IDefaultConfig {
    logFolder: string;
    firebaseAdmin: IFirebaseAdminConfig;
}
