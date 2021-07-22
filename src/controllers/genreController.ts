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
    //postgres status code for unique_violation https://www.postgresql.org/docs/9.2/errcodes-appendix.html
    if(err?.code === "23505") return res.sendStatus(409);
    res.sendStatus(500);
  }
}

export default {
  create
}