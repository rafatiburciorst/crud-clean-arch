import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-validation.pipe'
import {
  CreatePersonSchema,
  type CreatePersonDto,
} from '../dto/create-person.dto'
import { PersonService } from 'src/application/services/person-service'

@Controller('/persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePersonSchema))
  async create(@Body() payload: CreatePersonDto) {
    const person = await this.personService.create(payload)
    return person
  }

  @Get()
  async getMany() {
    const persons = await this.personService.getMany()
    return persons
  }
}
