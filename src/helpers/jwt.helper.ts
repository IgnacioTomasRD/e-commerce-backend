import { type Request, type Response, type NextFunction } from 'express';
import getSecretJwt from 'utils';
import jwt from 'jsonwebtoken';

const helperJWT = {
  validateToken: function (req: Request, res: Response, next: NextFunction): void {
    const accessToken = req.headers.authorization;
    if (accessToken !== undefined) {
      jwt.verify(accessToken, getSecretJwt(), (err, user) => {
        if (err != null) res.send('Access deniend, token expired or incorrect');
        else 
          next();
      });
    } else res.send('Access denied');
  },

  generateAccessToken: function (payload: object): string {
    const key = getSecretJwt();
    return jwt.sign(payload, key, { expiresIn: '5m' });
  }
};

export default helperJWT;
