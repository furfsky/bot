import { Command, CmdArgs } from ".";
import { Message, MessageEmbed, TextChannel } from "discord.js";

export class CommandSay implements Command {
  aliases = ["say"];
  cmdDocs = {
    description: "Say something in a channel (WHITELISTED ONLY)",
    args: ["channel", "message"],
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const whitelist = [
      "290952090560364545",
      "312354836592984066",
      "622207953293803521",
      "323135820439486474",
      "562448163353526313",
      "454615922909380619",
      "678541597654253600",
      "226767818878746624",
      "740717070890696745",
      "653038455739121700",
      "291620843363106828",
      "750590649635700786",
    ];
    const { msg, args } = cmdArgs;
    const channel = msg.client.channels.cache.find(
      (channel) => channel.id === args[0].replace(/\D/g, "")
    );
    const [channelID, ...text] = args;
    if (!whitelist.includes(msg.author.id))
      return msg.channel.send("You aren't whitelisted!");
    if (!args[0] || !args[1]) return msg.channel.send("Expected 2 arguments");
    if (text.join("") == "")
      return msg.channel.send("You can't send a empty message");
    (channel as TextChannel).send(
      text
        .join(" ")
        .replace(/@(&)/gi, "")
        .replace(/@(everyone)/gi, "everyone")
        .replace(/@(here)/gi, "here")
    );
    console.log(`${text.join(" ")} -${msg.author.username}`);
    const botLogs = msg.client.channels.cache.find(
      (channel) => channel.id === "798052417928167434"
    );
    if (msg.author.id !== "290952090560364545")
      (botLogs as TextChannel).send(
        new MessageEmbed({
          title: `Message from ${msg.author.username} in ${channel.toString()}`,
          description: text
            .join(" ")
            .replace(/@(everyone)/gi, "everyone")
            .replace(/@(here)/gi, "here"),
          color: "#fbcc6c",
        })
      );
    if (msg.channel.type == "dm")
      msg.author.send(
        `Message "${text.join(" ")}" was sent in <#${channel.id}>`
      );
  }
}
