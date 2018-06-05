const got = require('got');
exports.run = (client, message, args) => {
  got('https://the-cat-fact.herokuapp.com/api/randomfact', { json: true }).then(response => {
    message.channel.send(response.body.data[0].fact);
  }).catch(error => {
    console.log(error.response.body);
  });
}
