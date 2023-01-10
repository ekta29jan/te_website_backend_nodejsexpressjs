const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resumes');
    },
    filename: (req, file, cb) => {
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = String(Math.floor(1000 + Math.random() * 9000)) + file.originalname;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'application/pdf',
        'application/docx',
        'application/doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({
    storage: diskStorage,
    limits: {
        fieldSize: 25 * 1024 * 1024
    },
    fileFilter: fileFilter
}).single(
    'file'
);

module.exports = storage;