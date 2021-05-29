import fs from "fs";

const config = () => {
  let postgresPassword = process.env.POSTGRESS_PASSWORD;
  if (process.env.POSTGRES_PASSWORD_FILE) {
    postgresPassword = fs.readFileSync(
      process.env.POSTGRES_PASSWORD_FILE,
      "utf8",
    );
  }

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    auth: {
      jwtKey: process.env.JWT_KEY,
    },
    db: {
      host: process.env.POSTGRES_HOST,
      dbName: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: postgresPassword,
    },
  };
};

export type ConfigType = ReturnType<typeof config>;

export default config;
