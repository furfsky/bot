import { Command, CmdArgs } from ".";
import { Message, MessageEmbed } from "discord.js";

export class CommandRules implements Command {
  aliases = ["rules"];
  cmdDocs = {
    description: "Show rules (temporary command)",
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg } = cmdArgs;
    msg.channel.send(
      new MessageEmbed({
          title:"Rules",
          description:`
**1) - Don't be a jerk**
Don't go around calling people slurs, don't be excessively rude, etc. (this also applies to homophobia/transphobia/etc, none of that will be tolerated)
**2) - Don't spam or flood chat**
**3) - Please ask questions about the pack in #questions-and-support instead of #general**
**4) - No nudity or gore**
If pictures are not pleasent to look at, even though it isnt nsfw or gore dont send it
**5) - Dont argue with mods or artists to the point where its annoying**
**6) - Dont ghost ping people**
**7) - Try to avoid begging for stars**
**8) - Keep Politics to a minimum**
**9) - Do not be nsfw**
**10) - Please keep discussion in english**
**11) - No advertisting (not even in dms)**
__**These are just the general rules. Mods can warn you if they see fit.**__
**Tip** - check the pins in the channel you are in
**PS** - violating tos is against our and discord's rules and will be punished
          `,
          color:"#fbcc6c"
      })
    );
  }
}
