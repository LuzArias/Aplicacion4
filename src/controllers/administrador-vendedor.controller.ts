import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  Vendedor,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorVendedorController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/vendedors', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Vendedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vendedor>,
  ): Promise<Vendedor[]> {
    return this.administradorRepository.vendedors(id).find(filter);
  }

  @post('/administradors/{id}/vendedors', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vendedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {
            title: 'NewVendedorInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) vendedor: Omit<Vendedor, 'id'>,
  ): Promise<Vendedor> {
    return this.administradorRepository.vendedors(id).create(vendedor);
  }

  @patch('/administradors/{id}/vendedors', {
    responses: {
      '200': {
        description: 'Administrador.Vendedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {partial: true}),
        },
      },
    })
    vendedor: Partial<Vendedor>,
    @param.query.object('where', getWhereSchemaFor(Vendedor)) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.administradorRepository.vendedors(id).patch(vendedor, where);
  }

  @del('/administradors/{id}/vendedors', {
    responses: {
      '200': {
        description: 'Administrador.Vendedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vendedor)) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.administradorRepository.vendedors(id).delete(where);
  }
}
