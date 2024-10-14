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
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 60,
        ttl: seconds(60),
        blockDuration: seconds(20),
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigEnv,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    HomeModule,
    TokenModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
