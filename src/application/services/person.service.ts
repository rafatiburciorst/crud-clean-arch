import { Injectable, NotFoundException } from '@nestjs/common'
import { PersonEntity } from 'src/core/entities/person.entity'
import { UniqueEntityID } from 'src/core/value-objects/unique-entity-id'
import { PersonRepository } from 'src/infrastructure/repository/person-repository'
import type { CreatePersonDto } from 'src/interfaces/http/dto/create-person.dto'

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}
  async create(payload: CreatePersonDto) {
    const person = PersonEntity.createNew({
      name: payload.name,
      age: payload.age,
      email: payload.email,
      password: payload.password,
    })

    await this.personRepository.create(person)
    return person.serialize()
  }

  async getMany(): Promise<Record<string, unknown>[]> {
    const persons = await this.personRepository.getMany()
    return persons.map(person => {
      const entity = PersonEntity.createFrom({
        id: new UniqueEntityID(person.id),
        name: person.name,
        age: person.age,
        email: person.email,
        password: person.password,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
      })
      return entity.serialize()
    })
  }

  async findById(id: UniqueEntityID) {
    const person = await this.personRepository.findById(id)
    if (!person) throw new NotFoundException(`person ${id} not found`)
    return person
  }
}
