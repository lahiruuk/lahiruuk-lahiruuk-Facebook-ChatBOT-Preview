const request = require('request');
let message = require('./message');

//page token
let token = "EAAcLtVkV0DUBAMNwoG2GeRjyqR8IfWTMO02RI06WSeHZCzsaZCcUzVMKmBIrohy33lVZAudkydFAq62EPIf29tLVFKEOQ3N1wmWwWnFOPUC1e9iFrnRBoCb6bqdZCbUpfqWi2FZBzPvsSETudJaOsVlFe3cQUuWJhZAxLldOKflAZDZD"

let help ={
    sendHelpMenu: function (sender) {
        let messageData = {
            // "text": "Hello there, how can I help you ?",
            // "quick_replies":[
            //     {
            //         "content_type":"text",
            //         "title":"Life",
            //         "payload":"products",
            //     },
            //     {
            //         "content_type":"text",
            //         "title":"Takaful",
            //         "payload":"call",
            //     }
            // ]
            "text": "Hello there, how can I help you ?",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Life Insurance Help",
                    "payload":"Life Help",
                },
                {
                    "content_type":"text",
                    "title":"Takaful Help",
                    "payload":"Takaful Help"
                }
            ]
        };
        message.sendRequest(sender, messageData);
    }
};
module.exports = help;