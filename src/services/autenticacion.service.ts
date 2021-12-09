import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const jwt = require("jsonwebtoken");
const generador = require("password-generator");
const cryptojs = require("crypto-js");
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
      let c = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}});
      return c;

    } catch {
      return false;
    }

  }
  GenerarTokenJWT(cliente: Cliente) {
    let token = jwt.sing({
      data: {
        id: cliente.id,
        correo: cliente.correo, nombre: cliente + " " + cliente.apellido
      }
    }, llaves.claveJWT)
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
