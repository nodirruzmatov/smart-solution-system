import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { Exception } from "../exception/exception.js";



export const validationHandler = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new Exception(error.message, 422));
    }

    next();
  };
};
