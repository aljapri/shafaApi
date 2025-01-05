import jwt from 'jsonwebtoken';
import IJWT from './IJW';

class JWTService implements IJWT {
    private readonly _secretkey:string | any;
    public constructor(){
        this._secretkey = process.env.JWT_SECRET || "your-secret-key";
    }
  // Method to generate a JWT token
  public generateToken(payload: object, expiresIn: string): string {
    // Signing the JWT with a payload and secret
    return jwt.sign(payload, this._secretkey, { expiresIn });
  }

  // Method to verify the JWT token
  public async verifyToken(token: string): Promise<object | string> {
    // Verifying the token with the secret
    return jwt.verify(token, this._secretkey);
  }
}

export default JWTService;
