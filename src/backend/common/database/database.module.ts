import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

function DatabaseOrmModule(): DynamicModule[] {
  const config = new EnvService().read();
  const module = [];

  if (config.MONGODB_URI) {
    module.push(MongooseModule.forRoot(config.MONGODB_URI));
  }

  if (config.DB_HOST && config.DB_USERNAME && config.DATABASE) {
    module.push(
      TypeOrmModule.forRoot(
        process.env.NODE_ENV !== 'test'
          ? {
              name: 'default',
              type: 'mysql',
              host: config.DB_HOST,
              port: 3306,
              username: config.DB_USERNAME,
              password: config.DB_PASSWORD,
              database: config.DATABASE,
              synchronize: false,
              logging: true,
              timezone: '+09:00',
              entities: [], // 설정 부분
            }
          : {
              keepConnectionAlive: true,
              type: 'sqlite',
              database: 'moti',
              logging: false,
              verboseRetryLog: false,
              synchronize: true,
              entities: [], // 설정 부분
            },
      ),
    );
  }
  return module;
}

@Global()
@Module({
  imports: [EnvModule, ...DatabaseOrmModule()],
})
export class DatabaseModule {}
