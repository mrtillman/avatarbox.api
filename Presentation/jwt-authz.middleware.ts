import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwtAuthz = require('express-jwt-authz');

@Injectable()
export class JwtAuthzMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(/delete/i.test(req.method)){
      return jwtAuthz([ 'delete:icons' ], {
        failWithError: true
      })(req, res, next);
    }
    next();
  }
}
