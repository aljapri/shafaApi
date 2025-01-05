export default interface IPasswordService {
    // Method to hash a password
    hashPassword(password: string): Promise<string>;
  
    // Method to compare a password with a hashed value
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
  }
  