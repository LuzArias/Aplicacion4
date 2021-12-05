import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contactenos, ContactenosRelations} from '../models';

export class ContactenosRepository extends DefaultCrudRepository<
  Contactenos,
  typeof Contactenos.prototype.nombre,
  ContactenosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Contactenos, dataSource);
  }
}
