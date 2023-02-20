// const nodemailer = require('nodemailer');
// const path = require('path')
// const fs = require('fs')
// const ical = require('ical-generator');

// function getIcalObjectInstance(starttime, endtime, summary,  description, location, url , name ,email) {
//     const cal = ical({ domain: "mytestwebsite.com", name: 'My test calendar event' });
//     cal.domain("mytestwebsite.com");
//     cal.createEvent({
//             start: starttime,         // eg : moment()
//             end: endtime,             // eg : moment(1,'days')
//             summary: summary,         // 'Summary of your event'
//             description: description, // 'More description'
//             location: location,       // 'Delhi'
//             url: url,                 // 'event url'
//             organizer: {              // 'organizer details'
//                 name: name,
//                 email: email
//             },
//         });
//     return cal;
// }
    


// var transporter = nodemailer.createTransport({
//     host: "smtpout.secureserver.net",
//     port: 465,
//     secure: false,
//     requireTLS: true,
//     service: "Godaddy",
//     auth: {
//         user: process.env.Email,
//         pass: process.env.Password,
//     },
// });
//     async function sendemail(sendto, subject, htmlbody, calendarObj = null) {
//         mailOptions = {
//             from: process.env.Email,
//             sendto: process.env.ClientMail,
//             subject: "Meeting Confirmation Mail",
//             html:"This Emaill consist of the detail of the the scheduled meeting with meeting link" ,
//         }
//     if (calendarObj) {
//             let alternatives = {
//                 "Content-Type": "text/calendar",
//                 "method": "REQUEST",
//                 "content": new Buffer(calendarObj.toString()),
//                 "component": "VEVENT",
//                 "Content-Class": "urn:content-classes:calendarmessage"
//             }
//     mailOptions['alternatives'] = alternatives;
//     mailOptions['alternatives']['contentType'] = 'text/calendar'
//     mailOptions['alternatives']['content'] 
//         = new Buffer(calendarObj.toString())
//     }
//     transporter.sendMail(mailOptions, function (error, response) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log("Message sent: " , response);
//             }
//         })
//     }
//     module.exports = {
//         sendemail,
//     };