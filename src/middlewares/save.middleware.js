import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const directorioDestino = join(__dirname, '../uploads/');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directorioDestino);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware para manejar la subida de imágenes
export const uploadMiddleware = upload.single('file');


