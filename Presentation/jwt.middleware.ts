import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt = require('express-jwt');
import { jwtOptions } from './jwt-options';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    jwt(jwtOptions)(req, res, next);
  }
}
