import Joi from 'joi'

export const JOI = {

  login: Joi.object({
    login: Joi.string().max(32).required(),
    password: Joi.string().max(32).required()
  })

}