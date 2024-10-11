import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core'
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { UserEntity } from '@modules/postgresql/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { UserDto } from '../dtos/user.dto'

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper)
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(mapper, UserEntity, UserDto)
            createMap(mapper, UserDto, UserEntity)

        }
    }
}
