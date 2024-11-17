import { Injectable } from '@nestjs/common'
import { AddressEntity } from 'src/core/entities/address.entity'
import { UniqueEntityID } from 'src/core/value-objects/unique-entity-id'
import type { CreateAddressDto } from 'src/interfaces/http/dto/create-address.dto'
import { PersonService } from './person.service'
import { AddressRepository } from 'src/infrastructure/repository/address-repository'
import { PersonEntity } from 'src/core/entities/person.entity'

@Injectable()
export class AddressService {
  constructor(
    private readonly personService: PersonService,
    private readonly addressRepository: AddressRepository
  ) {}
  async create(payload: CreateAddressDto) {
    const personId = new UniqueEntityID(payload.personId)
    const person = await this.personExists(personId)

    const adress = AddressEntity.createNew({
      street: payload.street,
      district: payload.district,
      homeNumber: payload.homeNumber,
      zipNumber: payload.zipNumber,
      personId,
      person: PersonEntity.createNew({
        ...person,
        id: new UniqueEntityID(person.id),
      }),
    })

    await this.addressRepository.create(adress)
  }

  private async personExists(id: UniqueEntityID) {
    return this.personService.findById(id)
  }

  async getMany() {
    const repository = await this.addressRepository.getMany()
    const data = repository.map(item => {
      const adress = AddressEntity.createFrom({
        ...item,
        id: new UniqueEntityID(item.id),
        personId: new UniqueEntityID(item.personId),
        person: PersonEntity.createFrom({
          ...item.person,
          id: new UniqueEntityID(item.person.id),
        }),
      }).serialize()
      return adress
    })
    return data
  }
}
