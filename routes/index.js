var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParsaer = require('body-parser');
var mysql = require('mysql');

let message = require('../models/message');
let button = require('../models/button');
let menu = require('../models/menu');
let respond = require('../models/respond');
let vlidate = require('../models/policyValidate');
let connection = require('../models/connection');
let help = require('../models/help');

/* GET home page. */
router.get('/', function (req, res) {
    res.send("HNBA CHATBOT");
});
router.get('/process', function (req, res) {
    res.render('Process.html');
});
router.get('/respond', function (req, res) {
    res.render('respond');
});
router.get('/intimate', function (req, res) {
    res.render('intimate.html');
});
router.get('/amendments', function (req, res) {
    res.render('amendments.html');
});
router.post('/validate', function (req, res) {
    var nic = req.body.nic;
    var policy = req.body.policy;
    console.log(nic);
    console.log(policy);

    var api = {
        url: 'http://cms.hnbgeneral.com:8080/xxxxxxxxxxx/search/findPolicy?policyNo=' + policy + '&insuredNIC=' + nic,
        auth: {
            user: 'FBBOT',
            password: 'SRILANKA'
        }
    };

    request(api, function (err, response, data) {
        const body = JSON.parse(data);
        if (err) {
            console.log(err);
        }
        else {
            const body = JSON.parse(data);
            var policy_no = body.content[0];
            var next = 0;

            if (policy_no) {
                next = 1;
                res.send([next]);
            }
            else {
                res.send([next]);
            }
        }
    });
});
router.post('/sendRequest', function (req, res) {
    var nic = req.body.nic;
    var policy = req.body.policy;
    var mobile = req.body.mobile;
    var comment = req.body.comment;

    var data = {policy_no: [policy], nic: [nic], mobile_no: [mobile], comment: [comment], state: 'PENDING'};
    var sql = mysql.format("INSERT INTO intimade SET?", data);

    connection.query(sql, function (err, response) {
        if (err) {
            res.render('respond', {val: 2});
        }
        else {
            res.render('respond', {val: 1});
        }
    });
});
router.post('/sendAmendedRequest', function (req, res) {
    var nic = req.body.nic;
    var policy = req.body.policy;
    var mobile = req.body.mobile;
    var comment = req.body.comment;

    var data = {policy_no: [policy], nic: [nic], mobile: [mobile], comment: [comment], state: 'PENDING'};
    var sql = mysql.format("INSERT INTO amended SET?", data);

    connection.query(sql, function (error, response) {
        if (error) {
            console.log(error);
            response.render('respond', {val: 2});
        }
        else {
            response.render('respond', {val: 1});
        }
    });
});

//----------------- verify with webhook ------------------
router.get('/webhook', function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === "hnbabot") {
        console.log("validating webhook");
        res.status(200).send(req.query['hub.challenge']);
        button.setupGetStartedButton();
        menu.setupPersistentMenu();
// domain.whiteListDomain();
    }
    else {
        console.error("Failed validation. Make sure the validation tokens match");
        res.sendStatus(403)
    }
});

//------------------- facebook -------------------
router.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let sender = event.sender.id;

        if (event.message && event.message.text) {
            let text = event.message.text;
            decideMessage(sender, text);
        }

        else if (event.postback && event.postback.payload) {
            let payload = JSON.stringify(event.postback.payload);
            decidePayloadMessage(sender, payload);
            continue;
        }
    }
    res.sendStatus(200);
});

function decideMessage(sender, text1) {
    let text = text1.toLowerCase();

    if (text.includes("hi")) {
        message.sendBotMessage(sender, "Hi There, Welcome to HNB Assurance !!!!", " How Can I Help You?");
    }
    else if (text.includes("hello")) {
        message.sendBotMessage(sender, "Hello !! Welcome to HNB Assurance !!", "How Can I Help You?");
    }
    else if (text.includes("get started")) {
        message.sendBotMessage(sender, "Welcome to HNB Assurance !!", "How Can I Help You?");
    }
    else if (text.includes("products")) {
        menu.sendProductsMenu(sender, "Choose a product you wish to continue");
    }
    else if (text.includes("life insurance help")) {
        setTimeout(function () {
            message.sendText(sender, "Hi there !!");
        }, 1000);
        setTimeout(function () {
            message.sendText(sender, "We are here to help you.");
        }, 2000);
        setTimeout(function () {
            message.sendText(sender, "Please feel free to contact us in any emergency ");
        }, 3000);
        setTimeout(function () {
            message.sendText(sender, "011 4 883 883");
        }, 4000);

    }
    else if (text.includes("takaful help")) {
        setTimeout(function () {
            message.sendText(sender, "For Takaful Inquiries ");
        }, 1000);
        setTimeout(function () {
            message.sendText(sender, "011 4 713 800");
        }, 2000);
    }
    else {
        message.sendButtonMessage(sender, "Hello !! This is automatic reply from messenger bot, we will contact you soon." +
            " Meanwhile if need urgent information please activate our messenger bot by clicking 'Get Started' button ");
    }
}

// routing for payload messages

function decidePayloadMessage(sender, payload1) {
    let payload = payload1.toLowerCase();
    if (payload.includes("get started")) {
        message.sendBotMessage(sender, "Hello !! Welcome to HNB Assurance !!", "How Can I Help You?");
    }
    else if (payload.includes("getstarted")) {
        message.sendBotMessage(sender, "Hello !! Welcome to HNB Assurance !!", "How Can I Help You?");
    }
    else if (payload.includes("claim")) {
        menu.sendBuyOnlineMenu(sender, 'Hello !! This feature is currently under developing');
    }
    else if (payload.includes("policy")) {
        menu.sendBuyOnlineMenu(sender, 'Hello !! This feature is currently under developing');
    }
    else if (payload.includes("buy online")) {
        menu.sendBuyOnlineMenu(sender, 'Hello !! This is buy online menu');
    }
    else if (payload.includes("process")) {
        respond.sendProcessResponse(sender);
    }
    else if (payload.includes("features")) {
        respond.sendFeaturesResponse(sender);
    }
    else if (payload.includes("help")) {
        help.sendHelpMenu(sender);
    }
    else if (payload.includes("life insurance help")) {
        setTimeout(function () {
            message.sendText(sender, "Hi there !!");
        }, 1000);
        setTimeout(function () {
            message.sendText(sender, "We are here to help you.");
        }, 2000);
        setTimeout(function () {
            message.sendText(sender, "Please feel free to contact us in any emergency ");
        }, 3000);
        setTimeout(function () {
            message.sendText(sender, "011 4 883 883");
        }, 4000);
    }
    else if (payload.includes("takaful help")){
        setTimeout(function () {
            message.sendText(sender, "For Takaful Inquiries ");
        }, 1000);
        setTimeout(function () {
            message.sendText(sender, "011 4 713 800");
        }, 2000);
    }
}


module.exports = router;
