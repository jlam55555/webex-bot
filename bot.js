// code from https://www.botkit.ai/docs/readme-ciscospark.html#getting-started
var Botkit = require('botkit');

var controller = Botkit.sparkbot({
    debug: true,
    log: true,
    public_address: process.env.public_address,
    ciscospark_access_token: process.env.access_token,
    secret: process.env.secret
});


var bot = controller.spawn({
});

controller.setupWebserver(process.env.PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log("SPARK: Webhooks set up!");
    });
});

// if hear hello, do something
controller.hears('hello', 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, 'Hi');
});

// respond to direct mention (@fluorination)
controller.on('direct_mention', function(bot, message) {
    bot.reply(message, 'You mentioned me and said, "' + message.text + '"');
});

// direct message
controller.on('direct_message', function(bot, message) {
    bot.reply(message, 'I got your private message. You said, "' + message.text + '"');
});