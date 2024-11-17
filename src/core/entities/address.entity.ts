import { UniqueEntityID } from '../value-objects/unique-entity-id'
import { Entity, type BaseEntityProps } from './entity'
import type { PersonEntity } from './person.entity'
import type { Optional } from 'src/util/optional'

interface AddressProps extends BaseEntityProps {
  street: string
  homeNumber: string | null
  district: string
  zipNumber: string
  person: PersonEntity
  personId: UniqueEntityID
}

export class AddressEntity extends Entity {
  private _street: string
  private _homeNumber: string | null
  private _district: string
  private _zipNumber: string
  private _person: PersonEntity
  private _personId: UniqueEntityID

  private constructor(data: AddressProps) {
    super(data)
    this._street = data.street
    this._homeNumber = data.homeNumber
    this._district = data.district
    this._zipNumber = data.zipNumber
    this._person = data.person
    this._personId = data.personId
  }

  public get street() {
    return this._street
  }

  public set street(value: string) {
    this._street = value
  }

  public get homeNumber(): string | null {
    return this._homeNumber
  }

  public set homeNumber(value: string) {
    this._homeNumber = value
  }

  public get district() {
    return this._district
  }

  public set district(value: string) {
    this._district = value
  }

  public get personId() {
    return this._personId
  }

  public set personId(value: UniqueEntityID) {
    this._personId = value
  }

  public get zipNumber() {
    return this._zipNumber
  }

  public set zipNumber(value: string) {
    this._zipNumber = value
  }

  public get person(): PersonEntity {
    return this._person
  }

  static createNew(
    data: Optional<AddressProps, 'id' | 'createdAt' | 'updatedAt'>,
    id = new UniqueEntityID()
  ): AddressEntity {
    return new AddressEntity({
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static createFrom(data: AddressProps): AddressEntity {
    return new AddressEntity(data)
  }

  serialize(): Record<string, unknown> {
    return {
      id: this.id.toString(),
      street: this.street,
      homeNumber: this.homeNumber,
      district: this.district,
      zipNumber: this.zipNumber,
      person: {
        ...this.person.serialize(),
      },
    }
  }
}
