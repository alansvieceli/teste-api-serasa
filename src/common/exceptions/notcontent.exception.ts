import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContentException extends HttpException {
  constructor() {
    super(null, HttpStatus.NO_CONTENT);
  }
}
