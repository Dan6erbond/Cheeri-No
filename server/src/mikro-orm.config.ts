import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigType } from "./config/configuration";
import { getConfig } from "./database/helpers";

async function getCreds() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get<ConfigService<ConfigType>>(
    ConfigService,
  );
  const creds = configService.get<ConfigType["db"]>("db");
  return creds;
}

export default (async () => {
  const creds = await getCreds();
  const config = getConfig(creds);
  return config;
})();
