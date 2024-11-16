import { UniqueEntityID } from '../value-objects/unique-entity-id'

export abstract class Entity<Props> {
  public id: UniqueEntityID
  public createdAt: Date
  public updatedAt: Date
  public props: Props

  constructor(
    props: Props,
    id?: UniqueEntityID,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id ?? new UniqueEntityID()
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = updatedAt ?? new Date()
    this.props = props
  }

  public serialize() {
    return {
      id: this.id.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props,
    }
  }

  public touch() {
    this.updatedAt = new Date()
  }
}
