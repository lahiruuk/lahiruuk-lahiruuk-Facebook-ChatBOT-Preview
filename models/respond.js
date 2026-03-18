const request = require('request');
let message = require('./message');
let button = require('./button');

//page token
let token = "EAAcLtVkV0DUBAMNwoG2GeRjyqR8IfWTMO02RI06WSeHZCzsaZCcUzVMKmBIrohy33lVZAudkydFAq62EPIf29tLVFKEOQ3N1wmWwWnFOPUC1e9iFrnRBoCb6bqdZCbUpfqWi2FZBzPvsSETudJaOsVlFe3cQUuWJhZAxLldOKflAZDZD";

let respond = {
    sendProcessResponse: function (sender) {
        setTimeout(function () {
            message.sendText(sender, 'Step 1 – Get an estimate : Select your Life cover, period and let us know few basic information about you');
        },3000);
        setTimeout(function () {
            message.sendText(sender, 'Step 2 – Personal details : Let us know your details');
        },4000);
        setTimeout(function () {
            message.sendText(sender, 'Step 3 – Health details : Tell us about your health conditions');
        },5000);
        setTimeout(function () {
            message.sendText(sender, 'Step 4 – Pay your premium & Activate - Our payment gateway allows you to pay your premium in a secure manner.');
        },6000);
        setTimeout(function () {
            button.sendWebButton(sender, 'Click below to get more info from website','https://www.hnbassurance.com/eLife/#simple1');
        },6000);
    },
    sendFeaturesResponse: function (sender) {
        setTimeout(function () {
            message.sendText(sender, 'E-life is an unique policy offered by HNB Assurance to its online customers. E-life provides worldwide coverage. One can select one of the following options depending on the requirement and the affordability.');
        },3000);
        setTimeout(function () {
            message.sendText(sender, 'Higher life cover for a lower premium');
        },4000);
        setTimeout(function () {
            message.sendText(sender, 'Life cover with a maturity payment at the end of term');
        },5000);
        setTimeout(function () {
            button.sendWebButton(sender, 'Click below to get more info from website','https://www.hnbassurance.com/eLife/#simple2');
        },6000);
    }
};

module.exports = respond;