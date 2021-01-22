import { Command, CmdArgs } from ".";
import { Message, MessageEmbed } from "discord.js";
import { orm } from "..";

export class CommandTest implements Command {
  aliases = ["test"];
  cmdDocs = {
    description: "tests database",
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg } = cmdArgs;
    
    msg.channel.send(
        
      new MessageEmbed({
          title:"Rules",
          description:`
          `,
          color:"#fbcc6c"
      })
    );
  }
}
