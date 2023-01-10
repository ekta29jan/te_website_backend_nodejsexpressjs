const express = require('express');
const router = express.Router();

const mailController = require('../Controllers/mail-controller');
const meeetingController = require('../Controllers/controller')

const storage = require('../Helpers/storage')

// router.post('/send-career-mail', storage, mailController.careerMail);

// router.post('/send-client-mail', mailController.clientMail);

router.post('/send-Meeting-mail' , meeetingController.sendemail)

module.exports = router;