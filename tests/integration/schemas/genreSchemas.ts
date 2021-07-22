import joi from "joi";

const dbGenre = joi.object({
  id: joi.number().integer().min(1).required(),
  name: joi.string().min(1).required(),
});

export default {
  dbGenre,
};
