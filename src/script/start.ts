import * as fs from 'fs';
import { playFiles } from './player'
import { detectPersonsInImage } from '../services/vision.service';
import { log } from 'console';

const args: string[] = process.argv.slice(2)

const imagePath: string = args[0]
const configPath: string = args[1]
const audiosPath  = args.slice(2)

const jsonContent: {[key: string]: any} = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const maxAllowedPersons = jsonContent.maxAllowedPersons;

detectPersonsInImage(fs.readFileSync(imagePath))
.then((personsInImage: number) => {
   if (personsInImage > maxAllowedPersons) {
    playFiles(audiosPath)
    return
   }

   log(`Les distanciations sociales sont respectées, ${personsInImage} personnes sur l'image contre ${maxAllowedPersons} autorisées.`)
})