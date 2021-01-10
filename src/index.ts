import { Client, Message, Guild, GuildEmoji } from "discord.js";
import { commands } from "./commands/index";
import { config } from "dotenv";
const client = new Client();
config();
export const kek = client.emojis.cache.get("797198600718647317");
client.on("ready", async () => {
  const guild = await client.guilds.fetch("771187253937438762");
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`over ${guild.memberCount} furries`, {
    type: "WATCHING",
  });
});
client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id == client.user?.id) return;
  if (!msg.content.startsWith(process.env.BOT_PREFIX)) return;
  const [cmd, ...args] = msg.content
    .slice(process.env.BOT_PREFIX.length)
    .replace(/ +/g, " ")
    .split(" ");
  const commandClass = commands.find((command) => {
    return command.aliases.some((c) => c.toLowerCase() === cmd.toLowerCase());
  });
  if (!commandClass) return;
  await commandClass
    .execute({
      msg: msg as Message & { guild: Guild },
      cmd,
      args: args,
    })
    .catch((e) => {
      console.log(e);
      msg.channel.send(e);
    });
});
client.login(process.env.DISCORD_TOKEN);
