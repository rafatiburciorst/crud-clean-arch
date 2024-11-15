import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { CreatePersonUseCase } from 'src/core/use-case/create-person.use-case'
import { ZodValidationPipe } from '../pipe/zod-validation.pipe'
import {
  CreatePersonSchema,
  type CreatePersonDto,
} from '../dto/create-person.dto'

@Controller('/persons')
export class PersonController {
  constructor(private readonly createPersonUseCase: CreatePersonUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePersonSchema))
  async create(@Body() payload: CreatePersonDto) {
    const person = await this.createPersonUseCase.execute(payload)
    return person
  }
}
