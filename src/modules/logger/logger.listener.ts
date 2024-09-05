import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerListener {
  static async onAction(params, next) {
    if (params.args.data.action) {
      const action = params.action + '_' + params.model;

      params.args['data'] = {
        ...params.args['data'],
        action,
      };
    }

    return next(params);
  }
}
