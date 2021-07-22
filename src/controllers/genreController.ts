import genreService from '../services/genreService';
import genreSchemas from '../schemas/genreSchemas';
import {Request, Response} from 'express';

async function create(req:Request,res:Response){
  try {
    const {error: badRequest} = genreSchemas.create.validate(req.body);
    if (badRequest) return res.sendStatus(400);

    const newGenre = await genreService.create(req.body);

    res.status(201).send(newGenre);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export default {
  create
}