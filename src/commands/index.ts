import { Message } from "discord.js";
import { CommandHelp } from "./help";
import { CommandIs } from "./is";
import { CommandKekw } from "./kek";

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
  new CommandKekw(),
];
