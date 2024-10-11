import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('PG_HOST'),
            port: this.configService.get<number>('PG_PORT'),
            username: this.configService.get<string>('PG_USERNAME'),
            password: this.configService.get<string>('PG_PASSWORD'),
            database: this.configService.get<string>('PG_DATABASE'),
            entities: [
                UserEntity
            ],
            ssl: false,
            logging: false,
            schema: 'public',
        }
    }
}
