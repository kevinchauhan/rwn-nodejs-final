import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`
        return cb(null, filename)
    }
})

export const upload = multer({
    storage, limits: {
        fileSize: 10 * 1024 * 1024
    }
}).single('image')
