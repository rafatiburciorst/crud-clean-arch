import { Injectable } from '@nestjs/common'
import type { CreatePersonDto } from 'src/http/dto/create-person.dto'
import { PersonEntity } from '../entities/person.entity'
import { PersonRepository } from 'src/infra/repository/person-repository'

@Injectable()
export class CreatePersonUseCase {
  constructor(private readonly personRepository: PersonRepository) {}
  async execute(payload: CreatePersonDto) {
    const person = PersonEntity.createNew({
      name: payload.name,
      age: payload.age,
    })

    await this.personRepository.create(person)
    return person
  }
}
