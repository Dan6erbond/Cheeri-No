export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_HOST: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRESS_PASSWORD?: string;
      POSTGRES_PASSWORD_FILE?: string;
      JWT_KEY: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      [key: string]: string | undefined;
    }
  }
}
