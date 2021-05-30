import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Logger } from "@nestjs/common";
import { ConfigType } from "../config/configuration";

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
