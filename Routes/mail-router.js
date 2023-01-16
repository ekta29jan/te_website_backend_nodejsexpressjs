const express = require('express');
const router = express.Router();

const mailController = require('../Controllers/mail-controller');


const storage = require('../Helpers/storage')

router.post('/send-career-mail', storage, mailController.careerMail);
@Crossorigin 
router.post('/send-client-mail', mailController.clientMail);



module.exports = router;