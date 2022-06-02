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
  "788121309812490250": {
    name: "Website Developer",
    color: "#008080",
  },
  "792234642304139284": {
    name: "Administrator",
    color: "#17d44a",
  },
  "772882533578047519": {
    name: "Moderator",
    color: "#4b8b3b",
  },
  "786640364920504330": {
    name: "Retired Staff",
    color: "#0d7f2c",
  },
  "772928360241954846": {
    name: "Contributor",
    color: "#00b0b0",
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
  "291620843363106828": {
    quote: "no fun allowed",
  },
  "200440882334269440": {
    quote:
      "im just now looking up furfsky again on youtube and it made me realize how much i've missed since my last release",
  },
  "589613735996555264": {
    quote: "I'm built not born, it's an analytical advantage.",
  },
  "423963063532781568": {
    quote: "you want me to have a dinky little 5x5 image for a legendary item?",
  },
  "147040087027220480": {
    quote: "Try not to cringe! [FSR Edition] (Gone wrong, absolutely failed)",
  },
  "226767818878746624": {
    quote: "shut up I thought u were still in the basement",
  },
  "221205857088700417": {
    quote: "breads yummy",
  },
  "880036918451142737": {
    quote: "imagine playing skyblock",
  },
  "577629191588282368": {
    quote: "your toes will be pulled tonight",
  },
  "663371660816154629": {
    quote: "it's not acting anymore, now it's being run by a microwave",
  },
  "370758856038678530": {
    quote: "gargage",
  },
  "285591656689041419": {
    quote: "you better not be the sus imposter",
  },
  "493164641921400853": {
    quote: "i live under a rock when it comes to optifine updates apparently",
  },
  "378106137586827276": {
    quote: "bootleg sans. also check out wab",
  },
  "335828900661821441": {
    quote: "next person who changes my name is certified acrid",
  },
  "-1": {
    quote:
      "Dollar Store Skeletony: now with uncreativivity (note: i could not find the id of ThatOneRandomDiscordAccount)",
  },
  "506442020118855681": {
    quote: "Shadow fury shits on Livid Dagger",
  },
  "501459973612765205": {
    quote: "Flip a coin. If heads, I am on vacation. If tails, blame Ery.",
  },
  "622207953293803521": {
    quote: "i will murder every axolotl in a 100 km radius",
  },
  "182916294989971457": {
    quote:
      "hey, you could pour soup in my lap and i'll probably apologize to you!",
  },
  "382275562762403852": {
    quote: "listen to creatures of habit",
    link: "https://www.youtube.com/watch?v=oXL3KcowG90&list=OLAK5uy_mrQpw7Bipv-a7DFFerdXeLe-Ll4yxdE6U",
  },
  "734445096606498918": {
    quote: "those are uhh... a lot of channels... you got there.",
  },
  "753943771925708882": {
    quote: "spain without the s",
  },
  "425424496099328000": {
    quote: "yup ! I hate furfsky 🙂",
  },
  "146051610475233280": {
    quote:
      "petition to remove the liver dragger's texture from fsr because you should never use it",
  },
  "567357006185496610": {
    quote: "Chroma HUD/UIs hurts my soul",
  },
  "412224011062214656": {
    quote: "we should broadcast my battle with the axe wielder tommorow at 5pm",
  },
  "273873363926253568": {
    quote: "[placeholder credit text]",
  },
  "393259749497372684": {
    quote:
      "wat is fur (this might be the wrong id? check https://canary.discord.com/channels/771187253937438762/772865068823085098/925619390811099157)",
  },
  "289932383812321280": {
    quote: "just guy being dude",
  },
  "341667514071384065": {
    quote: "How do i animate stuff minecraft.",
  },
  "517473096559624206": {
    quote: "🐱",
  },
  "687833315231006749": {
    quote: "ew burger ice cream",
  },
  "290952090560364545": {
    quote:
      "i can no longer code the website at school cause now everyone thinks im a furry 😔",
  },
  "678541597654253600": {
    quote: "reeee",
  },
  "562448163353526313": {
    quote: "you wet tubesock",
  },
  "313350346724343809": {
    quote: "They have turned me into a furry. help",
  },
  "312354836592984066": {
    quote: "if you do not like bread you shoudn't exist",
  },
  "370935848029519882": {
    quote: "you miss 100% of the shots you don't take",
  },
  "452954731162238987": {
    quote: "blub blub 🦈",
  },
  "236082530045001731": {
    quote:
      "the fsr twitter is a place only the highest level of memers can ascend to",
  },
  "340047021048070145": {
    quote: "help why is it so dark",
  },
  "323135820439486474": {
    quote: "Trash at Bedwars.",
  },
  "843791056252174338": {
    quote: "I eat my cereal with tears instead of milk",
  },
  "722532091455340714": {
    quote: "i like toast",
  },
  "571859986158845952": {
    quote: "Lost my Ult Wise 5 AOTE but still have my melons 👌",
  },
  "-2": {
    quote: "damn that's hot. (note: i could not find the id of Edna Mode)",
  },
  "712340020945748049": {
    quote:
      "sometimes i question why artists that are as good as the people here are making art for mc",
  },
  "426445388166201385": {
    quote: "download neu mod nerds",
  },
  "344116492163612673": {
    quote: "sup gamers",
  },
  "496409778822709251": {
    quote: "me when no wither googles texture",
  },
  "872063784255119410": {
    quote:
      "at least you didn't get yourself to design the whole sea creature guide",
  },
  "135467966014816256": {
    quote: "I use MS paint for my pixel art",
  },
  "435443705055543306": {
    quote:
      "just have it a normal file name, the cancer that is mediafire only makes things worse",
  },
  "459498565371166720": {
    quote: "om im stoopid",
  },
  "379652653552238612": {
    quote: "imagine playing hypixel on 1.16",
  },
  "173683354200178688": {
    quote: "what does that even mean xd?",
  },
  "485113423697412097": {
    quote: "#FSRGangOnTop",
  },
  "197923669098496000": {
    quote: "Stop making bad .json files.",
  },
  "756218779842904168": {
    quote: "damn, why is aseprite so expensive",
  },
  "687765920092782644": {
    quote: "old livid dagger texture was better",
  },
  "950146518843813959": {
    quote: "OH FUCK THE PERIOD",
  },
  "399049916757966848": {
    quote: "tylereboy my beloved",
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
        if (!credits.some((credit) => credit.id === userId)) {
          credits.push(
            Object.assign(
              {
                id: userId,
                name: user.user.username,
                role: roleId,
                quote: "",
                link: "",
                pfp: user.user.avatarURL(),
              },
              overrides[userId]
            )
          );
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
