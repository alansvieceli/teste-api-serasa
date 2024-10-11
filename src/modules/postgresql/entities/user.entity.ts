import { Column, Entity } from 'typeorm'
import { BasePostgreSqlEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'user' })
export class UserEntity extends BasePostgreSqlEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @AutoMap()
  @Column({ type: 'int' })
  idade: number;
}
