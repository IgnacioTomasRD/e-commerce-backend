import bcrypt from 'bcryptjs'

export const helperCrypt = {
    encrypt: async function(text: string){
        const hash = await bcrypt.hash(text,10);
        return hash;
    },
    compare: async function(text:string, hashText: string){
        return await bcrypt.compare(text,hashText);
    }
}