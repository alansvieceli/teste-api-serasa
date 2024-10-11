import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/config-typorm-module';
import { UserEntity } from './entities/user.entity';
import { UserPostgresqlService } from './services/user.postgresql.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  providers: [UserPostgresqlService],
  exports: [UserPostgresqlService],
})
export class PostgreSqlModule { }
