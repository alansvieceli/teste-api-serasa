import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const elapsedTime = Date.now() - start;
      const method = req.method;
      const url = req.originalUrl;
      const statusCode = res.statusCode;
      console.log(`--- [${method}] ${url} - ${statusCode} | ${elapsedTime}ms ---`);
    });
    next();
  }
}
