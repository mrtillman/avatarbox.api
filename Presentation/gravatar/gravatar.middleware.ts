import { Injectable, NestMiddleware } from '@nestjs/common';
import { AvbxGravatarClient } from 'avatarbox.sdk';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GravatarMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if(!req.user) next();
    const { user } = req;
    const userId = user.sub.substring(user.sub.indexOf('|') + 1);
    const client = new AvbxGravatarClient();
    req.gravatar = await client.fetch(userId);
    next();
  }
}
