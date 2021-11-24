import { Injectable, NotFoundException } from '@nestjs/common';
import { Updates } from '../../entities/update.entity';
import { SearchDTO } from 'src/utils/global-dto.util';
import { Connection, DeepPartial } from 'typeorm';
import { CreateUpdateDTO, IdDTO, UpdateUpdateDTO } from './update.dto';
import { readdirSync, writeFile } from 'fs';
import { fileservicePath, randomString } from 'src/utils/main.util';
import { Request, request } from 'express';
import { FileserviceService } from '../fileservice/fileservice.service';

@Injectable()
export class UpdateService {
  constructor(
    private fileserviceService: FileserviceService,
    private connection: Connection,
  ) {}

  async search(queryParam: SearchDTO) {
    // Data preparation
    const page = queryParam?.page - 1 >= 0 ? queryParam?.page - 1 : 0;
    const sortBy = queryParam?.sortBy
      ? `update.${queryParam.sortBy}`
      : undefined;
    const sortType = queryParam?.sortType || 'ASC';

    // Get Updates
    let [updates, totalData] = await this.connection
      .getRepository(Updates)
      .createQueryBuilder('update')
      .where('update.title ILIKE :filter or update.content ILIKE :filter', {
        filter: `%${queryParam?.filter || ''}%`,
      })
      .take(queryParam?.limit)
      .skip(page * queryParam?.limit || 0)
      .orderBy(sortBy, sortType)
      .getManyAndCount();

    // Get Thumbnail URL
    const thumbnails = readdirSync(`${fileservicePath}/updates/thumbnails`);
    updates = updates.map((update) => {
      const files = thumbnails.filter((thumbnail) =>
        thumbnail.includes(update.updateId),
      );

      return {
        ...update,
        ...(files.length
          ? {
              thumbnailUrl: `${process.env.HOST}/files/updates/thumbnails/${files[0]}`,
              lowThumbnailUrl: `${process.env.HOST}/files/updates/thumbnails/${files[1]}`,
            }
          : {}),
      };
    });

    // Generate Total Page if limit exist
    const totalPage =
      queryParam?.limit &&
      Math.floor(totalData / queryParam.limit) +
        (totalData % queryParam.limit ? 1 : 0);

    return {
      updates,
      page: page + 1,
      totalData,
      ...(totalPage ? { totalPage } : {}),
    };
  }

  async findByUpdateCode(updateCode: string) {
    // Get Update
    let update: any = await this.connection
      .getRepository(Updates)
      .findOne({ where: { updateCode } });

    if (!update) throw new NotFoundException('Data not found');

    // Get Thumbnail URL
    const thumbnails = readdirSync(
      `${fileservicePath}/updates/thumbnails`,
    ).filter((file) => file.includes(update.updateId));
    if (thumbnails.length)
      update = {
        ...update,
        thumbnailUrl: `${process.env.HOST}/files/updates/thumbnails/${thumbnails[0]}`,
        lowThumbnailUrl: `${process.env.HOST}/files/updates/thumbnails/${thumbnails[1]}`,
      };

    return { update };
  }

  async create(body: CreateUpdateDTO, thumbnail: Express.Multer.File) {
    // Generate Update Code
    const updateCode = randomString(10);

    // Create Data
    const createdData = await this.connection
      .createQueryBuilder()
      .insert()
      .into(Updates)
      .values({ ...body, updateCode, createdAt: new Date() })
      .execute();

    // Save Cover Image
    const filename = `thumbnail_${createdData.generatedMaps[0].updateId}`;
    this.fileserviceService.saveImage(
      filename,
      `${fileservicePath}/updates/thumbnails`,
      thumbnail,
    );

    return {
      message: 'New Update successfully created',
    };
  }

  async update(queryParam: IdDTO, body: UpdateUpdateDTO) {
    await this.connection
      .createQueryBuilder()
      .update(Updates)
      .set({ ...body, updatedAt: new Date() })
      .where('updateId = :updateId', { updateId: queryParam.updateId })
      .execute();

    return {
      message: 'Update successfully updated',
    };
  }

  async changeCover(queryParam: IdDTO, thumbnail: Express.Multer.File) {
    // Remove existing file to prevent duplicate filename
    await this.fileserviceService.removeFiles(
      `${fileservicePath}/updates/thumbnails/`,
      `thumbnail_${queryParam.updateId}`,
    );

    // Save Cover Image
    if (thumbnail) {
      const filename = `thumbnail_${queryParam.updateId}`;
      this.fileserviceService.saveImage(
        filename,
        `${fileservicePath}/updates/thumbnails`,
        thumbnail,
      );
    }

    return {
      message: 'Cover image successfully changed',
    };
  }

  async delete(queryParam: IdDTO) {
    const getData = await this.connection
      .getRepository(Updates)
      .findOne({ updateId: queryParam.updateId });

    // Delete Data
    await this.connection
      .createQueryBuilder()
      .delete()
      .from(Updates)
      .where('updateId = :updateId', { updateId: queryParam.updateId })
      .execute();

    // Delete Cover Image
    await this.fileserviceService.removeFiles(
      `${fileservicePath}/updates/thumbnails/`,
      `thumbnail_${getData.updateId}`,
    );

    return {
      message: 'Update successfully deleted',
    };
  }
}
