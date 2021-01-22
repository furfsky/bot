import { Command, CmdArgs } from ".";
import { Message, MessageEmbed } from "discord.js";

export class CommandFaq implements Command {
  aliases = ["faq"];
  cmdDocs = {
    description: "Creates FAQ embed (may be whitelisted)",
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const sections = args.join(" ").split("|");

    msg.channel.send(
      new MessageEmbed({
          title:sections[0],
          description:sections[1],
          color:"#fbcc6c"
      })
    );
  }
}
