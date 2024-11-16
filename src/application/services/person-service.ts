import { Injectable } from '@nestjs/common'
import { PersonEntity } from 'src/core/entities/person.entity'
import { PersonRepository } from 'src/infrastructure/repository/person-repository'
import type { CreatePersonDto } from 'src/interfaces/http/dto/create-person.dto'

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}
  async create(payload: CreatePersonDto) {
    const person = new PersonEntity({
      name: payload.name,
      age: payload.age,
      email: payload.email,
      password: payload.password,
    })

    await this.personRepository.create(person)
    return person
  }

  async getMany(): Promise<Record<string, unknown>[]> {
    const persons = await this.personRepository.getMany()
    return persons.map(person => {
      const entity = new PersonEntity({
        name: person.name,
        age: person.age,
        email: person.email,
        password: person.password,
      })
      return entity.toJSON()
    })
  }
}
