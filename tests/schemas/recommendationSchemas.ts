import joi from "joi";

const dbRecommendation = joi.object({
  id: joi.number().integer().min(1).required(),
  name: joi.string().min(1).required(),
  genres: joi
    .array()
    .items(
      joi
        .object({
          id: joi.number().integer().min(1).required(),
          name: joi.string().min(1).required(),
        })
        .required()
    )
    .required(),
  youtubeLink: joi.string().min(1).required(),
  score: joi.number().integer(),
});

const dbRecommendationList = joi.array().items(dbRecommendation).required();

export default {
  dbRecommendation,
  dbRecommendationList,
};
