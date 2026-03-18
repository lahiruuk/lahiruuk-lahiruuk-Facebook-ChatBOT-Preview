const request = require('request');
let message = require('./message');

//page token
let token = "EAAcLtVkV0DUBAMNwoG2GeRjyqR8IfWTMO02RI06WSeHZCzsaZCcUzVMKmBIrohy33lVZAudkydFAq62EPIf29tLVFKEOQ3N1wmWwWnFOPUC1e9iFrnRBoCb6bqdZCbUpfqWi2FZBzPvsSETudJaOsVlFe3cQUuWJhZAxLldOKflAZDZD"

let menu = {

    setupPersistentMenu: function (res) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
            qs: {access_token: token},
            method: 'POST',
            json: {
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "title": "INTIMATE A CLAIM",
                                "type": "web_url",
                                "url":"https://hnb-assurance-bot.herokuapp.com/intimate",
                                "webview_height_ratio":"compact"
                            },
                            {
                                "title": "BUY ONLINE",
                                "type": "nested",
                                "call_to_actions": [
                                    {
                                        "title": "PROCESS",
                                        "type": "postback",
                                        "payload": "process"
                                    },
                                    {
                                        "title": "PRODUCT FEATURES",
                                        "type": "postback",
                                        "payload": "features"
                                    },
                                    {
                                        "title": "BUY NOW !",
                                        "type": "web_url",
                                        "url":"https://hnb-assurance-bot.herokuapp.com/process",
                                        "webview_height_ratio":"tall"
                                    }
                                ]
                            },
                            {
                                "title": "MORE",
                                "type": "nested",
                                "call_to_actions": [
                                    {
                                        "title": "POLICY AMENDMENTSs",
                                        "type": "web_url",
                                        "url":"https://hnb-assurance-bot.herokuapp.com/amendments",
                                        "webview_height_ratio":"compact"
                                    },
                                    {
                                        "title":"CALL US",
                                        "type":"phone_number",
                                        "payload":"+94114883883"
                                    },
                                    {
                                        "type":"web_url",
                                        "url":"https://www.hnbassurance.com/contact-us",
                                        "title":"WRITE TO US",
                                        "webview_height_ratio":"tall"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

        }, function (error, response, body) {
            console.log(response);
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
        });
    },

    sendBuyOnlineMenu: function (sender, text) {
        let messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": text,
                    "buttons":
                        [
                            {
                                "title": "PROCESS",
                                "type": "postback",
                                "payload": "process"
                            },
                            {
                                "title": "PRODUCT FEATURES",
                                "type": "postback",
                                "payload": "features"
                            },
                            {
                                "title": "BUY NOW !",
                                "type": "web_url",
                                "url":"https://hnb-assurance-bot.herokuapp.com/process",
                                "webview_height_ratio":"tall"
                            }
                        ]
                }
            }
        };
        message.sendRequest(sender, messageData);
    }

    // sendLifeProductMenu(sender, text){
    //
    // }
};

module.exports = menu;
