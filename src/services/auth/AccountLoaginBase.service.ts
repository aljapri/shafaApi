import { MedicalFacility } from '../../models/medicalFacility.model';
import HttpResponse from '../../utils/HttpResponse';
import { Subscription } from '../../models/subscription.model';
import { Auth } from '../../models/Auth.model';
import IPasswordService from '../password/IPassword';
import IJWT from '../jwt/IJW';
import PasswordService from '../password/password.service';
import JWTService from '../jwt/jwt.service';

interface LoginInput {
  email: string;
  password: string;
  accountId: string;
}


export default class AccountLoginBase {
  private readonly _passwordService: IPasswordService;
  private readonly _jwt: IJWT;

  constructor(passwordService: IPasswordService = new PasswordService(), jwtService: IJWT = new JWTService()) {
    this._passwordService = passwordService;
    this._jwt = jwtService;

  }

  protected async login(input: LoginInput): Promise<any> {
    const { email, password } = input;

    // Find the medical facility by email
    const authRecord = await Auth.findOne({ email });
    if (!authRecord) {
      throw HttpResponse.NotFound('Invalid email or password.');
    }

    // Validate password
    const isPasswordValid = await this._passwordService.comparePasswords(password, authRecord.password);
    if (!isPasswordValid) {
      throw HttpResponse.NotFound('Invalid email or password.');
    }
    return authRecord;
  }
  protected async tokenGeneration(id:string){
    const token = await this._jwt.generateToken({ id: id }, '24h');
    if(!token){

      throw HttpResponse.NotFound('Invalid email or password.');
    }
    return  token ;
  }
}
