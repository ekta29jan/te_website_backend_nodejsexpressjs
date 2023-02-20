const { google } = require("googleapis")
const key = require("../technoelevate-5275074b087c.json");

module.exports.meetLink = (req, res, startDate, attandees) => {

    try {
      const SCOPES = [
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar",
      ];
  
      var jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
  
      jwtClient.authorize(function (err, token) {
        if (err) {
          console.log(err,"athulll");
          return;
        } else {
          console.log("succesfull connected", token);
        }
        createEvent(jwtClient);
      });
  
      /**
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      function createEvent(auth) {
        var calendar = google.calendar("v3");
  
        var event = {
          autoAddHangouts: true,
          summary: "Google I/O 2015",
          conferenceData: {
            createRequest: {
              requestId: "7qxalsvy5h",
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
          start: {
            dateTime: new Date().toISOString(),
            // dateTime: new Date(startDate).toISOString(),
          },
          end: {
            dateTime: new Date().toISOString(),
            // dateTime: new Date(startDate).toISOString(),
          },
  
          // attendees: [
          //   {
          //     email: "rohan223423@gmail.com",
          //   },
          // ],
          // organizer: [
          //   {
          //     email: "pmathul1@gmail.com",
          //   },
          // ],
        };
        calendar.events.insert(
          {
            auth: auth,
            calendarId: "primary",
            resource: event,
            // eventId: "s33rq7clbe7fgrhd1jjusrb0qo",
            conferenceDataVersion: 1,
          },
          function (err, event) {
            if (err) {
              console.log(err,"athul133")
              // res.status(500).send({
              //   error:
              //     "There was an error contacting the Calendar service: " + err,
              // });
            } else {
              console.log(event,"success")
            
            }
          }
        );
      }
    } catch (err) {
      console.log(err, "errr");
    }
  };