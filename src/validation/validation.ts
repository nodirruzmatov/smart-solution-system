import Joi from 'joi'

export const JOI = {

  login: Joi.object({
    login: Joi.string().max(32).required(),
    password: Joi.string().max(32).required()
  }),
  news: Joi.object({
    title: Joi.string().max(64).required(),
    desc: Joi.string().max(512).required(),
    img: Joi.string().required(),
    location: Joi.string().max(512).required()
  }),



}