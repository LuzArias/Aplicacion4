import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Vendedor} from './vendedor.model';
import {Producto} from './producto.model';

@model()
export class Pedidos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  Producto: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  npedido: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  compra: string;

  @property({
    type: 'string',
    required: true,
  })
  financiado: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Vendedor)
  vendedorId: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Pedidos>) {
    super(data);
  }
}

export interface PedidosRelations {
  // describe navigational properties here
}

export type PedidosWithRelations = Pedidos & PedidosRelations;
