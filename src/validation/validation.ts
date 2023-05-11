import Joi from 'joi'

export const JOI = {

  login: Joi.object({
    login: Joi.string().max(32).required(),
    password: Joi.string().max(32).required()
  }),
  news: Joi.object({
    title: Joi.string().max(64).required(),
    desc: Joi.string().max(512).required(),
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
  cases: Joi.object({
    title: Joi.string().max(32).required(),
    link: Joi.string().required(),
    len: Joi.string().max(16)
  }),
  casesPut: Joi.object({
    title: Joi.string().max(32).allow(""),
    link: Joi.string().allow(""),
    len: Joi.string().max(16)
  }),
  employees: Joi.object({
    name: Joi.string().max(32).required(),
    job: Joi.string().max(32).required(),
    desc: Joi.string().max(512).required(),
    telegram: Joi.string().max(64).required(),
    mail: Joi.string().max(128).required(),
    insta: Joi.string().max(64).required(),
    phone: Joi.string().max(32).required(),
    img: Joi.string().required(),
    len: Joi.string().max(16)
  }),
  employeesPut: Joi.object({
    name: Joi.string().max(32).allow(""),
    job: Joi.string().max(32).allow(""),
    desc: Joi.string().max(512).allow(""),
    telegram: Joi.string().max(64).allow(""),
    mail: Joi.string().max(128).allow(""),
    insta: Joi.string().max(64).allow(""),
    phone: Joi.string().max(32).allow(""),
    img: Joi.string().allow(""),
    len: Joi.string().max(16)
  }),
  sevices: Joi.object({
    title: Joi.string().max(32).required(),
    desc: Joi.string().max(512).required(),
    img: Joi.string().required(),
    len: Joi.string().max(16)
  }),
  sevicesPut: Joi.object({
    title: Joi.string().max(32).allow(""),
    desc: Joi.string().max(512).allow(""),
    img: Joi.string().allow(""),
    len: Joi.string().max(16)
  })

}