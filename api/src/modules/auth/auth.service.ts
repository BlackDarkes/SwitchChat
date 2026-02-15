import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validate(payload: any) {
    return payload;
  }
}
