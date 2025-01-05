export default interface IJWT {
    // Method to generate a JWT token
    generateToken(payload: object, expiresIn: string): string;
  
    // Method to verify the JWT token
    verifyToken(token: string): Promise<object | string>;
  }
  