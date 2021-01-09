import { Command, CmdArgs } from ".";
import { commands } from "./index";
import { Message, MessageEmbed } from "discord.js";
import { config } from "dotenv";
config();

const entry = (
  strings: TemplateStringsArray,
  cmd: string,
  args: string[],
  description: string
) => {
  return `\`${process.env.PREFIX}${cmd}${args.map(
    (arg) => ` <${arg}> `
  )}\` - ${description}
  `;
};

export class CommandHelp implements Command {
  aliases = ["help", "h"];
  cmdDocs = {
    description: "Displays this message",
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg } = cmdArgs;
    let full = "";
    for (const i in commands) {
      const cmd = commands[i].aliases[0];
      const args = commands[i].cmdDocs?.args || [];
      const description = commands[i].cmdDocs.description;
      full += entry`${cmd}${args}${description}`;
    }
    msg.channel.send(
      new MessageEmbed({
        title: "Help Menu",
        description: full,
      })
    );
  }
}
