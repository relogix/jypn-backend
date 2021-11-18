import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdministratorService } from '../administrator/administrator.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private administratorService: AdministratorService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<boolean> {
    // Validate User
    const administrator = await this.administratorService.findByUsername(
      payload?.username,
    );

    if (!administrator) throw new UnauthorizedException('Admin not found');

    return true;
  }
}
