import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import {
  createReadStream,
  existsSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import Jimp from 'jimp/es';

@Injectable()
export class FileserviceService {
  async getFile(path: string, res: Response) {
    if (existsSync(path)) {
      const filestream = createReadStream(path);

      filestream.pipe(res);
    } else {
      throw new NotFoundException('File not found');
    }
  }

  async saveImage(
    filename: string,
    directory: string,
    image: Express.Multer.File,
  ) {
    // Save Cover Image
    if (image) {
      const extension = image.originalname.match(/\.[0-9a-z]+$/i)[0];
      writeFileSync(`${directory}/${filename}${extension}`, image.buffer);

      Jimp.read(`${directory}/${filename}${extension}`).then((image) => {
        image
          .resize(image.getWidth() / 10, image.getHeight() / 10)
          .write(`${directory}/${filename}_low${extension}`);
      });
    }
  }

  async removeFiles(directory, filename) {
    const files = readdirSync(directory);
    for (const file of files) {
      if (file.includes(filename)) unlinkSync(directory + file);
    }
  }
}
