import bcrypt from 'bcrypt';
import IPasswordService from './IPassword';

class PasswordService implements IPasswordService {
  private readonly _saltRounds: number;

  public constructor() {
    this._saltRounds = 10;  // Typically, 10 salt rounds are used for bcrypt
  }

  // Method to hash a password
  public async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this._saltRounds);
    return hashedPassword;
  }

  // Method to compare a password with a hashed password
  public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}

export default PasswordService;
