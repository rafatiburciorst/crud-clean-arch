import { UniqueEntityID } from '../value-objects/unique-entity-id'

export interface BaseEntityProps {
  id: UniqueEntityID
  createdAt: Date
  updatedAt: Date
}

export abstract class Entity {
  private readonly _id: UniqueEntityID
  private readonly _createdAt: Date
  private _updatedAt: Date

  constructor(data: BaseEntityProps) {
    this._id = data.id
    this._createdAt = data.createdAt
    this._updatedAt = data.updatedAt
  }

  abstract serialize(): Record<string, unknown>

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  set updatedAt(value: Date) {
    this._updatedAt = value
  }
}
