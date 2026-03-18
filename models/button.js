const request = require('request');
let message = require('./message');

//page token
let token = "EAAcLtVkV0DUBAMNwoG2GeRjyqR8IfWTMO02RI06WSeHZCzsaZCcUzVMKmBIrohy33lVZAudkydFAq62EPIf29tLVFKEOQ3N1wmWwWnFOPUC1e9iFrnRBoCb6bqdZCbUpfqWi2FZBzPvsSETudJaOsVlFe3cQUuWJhZAxLldOKflAZDZD"

let button = {

    setupGetStartedButton: function (res) {
        let messageData = {
            setting_type: "call_to_actions",
            thread_state: "new_thread",
            call_to_actions:[
                {
                    payload:"getStarted"
                }
            ]
        };
        // Start the request
        request(
            {
            uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
            qs: { access_token: token },
            method: 'POST',
            json: messageData
            },
            function (error, response, body)
            {
            if (!error && response.statusCode === 200) {
                console.log("Thread Settings successfully changed!");
            } else {
                console.error("Failed calling Thread Reference API", response.statusCode, response.statusMessage, body.error);
            }
        });
    },
    sendWebButton: function (sender, text, url) {
        let messageData = {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":text,
                    "buttons":[
                        {
                            "type":"web_url",
                            "url":url,
                            "title":"more info",
                            "webview_height_ratio":"tall"
                        }
                    ]
                }
            }
        };
        message.sendRequest(sender, messageData);
    }
};

module.exports = button;