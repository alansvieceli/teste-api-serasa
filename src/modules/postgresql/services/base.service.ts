import {
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    InsertResult,
    ObjectLiteral,
    Repository,
} from 'typeorm'

export abstract class BaseService<Entity extends ObjectLiteral> {
    constructor(protected readonly repository: Repository<Entity>) {}

    getRepository(): Repository<Entity> {
        return this.repository
    }

    async findOne(options: FindOneOptions<Entity>): Promise<Entity> {
        return this.repository.findOne(options)
    }

    async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
        return this.repository.find(options)
    }

    async insert(data: Array<Entity> | Entity): Promise<InsertResult> {
        return this.repository.insert(data)
    }

    async delete(criteria: FindOptionsWhere<Entity>): Promise<DeleteResult> {
        return this.repository.delete(criteria)
    }
}
