import { type Request, type Response, type NextFunction } from 'express';
import { JwtPayload } from 'interfaces/jwtPayload.interface';
import jwt from 'jsonwebtoken';

const helperJWT = {
  validateToken: function (req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies.authorization;
    if (token == undefined) res.send('Access denied');
    else {
      try {
        const decoded = jwt.verify(token, helperJWT.getSecretJwt()) as JwtPayload;
        res.locals.userId = decoded.userId;
        next();
      } catch (err: any) {
        res.send(err.message);
      }
    }
  },

  generateAccessToken: function (payload: object): string {
    const key = helperJWT.getSecretJwt();

    return jwt.sign(payload, key, { expiresIn: '72h' });
  },

  getSecretJwt: function (): string {
    const secretJwt = process.env.SECRET_KEY_JWT;
    if (secretJwt != null) return secretJwt;
    else throw new Error('KEY JWT NOT FOUND');
  }
};

export default helperJWT;

export const tokenBlackList: string[] = [];
