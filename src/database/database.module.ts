import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const getConfig = (env: ConfigService) => ({
  type: env.get('DATABASE_TYPE'),
  host: env.get('DATABASE_HOST'),
  port: env.get('DATABASE_PORT'),
  username: env.get('DATABASE_USERNAME'),
  password: env.get('DATABASE_PASSWORD'),
  database: env.get('DATABASE_DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => getConfig(env),
    }),
  ],
})
export class DatabaseModule {}
