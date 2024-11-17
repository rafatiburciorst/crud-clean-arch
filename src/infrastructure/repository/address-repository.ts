import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DrizzleError } from 'drizzle-orm'
import { DrizzleService } from 'src/infrastructure/db'
import { addressTable } from 'src/infrastructure/db/schema'
import type { AddressEntity } from 'src/core/entities/address.entity'

@Injectable()
export class AddressRepository {
  constructor(private readonly drizzeService: DrizzleService) {}

  async create(data: AddressEntity) {
    try {
      await this.drizzeService.database.insert(addressTable).values({
        id: data.id.toString(),
        district: data.district,
        personId: data.personId.toString(),
        street: data.street,
        zipNumber: data.zipNumber,
        homeNumber: data.homeNumber,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.error({
          name: error.name,
          message: error.message,
        })
        throw new InternalServerErrorException()
      }
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  async getMany() {
    try {
      const addresses =
        await this.drizzeService.database.query.addressTable.findMany({
          with: {
            person: true,
          },
        })

      return addresses
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.error({
          name: error.name,
          message: error.message,
        })
        throw new InternalServerErrorException()
      }
      console.error(error)
      throw new InternalServerErrorException()
    }
  }
}
