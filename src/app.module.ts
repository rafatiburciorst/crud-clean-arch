import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonController } from './http/controllers/person.controller'
import { CreatePersonUseCase } from './core/use-case/create-person.use-case'
import { PersonRepository } from './infra/repository/person-repository'
import { DrizzleService } from './db'

@Module({
  imports: [],
  controllers: [AppController, PersonController],
  providers: [
    AppService,
    CreatePersonUseCase,
    PersonRepository,
    DrizzleService,
  ],
})
export class AppModule {}
