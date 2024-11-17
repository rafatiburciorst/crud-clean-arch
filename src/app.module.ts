import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonRepository } from './infrastructure/repository/person-repository'
import { DrizzleService } from './infrastructure/db'
import { PersonController } from './interfaces/http/controllers/person.controller'
import { PersonService } from './application/services/person.service'
import { AddressController } from './interfaces/http/controllers/address.controller'
import { AddressService } from './application/services/address.service'
import { AddressRepository } from './infrastructure/repository/address-repository'

@Module({
  controllers: [AppController, PersonController, AddressController],
  providers: [
    AppService,
    DrizzleService,
    PersonService,
    PersonRepository,
    AddressService,
    AddressRepository,
  ],
})
export class AppModule {}
