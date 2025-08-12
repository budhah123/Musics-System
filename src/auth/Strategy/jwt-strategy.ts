import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super ({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:'secretjwt4565' 
    });
  }
  async validate(payload:any){
    return {
      user: payload.sub,
      email: payload.email
    }
      
  }
}