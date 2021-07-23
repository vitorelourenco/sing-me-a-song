import joi from "joi";

const create = joi.object({
  name: joi.string().min(1).required(),
});

export default {
  create,
};
