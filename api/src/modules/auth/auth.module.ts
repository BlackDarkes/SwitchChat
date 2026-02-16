import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@/config/jwt.config';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/strategy/jwt.strategy';
import { JwtGuard } from './common/guard/jwt.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: JwtConfig,
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard],
})
export class AuthModule {}
