export interface BaseEntityProps {
  id: string
  createAt: Date
  updatedAt?: Date
}

export abstract class BaseEntity {
  private _id: BaseEntityProps['id']
  private _createAt: BaseEntityProps['createAt']
  private _updatedAt?: BaseEntityProps['updatedAt']
  constructor(props: BaseEntityProps) {
    Object.assign(this, props)
  }

  set id(id: string) {
    this._id = id
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createAt
  }

  get updatedAt() {
    return this._updatedAt
  }
}
