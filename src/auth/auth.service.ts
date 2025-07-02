import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(payload: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (existingUser)
      throw new BadRequestException('Email already registered', {
        cause: new Error(),
        description:
          'Your email already in registered, please provide new email',
      });

    const data = {
      ...payload,
      role: payload.role as Role,
      password: await this.encryptPassword(payload.password),
    };
    const user = await this.prisma.user.create({
      data: data,
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
    return {
      statusCode: 201,
      success: true,
      message: 'Registration successful',
      data: {
        user,
      },
    };
  }

  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
