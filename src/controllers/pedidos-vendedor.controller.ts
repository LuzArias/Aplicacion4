import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Vendedor,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosVendedorController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Vendedor belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async getVendedor(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
  ): Promise<Vendedor> {
    return this.pedidosRepository.vendedor(id);
  }
}
