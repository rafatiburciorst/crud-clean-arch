import type { Optional } from 'src/util/optional'
import { Entity, type BaseEntityProps } from './entity'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export interface PersonProps extends BaseEntityProps {
  name: string
  age: number
  email: string
  password: string
}

export class PersonEntity extends Entity {
  private _name: string
  private _age: number
  private _email: string
  private _password: string

  private constructor(data: PersonProps) {
    super(data)
    this._name = data.name
    this._age = data.age
    this._email = data.email
    this._password = data.password
  }

  static createNew(
    data: Optional<PersonProps, 'id' | 'createdAt' | 'updatedAt'>,
    id = new UniqueEntityID()
  ): PersonEntity {
    return new PersonEntity({
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static createFrom(data: PersonProps): PersonEntity {
    return new PersonEntity(data)
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get age(): number {
    return this._age
  }

  set age(value: number) {
    this._age = value
  }

  get email(): string {
    return this._email
  }

  set email(value: string) {
    this._email = value
  }

  get password(): string {
    return this._password
  }

  set password(value: string) {
    this._password = value
  }

  serialize(): Record<string, unknown> {
    return {
      id: this.id.toString(),
      name: this._name,
      age: this._age,
      email: this._email,
      password: this._password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
