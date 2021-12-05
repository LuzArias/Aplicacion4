import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly vendedors: HasManyRepositoryFactory<Vendedor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Administrador, dataSource);
    this.vendedors = this.createHasManyRepositoryFactoryFor('vendedors', vendedorRepositoryGetter,);
    this.registerInclusionResolver('vendedors', this.vendedors.inclusionResolver);
  }
}
