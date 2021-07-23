import joi from "joi";
import recommendationSchemas from "./recommendationSchemas";

const dbGenre = joi.object({
  id: joi.number().integer().min(1).required(),
  name: joi.string().min(1).required(),
});

const dbGenreList = joi.array().items(dbGenre).required();

const dbGenredRecommendations = joi.object({
  id: joi.number().integer().min(1).required(),
  name: joi.string().min(1).required(),
  score: joi.number().integer().required(),
  recommendations: recommendationSchemas.dbRecommendationList
})

export default {
  dbGenre,
  dbGenreList,
  dbGenredRecommendations
};
