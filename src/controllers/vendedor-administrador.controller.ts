import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vendedor,
  Administrador,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorAdministradorController {
  constructor(
    @repository(VendedorRepository)
    public vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Vendedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Vendedor.prototype.id,
  ): Promise<Administrador> {
    return this.vendedorRepository.administrador(id);
  }
}
