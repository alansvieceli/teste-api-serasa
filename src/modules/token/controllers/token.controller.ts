import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt';
import { UseLoginrDto } from '../dto/user.login';
import { Throttle } from '@nestjs/throttler';

@Controller({
    path: 'auth',
    version: '1',
})
@ApiTags('auth')
export class TokenController {
    constructor(private readonly jwtService: JwtService) { }

    @Post('login')
    async login(@Body() user: UseLoginrDto) {
        const payload = { userId: user.id, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
