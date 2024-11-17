import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-validation.pipe'
import {
  CreatePersonSchema,
  type CreatePersonDto,
} from '../dto/create-person.dto'
import { PersonService } from 'src/application/services/person.service'
import { PaginationMetadata } from '../dto/pagination-metadata'

@Controller('/persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePersonSchema))
  async create(@Body() payload: CreatePersonDto) {
    const person = await this.personService.create(payload)
    return {
      data: person,
    }
  }

  @Get()
  async getMany(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = ''
  ) {
    const persons = await this.personService.getMany(+page, +limit, search)
    const metadata = new PaginationMetadata(persons.length, +page, +limit)
    return {
      data: persons,
      metadata,
    }
  }

  @Get('/:id')
  async findById(@Param('id') personId: string) {
    const person = await this.personService.findById(personId)
    return {
      data: person,
    }
  }
}
