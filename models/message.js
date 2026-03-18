const request = require('request');

//page token
let token = "EAAcLtVkV0DUBAMNwoG2GeRjyqR8IfWTMO02RI06WSeHZCzsaZCcUzVMKmBIrohy33lVZAudkydFAq62EPIf29tLVFKEOQ3N1wmWwWnFOPUC1e9iFrnRBoCb6bqdZCbUpfqWi2FZBzPvsSETudJaOsVlFe3cQUuWJhZAxLldOKflAZDZD"

let message = {

    sendButtonMessage:function (sender, text) {
        let messageData = {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text":text,
                    "buttons":[
                        {
                            "type":"postback",
                            "title":"Get Started",
                            "payload":"Get Started"
                        }
                    ]
                }
            }
        };
        message.sendRequest(sender, messageData);
    },

    // sendImageMessage:function (sender) {
    //     let messageData = {
    //         "attachment":{
    //             "type":"image",
    //             "payload":{
    //                 "url":"https://www.hnbgeneral.com/wp-content/themes/blankslate/images/gi_logo_new_2017.PNG"
    //             }
    //         }
    //     };
    //     message.sendRequest(sender, messageData);
    // },

    sendBotMessage:function (sender, text1, text2) {
        let messageData = {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements":[
                        {
                            "title":text1,
                            "image_url":"https://hnb-assurance-bot.herokuapp.com/images/logo.jpg",
                            "subtitle":text2,
                            "buttons":[
                                {
                                    "type":"web_url",
                                    "title":"Intimate a Claim ",
                                    "url":"https://hnb-assurance-bot.herokuapp.com/intimate",
                                    "webview_height_ratio":"compact"
                                },
                                {
                                    "type":"postback",
                                    "title":"Buy Online",
                                    "payload":"Buy Online"
                                },
                                {
                                    "title":"Policy Amendments",
                                    "type": "web_url",
                                    "url":"https://hnb-assurance-bot.herokuapp.com/amendments",
                                    "webview_height_ratio":"compact"
                                }
                            ]
                        },
                        {
                            "title":text1,
                            "image_url":"https://hnb-assurance-bot.herokuapp.com/images/logo.jpg",
                            "subtitle":text2,
                            "buttons":[
                                {
                                    "type":"web_url",
                                    "url":"https://www.hnbassurance.com/contact-us",
                                    "title":"Write to Us",
                                    "webview_height_ratio":"tall"
                                },
                                {
                                    "type":"phone_number",
                                    "title":"CALL US",
                                    "payload":"+94114883883"
                                },
                                {
                                    "type":"web_url",
                                    "url":"https://www.hnbassurance.com/branches/",
                                    "title":"Branches",
                                    "webview_height_ratio":"tall"
                                }
                            ]
                        }
                    ]
                }
            }
        };
        message.sendRequest(sender, messageData);
    },

    sendText:function(sender, text) {
        let messageData = {text: text};
        message.sendRequest(sender, messageData);
    },

    sendRequest:function (sender, messageData) {
        request({
                url: "https://graph.facebook.com/v2.6/me/messages",
                qs : {access_token : token},
                method : "POST",
                json: {
                    recipient: {id: sender},
                    message: messageData
                },
                sender_action: "typing_on"
            },
            function (error, response, body) {
                if (error){
                    console.log("sending error");
                }
                else if(response.body.error) {
                    console.log("responce body error")
                }
            })
    }
};

module.exports = message;


