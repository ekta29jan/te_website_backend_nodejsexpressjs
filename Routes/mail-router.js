const express = require('express');
const router = express.Router();

const mailController = require('../Controllers/mail-controller');
const meetingController = require('../Controllers/meetingController')

const storage = require('../Helpers/storage')

router.post('/send-career-mail', storage, mailController.careerMail);

router.post('/send-client-mail', mailController.clientMail);

router.post('/send-meeting-mail',meetingController.meetingMail)

module.exports = router;