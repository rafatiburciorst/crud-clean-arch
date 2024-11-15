import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DrizzleError } from 'drizzle-orm'
import type { PersonEntity } from 'src/core/entities/person.entity'
import { DrizzleService } from 'src/db'
import { person } from 'src/db/schema'

@Injectable()
export class PersonRepository {
  constructor(private readonly drizzeService: DrizzleService) {}

  async create(data: PersonEntity) {
    try {
      await this.drizzeService.database.insert(person).values({
        name: data.name,
        age: 38,
        createdAt: data.createdAt,
      })
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.error({
          name: error.name,
          message: error.message,
        })
        throw new InternalServerErrorException()
      }
      throw new InternalServerErrorException()
    }
  }
}
