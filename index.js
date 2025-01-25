import 'dotenv/config'
import commands from './commands/index.js'

// Discord.js versions ^13.0 require us to explicitly define client intents
import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client(
  { 
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  }
);

const prefix = '!'

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async message => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  
  const regex = new RegExp(/[^\s"']+|"[^"]*"|'[^']*'/g);
  const args = [];
  message.content.match(regex).forEach(element => {
    if (!element) return;
    return args.push(element.replaceAll(/"/gi, ''));
  });
  console.log(args);

  const command = args[0];

  if (!commands[command]) {
    return // call the help command here to show user list of available commands
  }
  await commands[command].execute(message, ...(args.slice(1)))
});

// // Log into our bot
client.login(process.env.CLIENT_TOKEN);