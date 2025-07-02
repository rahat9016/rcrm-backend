import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async create(@Body() registerUserDto: RegisterDto) {
    return await this.authService.signup(registerUserDto);
  }
}
