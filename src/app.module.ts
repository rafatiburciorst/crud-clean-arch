import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonRepository } from './infrastructure/repository/person-repository'
import { DrizzleService } from './infrastructure/db'
import { PersonController } from './interfaces/http/controllers/person.controller'
import { PersonService } from './application/services/person-service'

@Module({
  controllers: [AppController, PersonController],
  providers: [AppService, DrizzleService, PersonService, PersonRepository],
})
export class AppModule {}
