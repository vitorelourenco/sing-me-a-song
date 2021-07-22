import joi from 'joi';

const create = joi.object({
  name: joi.string().min(1).required(),
  genresIds: joi.array().items(joi.number().integer().min(1).required()).required(),
  youtubeLink: joi.string().min(1).required()
});

export default {
  create
}