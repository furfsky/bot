import { Message } from "discord.js";
import { CommandHelp } from "./help";
import { CommandIs } from "./is";
import { CommandKek } from "./kek";
import { CommandRules } from "./rules";
import { CommandSay } from "./say";
import { CommandFaq } from "./faq";
import { CommandTexture } from "./texture";
export interface CmdArgs {
  msg: Message;
  args: string[];
  cmd: string;
}
export interface Command {
  aliases: string[];
  cmdDocs: {
    description: string;
    args?: string[];
  };
  execute: (args: CmdArgs) => Promise<void | Message>;
}
export const commands: Command[] = [
  new CommandHelp(),
  new CommandIs(),
  new CommandKek(),
  new CommandSay(),
  new CommandRules(),
  new CommandFaq(),
  new CommandTexture(),
];
