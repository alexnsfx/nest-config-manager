import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/ConfigModule";

@Module({
  imports: [
    ConfigModule
  ]
})
export class ApplicationModule { }
