import brcypt from 'bcrypt';
import constant from '../../utils/constant';
import { UserRepository } from '../repositories/userRepository';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData) {
    let isExist = await this.userRepository.isExistUser(userData.username);
    if (isExist) {
      throw constant.error.usernameAlreadyExists;
    }

    let hashPassword = await brcypt.hash(userData.password, constant.bcrypt.saltRounds);
    await this.userRepository.create({
      username: userData.username,
      password: hashPassword,
      name: userData.name,
      avatar: '',
    });
  }

  async login(userData) {
    let user = await this.userRepository.readByUsername(userData.username);
    if (!user) {
      throw constant.error.usernameIsNotExists;
    }
    let result = await brcypt.compare(userData.password, user.password);
    if (!result) {
      throw constant.error.passwordIncorrect;
    }
    return user;
  }
}
