import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { AddressService } from 'src/application/services/address.service'
import {
  CreateAddressSchema,
  type CreateAddressDto,
} from '../dto/create-address.dto'
import { ZodValidationPipe } from '../pipe/zod-validation.pipe'

@Controller('/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateAddressSchema))
  async create(@Body() payload: CreateAddressDto) {
    const address = await this.addressService.create(payload)
  }

  @Get()
  async getMany() {
    const addresses = await this.addressService.getMany()
    return addresses
  }
}
