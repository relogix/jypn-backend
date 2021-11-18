import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrators } from 'src/entities/administrator.entity';
import { Repository } from 'typeorm/repository/Repository';
import { LoginDTO, VerifyTokenDTO } from './administrator.dto';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrators)
    private administratorRepository: Repository<Administrators>,
  ) {}

  async login(body: LoginDTO) {
    const { username, password, rememberMe } = body;

    // Get Administrator by username
    const getAdministrator = await this.administratorRepository.findOne({
      username,
    });

    if (!getAdministrator)
      throw new BadRequestException('Incorrect Username and Password');

    // Validate password
    const isMatched = await bcrypt.compare(password, getAdministrator.password);
    if (!isMatched)
      throw new BadRequestException('Incorrect Username and Password');

    // Generate token
    const payload = {
      username,
      adminName: getAdministrator.adminName,
      role: getAdministrator.isSuperadmin ? 'superadmin' : 'admin',
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      !rememberMe ? { expiresIn: '1d' } : {},
    );

    return {
      ...payload,
      token,
    };
  }

  async verifyToken(body: VerifyTokenDTO) {
    const { token } = body;

    // Verify Token
    let isVerified = false;
    let payload;
    await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (decoded) {
        const { iat, exp, ...newPayload } = decoded;

        isVerified = true;
        payload = newPayload;
      }
    });

    if (!isVerified)
      throw new BadRequestException('Token malformed or expired');

    return payload;
  }
}
