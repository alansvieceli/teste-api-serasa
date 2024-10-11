import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LocationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        if (data) {
          const host = request.get('host');
          const originalUrl = request.originalUrl;
          response.setHeader('Location', `http://${host}${originalUrl}/${data}`);
        }

        return null;
      }),
    );
  }
}
