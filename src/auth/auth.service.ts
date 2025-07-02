import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { SignupResponse } from './user';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(payload: RegisterDto): Promise<SignupResponse> {
    const hash = await this.encryptPassword(payload.password);
    payload.password = hash;

    return this.prisma.user.create({
      data: payload,
      select: {
        email: true,
        id: true,
      },
    });
  }

  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
