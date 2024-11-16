import { Entity } from './entity'

interface PersonProps {
  name: string
  age: number
  email: string
  password: string
}

export class PersonEntity extends Entity<PersonProps> {
  public get name() {
    return this.props.name
  }

  public get email() {
    return this.props.email
  }

  public get age() {
    return this.props.age
  }

  public get password() {
    return this.props.password
  }

  public set name(value: string) {
    this.touch()
    this.props.name = value
  }

  public set email(value: string) {
    this.touch()
    this.props.email = value
  }

  public set age(value: number) {
    this.touch()
    this.props.age = value
  }

  public set password(value: string) {
    this.touch()
    this.props.password = value
  }

  public toJSON(): Record<string, unknown> {
    const { password, ...rest } = this.props
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...rest,
    }
  }
}
