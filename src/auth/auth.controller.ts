import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
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
  async register(@Body() registerUserDto: RegisterDto) {
    return await this.authService.register(registerUserDto);
  }
  @Post('/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Login successful',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Login successful',
        data: {
          token: {
            access: '',
            refresh: '',
          },
          user: {
            id: '510b6bb7',
            name: 'Minhazur',
            role: 'WAITER',
          },
        },
      },
    },
  })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Validation error',
  //   schema: {
  //     example: {
  //       success: false,
  //       statusCode: 400,
  //       message: 'Validation failed',
  //       errors: {
  //         email: 'Email must be valid',
  //         password: 'Password is required',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized / Invalid credentials',
  //   schema: {
  //     example: {
  //       success: false,
  //       statusCode: 401,
  //       message: 'Invalid credentials',
  //       errors: {},
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Server error',
  //   schema: {
  //     example: {
  //       success: false,
  //       statusCode: 500,
  //       message: 'Internal server error',
  //       errors: {},
  //     },
  //   },
  // })
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.login(loginUserDto);
  }
}
