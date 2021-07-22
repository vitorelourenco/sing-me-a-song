import {Request, Response} from 'express';
import recommendationSchemas from '../schemas/recommendationSchemas';
import recommendationService from '../services/recommendationService';

async function create(req: Request,res: Response){
  try {
    const {error: badRequest} = recommendationSchemas.create.validate(req.body);
    if (badRequest) return res.sendStatus(400);

    const newRecommendation = await recommendationService.create(req.body);

    res.status(201).send(newRecommendation);
  } catch(err) {
    console.log(err);
    //23505: postgres error code for unique_violation https://www.postgresql.org/docs/9.2/errcodes-appendix.html
    if(err?.code === "23505") return res.sendStatus(409);
    //23503: postgres error code for foreign key violation https://www.postgresql.org/docs/9.2/errcodes-appendix.html
    if(err?.code === "23503") return res.sendStatus(406);
    res.sendStatus(500);
  }
}


export default {
  create
}