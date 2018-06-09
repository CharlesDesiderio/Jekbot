const got = require('got');
exports.run = (client, message, args) => {
  got('https://api.icndb.com/jokes/random', { json: true }).then(response => {
    message.channel.send(response.body.value.joke);
  }).catch(error => {
    console.log(error.response.body);
  });
}
