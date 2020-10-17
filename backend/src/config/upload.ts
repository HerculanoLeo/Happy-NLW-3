import multer from 'multer';
import path from 'path';

export default {
    storege: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            
            const encoder = new TextEncoder();
            const decoder = new TextDecoder();
            
            const name = file.originalname;

            //Por algum motivo trim ou replace nao tirava os espaços da string e # da erro na url, 32 = space e 35 = #
            const uint8Array = encoder.encode(name).filter(code => {
                return (code !== 32 && code !== 35);
            });

            const nameWithOutSpace = decoder.decode(uint8Array);     

            const filename = `${Date.now()}-${nameWithOutSpace}`;

            cb(null, filename);
        },
    })
};