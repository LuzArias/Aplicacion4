import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Pedidos,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPedidosController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Pedidos belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async getPedidos(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Pedidos> {
    return this.productoRepository.pedidos(id);
  }
}
