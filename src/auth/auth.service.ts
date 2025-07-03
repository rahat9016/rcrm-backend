import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'generated/prisma';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const JWT_SECRET = process.env.JWT_SECRET || 'your_access_secret';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'your_refresh_secret';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(payload: RegisterDto) {
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

  async login(payload: LoginDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    // ==== IF USER NOT FOUND THEN RETURN INVALID CREDENTIALS ====
    if (!existingUser) throw new UnauthorizedException('Invalid credentials');

    // ==== IF PASSWORD DOESN'T MATCH THEN RETURN INVALID CREDENTIALS ====
    const passwordMatch = await bcrypt.compare(
      payload.password,
      existingUser.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    // ==== GENERATE TOKEN ====
    const token = this.generateToken(existingUser.id, existingUser.role);

    return {
      statusCode: 201,
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          role: existingUser.role,
        },
      },
    };
  }
  private generateToken(userId: string, userRole: string) {
    const payload = { id: userId, role: userRole };
    const access = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1m',
    });
    const refresh = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '5m',
    });
    return { access, refresh };
  }

  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
