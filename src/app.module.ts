import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigEnv } from '@common/config-module.env'
import { HomeModule } from '@modules/home/home.module';
import { HealthModule } from '@modules/health/health.module';
import { TokenModule } from '@modules/token/token.module';
import { UserModule } from '@modules/users/user.module';
import { PostgreSqlModule } from '@modules/postgresql/postgresql.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigEnv,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    HomeModule,
    // HealthModule,
    TokenModule,
    UserModule,
  ]
})
export class AppModule { }
