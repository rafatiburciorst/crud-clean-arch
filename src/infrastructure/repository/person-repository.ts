import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DrizzleError, eq, exists } from 'drizzle-orm'
import type { PersonEntity } from 'src/core/entities/person.entity'
import type { UniqueEntityID } from 'src/core/value-objects/unique-entity-id'
import { DrizzleService } from 'src/infrastructure/db'
import { personTable } from 'src/infrastructure/db/schema'

@Injectable()
export class PersonRepository {
  constructor(private readonly drizzeService: DrizzleService) {}

  async create(data: PersonEntity) {
    try {
      await this.drizzeService.database.insert(personTable).values({
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.error({
          name: error.name,
          message: error.message,
        })
        throw new InternalServerErrorException()
      }
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  async getMany(page: number, limit: number, search: string) {
    console.log({ page, limit, search })
    try {
      const offset = (page - 1) * limit
      const persons =
        await this.drizzeService.database.query.personTable.findMany({
          where: (fields, operators) => {
            if (search) {
              return operators.like(fields.name, `%${search}%`)
            }
          },
          offset,
          limit,
        })
      return persons
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.error({
          name: error.name,
          message: error.message,
        })
        throw new InternalServerErrorException()
      }
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  async findById(id: UniqueEntityID) {
    try {
      const [person] = await this.drizzeService.database
        .select()
        .from(personTable)
        .where(eq(personTable.id, id.toString()))

      return person
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.error({
          name: error.name,
          message: error.message,
        })
        throw new InternalServerErrorException()
      }
      console.error(error)
      throw new InternalServerErrorException()
    }
  }
}
