import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaVendedor implements AuthenticationStrategy {

  name: string = "vendedor";

  constructor(
    @service(AutenticacionService)
    public sercioAutenticacion: AutenticacionService
  ) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.sercioAutenticacion.ValidarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombres: datos.data.nombres
        });
        return perfil

      } else {
        throw new HttpErrors[401]("El token enviado no es valido")
      }


    } else {
      throw new HttpErrors[401]("No hay token")


    }



  }
}
