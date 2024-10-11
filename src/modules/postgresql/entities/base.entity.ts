import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm'

export abstract class BasePostgreSqlEntity {
    @AutoMap()
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })  // Deixa o banco gerar o UUID
    id: string;

    @CreateDateColumn({
        name: 'createdat',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt?: Date
}
