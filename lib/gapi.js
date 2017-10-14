var google = require('googleapis'),
OAuth2Client = google.auth.OAuth2,
client = '948278500972-8acd3ov3s1ai7jp3j0os68j3u0pilark.apps.googleusercontent.com',
secret = '0_YGwNj8Goz0z5X8FtOjHwX6',
redirect = 'http://localhost:3000/oauth2callback',
calendar_auth_url = '',
oauth2Client = new OAuth2Client(client, secret, redirect);

google.calendar('v3');
google.oauth2('v2');
// google.get(function(err, client){
//     if(!err) {
//         callback(client);
//     }
// });
// google.execute(function(err, client){
//         if(!err) {
//             callback(client);
//         }
// });

calendar_auth_url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
});

//var callback = function(clients) {
    console.log("that's it: " + client);
    exports.cal = client.calendar;
    exports.oauth = client.oauth2;
    exports.client = oauth2Client;
    exports.url = calendar_auth_url;
    // exports.ping = function() {
    //     console.log('pong');
    // };
//};  