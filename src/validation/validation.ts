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
    location: Joi.string().max(512).required(),
    len: Joi.string().max(16).required()
  }),
  newsPut: Joi.object({
    title: Joi.string().max(64).allow(""),
    desc: Joi.string().max(512).allow(""),
    img: Joi.string().allow(""),
    location: Joi.string().max(512).allow(""),
    len: Joi.string().max(16)
  }),



}