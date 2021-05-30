import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigType } from "./config/configuration";

async function getCreds() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get<ConfigService<ConfigType>>(
    ConfigService,
  );
  const creds = configService.get<ConfigType["db"]>("db");
  return creds;
}

export function getConfig(creds: ConfigType["db"]) {
  const logger = new Logger("MikroORM");
  const config = {
    ...creds,
    type: "postgresql",
    entities: ["./dist/**/*.entity.js"],
    entitiesTs: ["./src/**/*.entity.ts"],
    debug: true,
    highlighter: new SqlHighlighter(),
    migrations: {
      path: "./src/database/migrations",
    },
    logger: logger.log.bind(logger),
  } as Options;

  return config;
}

export default (async () => {
  const creds = await getCreds();
  const config = getConfig(creds);
  return config;
})();
