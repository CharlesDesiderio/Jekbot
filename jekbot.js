const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

const got = require('got');
var prefix = "!";

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});


client.on("ready", () => {
  console.log("I am ready!");
});

setTimeout(function(){
  process.exit(0);
}, 60 * 60 * 1000);

client.on("message", message => {
  if (message.author.bot) return;
  
  if(message.content.match(/hello there/ig)) {
     message.channel.send("General Kenobi!");
  } else
  if (message.content.match(/Where did you come from/ig)) {
    message.channel.send("Where did you go? Where did you come from, Cotton Eye Joe?");
  }
  if(message.content.indexOf(config.prefix) !== 0) return;

  
  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(config.token);
