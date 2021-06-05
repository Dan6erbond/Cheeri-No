import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { CompaniesModule } from "./companies/companies.module";
import configuration, { ConfigType } from "./config/configuration";
import { getConfig } from "./database/helpers";
import { ReasonsModule } from "./reasons/reasons.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigType>) =>
        getConfig(configService.get<ConfigType["db"]>("db")),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    ReasonsModule,
  ],
})
export class AppModule {}
