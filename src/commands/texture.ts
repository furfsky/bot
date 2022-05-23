import { Command, CmdArgs } from ".";
import { Message, MessageEmbed } from "discord.js";
import * as Jimp from "jimp";
import path = require("path");
import * as fs from "fs";
export class CommandTexture implements Command {
  aliases = ["texture", "t"];
  cmdDocs = {
    description: "display a texture within the texture pack",
    args: ["path to texture"],
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const pathToTexture = path.join(
      __dirname,
      "../../src/files/FurfSky/assets",
      args[0]
    );
    if(args[0].split("../").length > 2)
      return msg.channel.send("Don't spy on my files fucker.");
    
    if (!fs.existsSync(pathToTexture))
      return msg.channel.send("That file doesn't exist");
    if (fs.lstatSync(pathToTexture).isDirectory())
      return msg.channel.send(
        new MessageEmbed({
          title: `Contents of \`${args[0]}\``,
          description: fs.readdirSync(pathToTexture).join("\n"),
          color: "#fbcc6c",
        })
      );
    const image = await Jimp.read(
      path.join(__dirname, "../../src/files/FurfSky/assets", args[0])
    )
      .then((texture) => {
        return texture
          .scaleToFit(160, 160, Jimp.RESIZE_NEAREST_NEIGHBOR)
          .getBufferAsync(Jimp.AUTO as any);
      })
      .catch((err) => {
        console.error(err);
      });
    msg.channel.send(`Texture for \`${args[0]}\``, {
      files: [image as Buffer],
    });
  }
}
