import { Secret } from 'jsonwebtoken';
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URL: string;
      PORT: number;
      SECRET_KEY: Secret;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
