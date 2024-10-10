import { Module } from '@nestjs/common'
import { TokenController } from './controllers/token.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string | number>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [TokenController],
    providers: [JwtStrategy],
    exports: [JwtModule],
})
export class TokenModule { }
