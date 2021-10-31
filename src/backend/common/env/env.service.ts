import * as fs from 'fs';

import * as dotenv from 'dotenv';

export interface EnvData {
  AWSAccessKeyId: string;
  AWSSecretKey: string;
  buket: string;
  privateKey: string;
  TZ: string;
  DB_USERNAME: string;
  DB_HOST: string;
  DB_PASSWORD: string;
  DSN: string;
  DATABASE: string;
  PORT: number;
  MONGODB_URI: string;

  APP_ENV: string;
  DB_PORT: string;
}

export class EnvService {
  private vars: EnvData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const data = dotenv.parse(fs.readFileSync(`.env`)) as unknown as EnvData;
    // const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

    data.APP_ENV = environment;
    data.PORT = parseInt(data.DB_PORT);

    this.vars = data as EnvData;
  }

  read(): EnvData {
    return this.vars;
  }

  isDev(): boolean {
    return this.vars.APP_ENV === 'development';
  }

  isProd(): boolean {
    return this.vars.APP_ENV === 'production';
  }
}
