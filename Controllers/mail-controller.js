const nodemailer = require('nodemailer');
const path = require('path')
const fs = require('fs')
const ical = require('ical-generator');
const Observable = require('rxjs');
const ThanksEmail = path.join(__dirname, '../view/email.html');
const MeetingMail = path.join(__dirname, '../view/meetingemail.html');
const MeetingEvent = require('../Helpers/event')
const clientMail = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            description
        } = req.body;
        var transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: false,
            requireTLS: true,
            service: "Godaddy",
            auth: {
                user: process.env.Email,
                pass: process.env.Password,
            },
        });
        var mailOptions = {
            from: process.env.Email,
            to: process.env.ClientMail,
            subject: "Enquiry mail ",
            html: `<h1><strong>Name: </strong>${name}</h1> </br>
        <h1><strong>Email: </strong>${email}</h1> </br>
        <h1><strong>Phone: </strong>${phone}</h1> </br>
        <h1><strong>Message: </strong>${description}</h1> </br>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    error: true,
                    message: "Something went wrong"
                })
            } else {
                sendAccToClient(req.body);
                console.log("email sent" + info.response)
                res.status(200).json({
                    error: false,
                    message: "Thank you for reaching Us",
                    html: ``
                })
            }
        })

    } catch (err) {
        next(err.message);
    }
}

const careerMail = async (req, res, next) => {
    try {
        const {
            fullName,
            emailId,
            phoneNo,
            currentCompany,
            additionalInfo
        } = req.body
        // console.log(req.body.file);
        if (req.body.file) {

            // let buff = Buffer.from(req.body.file, 'base64');
            // fs.writeFileSync(`./newRes/resume.pdf`, buff);
            let pathName = `./newRes/${req?.body.file}`
            var transporter = nodemailer.createTransport({
                host: "smtpout.secureserver.net",
                port: 465,
                secure: false,
                requireTLS: true,
                service: "Godaddy",
                auth: {
                    user: process.env.Email,
                    pass: process.env.Password,
                },
            });
            var mailOptions = {
                from: process.env.Email,
                to: process.env.CareerMail,
                subject: 'Career Enquiry',
                html: "<h1> Hello </h1>",
                attachments: [{
                    filename: "resume.pdf",
                    path: req.body.file
                }]
            };
            await transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log("Error sending mail", error);
                } else {
                    console.log("Mail sent successfully");
                }
            });
            sendAccToCandidate(req.body);
            res.status(200).json({
                error: false,
                message: "ThankYou for your interest"
            })
        } else {
            res.status(404).json({
                error: true,
                message: "Please upload your CV"
            })
        }
    } catch (err) {
        next(err.message)
    }
}

const sendAccToClient = async (req, res, next) => {
    const EmailTemplate = await fs.readFileSync(ThanksEmail, { encoding: 'utf-8' })
    var transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: false,
        requireTLS: true,
        service: 'Godaddy',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });
    var mailOptions = {
        from: process.env.Email,
        to: req.email,
        subject: 'Techno Elevate',
        html: EmailTemplate

    };

    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log("Error sending mail", error);
        } else {
            console.log("Mail sent successfully");
        }
    });
}


const sendAccToCandidate = async (req, res, next) => {
    const EmailTemplate = await fs.readFileSync(ThanksEmail, { encoding: 'utf-8' })
    var transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: false,
        requireTLS: true,
        service: "Godaddy",
        auth: {
            user: process.env.Email,
            pass: process.env.Password,
        },
    });
    var mailOptions = {
        from: process.env.Email,
        to: req.emailId,
        subject: 'Techno Elevate',
        html: EmailTemplate

    };
    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log("Error sending mail", error);
        } else {
            console.log("Mail sent successfully");
        }
    });

}


const meetingMail = async (req, res, next) => {
  await  MeetingEvent.meetLink()
  const EmailTemplate = await fs.readFileSync(ThanksEmail, { encoding: 'utf-8' })
    // const EmailTemplate = await fs.readFileSync(MeetingMail, { encoding: 'utf-8' })
    // let template = await fs.readFileSync(usercreation, { encoding: "utf-8" });
    // if (template) {
    //   let htmlString = template.toString();
    //   template = htmlString.replace(new RegExp("CHANGENAMEHERE", "g"), name);
    //   template = template.replace(
    //     new RegExp("ACTIVATIONLINK", "g"),
    //     `${config.DOMAINB}/auth/checktoken/${token}`
    //   );
    // }
  
  
    try {
        const {
            firstName,
            lastName,
            emailId,
            currentCompany,
            reasontoVisit

        } = req.body
       
        var transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: false,
            requireTLS: true,
            service: "Godaddy",
            auth: {
                user: process.env.Email,
                pass: process.env.Password,
            },
        });
        var mailOptions = {
            from: process.env.Email,
            to: ['ekku.myself29@gmail.com','ekta.s@testyantra.in'],
            subject: "Meeting Confirmation Mail",
            html:  EmailTemplate
        };
      
         
        await transporter.sendMail(mailOptions,
            
            // calendarObj = null, function (error, response) {
          
        //     if (calendarObj) {
        //         let alternatives = {
        //             "Content-Type": "text/calendar",
        //             "method": "REQUEST",
        //             "content": new Buffer(calendarObj.toString()),
        //             "component": "VEVENT",
        //             "Content-Class": "urn:content-classes:calendarmessage"
        //         }
        //         mailOptions['alternatives'] = alternatives;
        //         mailOptions['alternatives']['contentType'] = 'text/calendar'
        //         mailOptions['alternatives']['content']
        //             = new Buffer(calendarObj.toString())
        //     }
        //         if (error) {
        //             console.log(error);
    
        //         } else {
                  
        //             console.log("Message sent: ", response);
        //         }
        // }
       
        ) 

    }
    
    catch (err) {
        next(err.message)
    }
   
}


    module.exports = {
        clientMail,
        meetingMail,
        careerMail
    }
  