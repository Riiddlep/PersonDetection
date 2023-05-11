import { Router, Request, Response } from "express";
import { generateAudioFiles } from "../services/speech.service";
import { translateText } from "../services/translate.service";
import * as fs from "fs";

const router: Router = Router();

router.get("/", (request: Request, response: Response) => {
  response.status(200).render("index", {
    title: "Person Detection",
    success: false,
  });
});

router.post("/", async (request: Request, response: Response) => {
  const maxAllowedPersons: number = parseInt(request.body.maxAllowedPersons);
  const broadcastMessage: string = request.body.broadcastMessage;
  const languages: string[] = [].concat(request.body.langs);

  const translations = await translateText(languages, broadcastMessage);

  for (const obj of translations!.langs) {
    for (const [key, value] of Object.entries(obj)) {
      await generateAudioFiles(
        value,
        key,
        `./resources/audios/broadcast_${key}`
      );
    }
  }

  fs.writeFile(
    "./resources/config.json",
    JSON.stringify({ maxAllowedPersons }),
    () => {}
  );

  response.status(201).render("index", {
    title: "Person Detection",
    success: true,
    maxAllowedPersons,
    broadcastMessage,
    languages,
  });
});

export default router;
