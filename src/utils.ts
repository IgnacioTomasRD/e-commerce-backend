export function getMongoDURL(): string {
  const mongoDBURL = process.env.MONGO_URL;
  if (mongoDBURL !== undefined) return mongoDBURL;
  else throw new Error('not found URL of MONGO DB');
}

export function getPORT(): string {
  return process.env.PORT != null ? process.env.PORT : '3000';
}

export const SIZE_PAGES = 7;