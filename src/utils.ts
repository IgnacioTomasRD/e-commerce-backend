const getSecretJwt = function (): string {
  const secretJwt = process.env.SECRET_KEY_JWT;
  if (secretJwt != null) return secretJwt;
  else throw new Error('KEY JWT NOT FOUND');
};



export default getSecretJwt;
