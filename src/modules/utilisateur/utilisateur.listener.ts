import { Injectable } from '@nestjs/common';

import { AuthHelpers } from '../../shared/helpers/auth.helpers';

@Injectable()
export class UserListener {
  static async onCreated(params, next) {
    // Check incoming query type
    if (params.model == 'Utilisateur') {
      if (params.action === 'create' || params.action === 'update') {
        const motDePasse = params.args['data'].password;
        const encryptedPass = await AuthHelpers.hash(motDePasse);

        params.args['data'] = {
          ...params.args['data'],
          password: encryptedPass,
        };
      }
    }

    return next(params);
  }
}
