const got = require('got');
exports.run = (client, message, args) => {
  if (!args.length) {
    message.channel.send("...what am I supposed to search for?");
  }
  else {
    var gifSearch = args.join(' ');
    got('https://api.tenor.com/v1/search?q=' + gifSearch + '&locale=en_US&key=ZVR2BBJ6HF95&limit=1&safesearch=strict&media_filter=minimal', { json: true }).then(response => {
      message.channel.send(response.body.results[0].itemurl);
    }).catch(error => {
      console.log(error.response.body);
    });
  }
}
