import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DrizzleError } from 'drizzle-orm'
import type { PersonEntity } from 'src/core/entities/person.entity'
import { DrizzleService } from 'src/infrastructure/db'
import { person } from 'src/infrastructure/db/schema'

@Injectable()
export class PersonRepository {
  constructor(private readonly drizzeService: DrizzleService) {}

  async create(data: PersonEntity) {
    try {
      await this.drizzeService.database.insert(person).values({
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        password: data.password,
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
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  async getMany() {
    try {
      const persons = await this.drizzeService.database.select().from(person)
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
}
