import { BaseEntity, type BaseEntityProps } from './base.entity'
import type { Optional } from 'src/util/optional'
import { createId } from '@paralleldrive/cuid2'

interface PersonProps extends BaseEntityProps {
  name: string
  age: number
}

export class PersonEntity extends BaseEntity {
  private _name: PersonProps['name']
  private _age: PersonProps['age']

  private constructor(props: PersonProps) {
    super(props)
  }

  get name() {
    return this._name
  }

  get age() {
    return this._age
  }

  set name(name: string) {
    this._name = name
  }

  set age(age: number) {
    this._age = age
  }

  static createNew(props: Optional<PersonProps, 'createAt' | 'id'>) {
    return new PersonEntity({
      id: createId(),
      name: props.name,
      age: props.age,
      createAt: new Date(),
    })
  }
}
