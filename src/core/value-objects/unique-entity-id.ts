import { createId } from '@paralleldrive/cuid2'

export class UniqueEntityID {
  private readonly value: string

  constructor(id?: string) {
    this.value = id ?? createId()
  }

  public toString(): string {
    return this.value
  }

  public equals(id: UniqueEntityID): boolean {
    return this.value === id.toString()
  }
}
