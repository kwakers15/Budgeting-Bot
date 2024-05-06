require('dotenv').config()

// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
]});


const prefix = '!'

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async message => {
  const messageSplit = message.content.slice(prefix.length).split(/ +/)
  const command = messageSplit[0].toLowerCase()

  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const args = messageSplit.slice(1)
  console.log(args)

  if (command === 'ping') {
    message.reply('pong')
  }
});


// Log into our bot
client.login(process.env.CLIENT_TOKEN);