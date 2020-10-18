import { Response, Request } from "express";
import { getRepository } from 'typeorm';
import * as Yup from 'yup'

import Orphanage from '../models/Ophanage';
import orphanageView from '../views/orphanages.view';

export default {

   async index(request: Request, response: Response) {
      const orphanageRepository = getRepository(Orphanage);

      const orphanages = await orphanageRepository.find({ relations: ['images'] })

      return response.json(orphanageView.renderMany(orphanages))
   },

   async show(request: Request, response: Response) {

      const orphanageRepository = getRepository(Orphanage);

      const orphanage = await orphanageRepository.findOneOrFail(request.params.id, { relations: ['images'] });

      return response.json(orphanageView.render(orphanage))
   },

   async create(request: Request, response: Response) {
      const {
         name,
         latitude,
         longitude,
         about,
         instructions,
         opening_hours,
         open_on_weekend
      } = request.body;

      
      const requestImages = request.files as Express.Multer.File[];
      let images;
      if(requestImages) {
         images = requestImages.map(image => { return { path: image.filename } });
      }
      
      const data = {
         name,
         latitude,
         longitude,
         about,
         instructions,
         opening_hours,
         open_on_weekend: open_on_weekend === 'true',
         images
      };
      
      const schema =  Yup.object().shape({
         name: Yup.string().required(),
         latitude: Yup.number().required(),
         longitude: Yup.number().required(),
         about: Yup.string().required().max(300),
         instructions: Yup.string().required(),
         opening_hours: Yup.string().required(),
         open_on_weekend: Yup.boolean().required(),
         images: Yup.array(
            Yup.object().shape({
               path: Yup.string().required()
            }))
      })

      await schema.validate(data, {
         abortEarly: false
      });

      const orphanageRepository = getRepository(Orphanage);

      const orphanage = orphanageRepository.create({
         name,
         latitude,
         longitude,
         about,
         instructions,
         opening_hours,
         open_on_weekend,
         images
      });

      await orphanageRepository.save(orphanage);

      return response.status(201).send(orphanage);
   }
}