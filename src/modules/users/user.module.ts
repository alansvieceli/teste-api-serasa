import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PostgreSqlModule } from '@modules/postgresql/postgresql.module';
import { UserProfile } from './profiles/user.profile';

@Module({
  imports: [PostgreSqlModule],
  controllers: [UserController],
  providers: [UserProfile, UserService],
})
export class UserModule { }