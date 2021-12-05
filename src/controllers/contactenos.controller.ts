import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Contactenos} from '../models';
import {ContactenosRepository} from '../repositories';

export class ContactenosController {
  constructor(
    @repository(ContactenosRepository)
    public contactenosRepository : ContactenosRepository,
  ) {}

  @post('/contactenos')
  @response(200, {
    description: 'Contactenos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contactenos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactenos, {
            title: 'NewContactenos',
            exclude: ['nombre'],
          }),
        },
      },
    })
    contactenos: Omit<Contactenos, 'nombre'>,
  ): Promise<Contactenos> {
    return this.contactenosRepository.create(contactenos);
  }

  @get('/contactenos/count')
  @response(200, {
    description: 'Contactenos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contactenos) where?: Where<Contactenos>,
  ): Promise<Count> {
    return this.contactenosRepository.count(where);
  }

  @get('/contactenos')
  @response(200, {
    description: 'Array of Contactenos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contactenos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contactenos) filter?: Filter<Contactenos>,
  ): Promise<Contactenos[]> {
    return this.contactenosRepository.find(filter);
  }

  @patch('/contactenos')
  @response(200, {
    description: 'Contactenos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactenos, {partial: true}),
        },
      },
    })
    contactenos: Contactenos,
    @param.where(Contactenos) where?: Where<Contactenos>,
  ): Promise<Count> {
    return this.contactenosRepository.updateAll(contactenos, where);
  }

  @get('/contactenos/{id}')
  @response(200, {
    description: 'Contactenos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contactenos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contactenos, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactenos>
  ): Promise<Contactenos> {
    return this.contactenosRepository.findById(id, filter);
  }

  @patch('/contactenos/{id}')
  @response(204, {
    description: 'Contactenos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactenos, {partial: true}),
        },
      },
    })
    contactenos: Contactenos,
  ): Promise<void> {
    await this.contactenosRepository.updateById(id, contactenos);
  }

  @put('/contactenos/{id}')
  @response(204, {
    description: 'Contactenos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contactenos: Contactenos,
  ): Promise<void> {
    await this.contactenosRepository.replaceById(id, contactenos);
  }

  @del('/contactenos/{id}')
  @response(204, {
    description: 'Contactenos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactenosRepository.deleteById(id);
  }
}
