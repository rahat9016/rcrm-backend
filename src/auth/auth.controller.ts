import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Registration successful',
        user: {
          id: 'uuid',
          name: 'John Doe',
          role: 'WAITER',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (email already exists)',
    schema: {
      example: {
        success: false,
        statusCode: 400,
        message: 'Email already exists',
        errors: {},
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        errors: {},
      },
    },
  })
  async create(@Body() registerUserDto: RegisterDto) {
    return await this.authService.signup(registerUserDto);
  }
}
