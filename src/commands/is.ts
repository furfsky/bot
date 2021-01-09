import { Command, CmdArgs } from ".";
import { Message, MessageEmbed } from "discord.js";

const humanData = [
  {
    aliases: ["sai", "saikage", "princesssai", "<@369091549155426305>"],
    things: [
      {
        thing: ["gay", `"happy"`],
        response: [
          "of course",
          "yes",
          "duh",
          "sai is gay",
          "wow you never knew?",
          "only for daddy grape",
          "https://cdn.discordapp.com/attachments/773940035309404202/797192253646700547/unknown.png",
        ],
      },
    ],
  },
  {
    aliases: ["bread", "toasted_bread", "toasted_bred", "Toasted_Breaad"],
    things: [
      {
        thing: ["bread", "toast"],
        response: [
          "yum! this bread is really good",
          "mmm my stomach is full now, thanks for the meal!",
          "bread is bread, who would of thought",
          "this bread is sentient",
        ],
      },
    ],
  },
  {
    aliases: ["xOticz_", "xOticz", "grape"],
    things: [
      {
        thing: ["gay", `"happy"`],
        response: [
          "fuck yeah",
          "towards sai",
          "yes",
          "<insert image of sai eating grape>",
          "https://cdn.discordapp.com/attachments/773940035309404202/797192253646700547/unknown.png",
        ],
      },
    ],
  },
];

export class CommandIs implements Command {
  aliases = ["is"];
  cmdDocs = {
    description: "is <someone> <something>?",
    args: ["someone", "something"],
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const person = humanData.find((person) => {
      return person.aliases.some(
        (p) => p.toLowerCase() === args[0].toLowerCase()
      );
    });
    const thing = person?.things.find((thing) => {
      return thing.thing.some((t) => t.toLowerCase() === args[1].toLowerCase());
    });
    if (person == undefined || thing == undefined) {
      msg.channel.send("Person or thing doesn't exist");
      return;
    }
    msg.channel.send(
      thing.response[Math.floor(Math.random() * thing.response.length)]
    );
  }
}
