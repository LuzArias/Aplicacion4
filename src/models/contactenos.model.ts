import {Entity, model, property} from '@loopback/repository';

@model()
export class Contactenos extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<Contactenos>) {
    super(data);
  }
}

export interface ContactenosRelations {
  // describe navigational properties here
}

export type ContactenosWithRelations = Contactenos & ContactenosRelations;
