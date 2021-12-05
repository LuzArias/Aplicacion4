import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const jwt = require("jsonwebtoken");
const generador = require("password-generator");
const cryptojs = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let clavecifrada = cryptojs.MD5(clave).toString();
    return clavecifrada;
  }
  IdentificarClie(usuario: string, clave: string) {
    try {
      let a = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}});
      return a;

    } catch {
      return false;
    }

  }
  GenerarTokenJWT(cliente: Cliente) {
    let token = jwt.sing({
      data: {
        id: cliente.id,
        correo: cliente.correo, nombres: cliente + " " + cliente.apellido
      }
    })
    return token;
  }
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT);
      return datos;

    } catch {

      return false;
    }

  }
}
