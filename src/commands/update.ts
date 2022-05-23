import { Command, CmdArgs } from ".";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { writeFile } from "fs/promises";

interface Role {
  name: string; // Does not need to match up with the roles on discord
  color: string;
}

type Roles = {
  [key: string]: Role;
};

const roles: Roles = {
  "772842526452875305": {
    name: "Head of Head Artist",
    color: "#ffa500",
  },
  "776504774317047859": {
    name: "Head Artist",
    color: "#d776ff",
  },
  "859275007556845578": {
    name: "Original Furfsky Creator",
    color: "#c041ff",
  },
  "772842293223751690": {
    name: "Artist",
    color: "#b19cd9",
  },
  // TODO TRIAL ARTIST (no more trial artist??)
  "786640237329383506": {
    name: "Retired Artist",
    color: "#bbabdb",
  },
  "772928360241954846": {
    name: "Contributor",
    color: "#00b0b0",
  },

  "792234642304139284": {
    name: "Administrator",
    color: "#4b8b3b",
  },
  "772882533578047519": {
    name: "Moderator",
    color: "#17d44a",
  },
  "786640364920504330": {
    name: "Retired Staff",
    color: "#0d7f2c",
  },
};

interface Credit {
  id: string;
  name: string;
  role: string; // maybe the snowflake?
  quote?: string;
  link?: string;
  pfp: string;
}

interface Overrides {
  [key: string]: Partial<Credit>;
}

const overrides: Overrides = {
  "501459973612765205": {
    quote: "Flip a coin. If heads, I am on vacation. If tails, blame Ery.",
  },
};

export class CommandUpdate implements Command {
  aliases = ["update"];
  cmdDocs = {
    description: "Update website",
    args: [],
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const client = msg.client;
    let credits: Credit[] = [];
    for (const [roleId, role] of Object.entries(roles)) {
      for (const [userId, user] of msg.guild.roles.cache
        .get(roleId)
        .members.entries()) {
        if (
          !credits.some((credit) => {
            credit.id === userId;
          })
        ) {
          credits.push({
            id: userId,
            name: user.user.username,
            role: roleId,
            quote: overrides[userId]?.quote,
            link: overrides[userId]?.link,
            pfp: user.user.avatarURL(),
          });
        }
      }
    }

    await writeFile("credits.json", JSON.stringify({ roles, credits }));
    await msg.channel.send({
      content: "Updated Credits:",
      files: ["credits.json"],
    });
  }
}
