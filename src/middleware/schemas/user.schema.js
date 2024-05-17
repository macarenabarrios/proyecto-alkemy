import Joi from "joi";
import { Schemas } from "./schema.js";

const userSchema = {

  create: Joi.object().keys({
    firstname: Schemas.String,
    lastname: Schemas.String,
		email: Schemas.Email,
    password: Schemas.Password,
		membershipNumber: Schemas.MembershipNumber
  }),


  login: Joi.object().keys({
		email: Schemas.Email,
    password: Schemas.Password,
  }),

  // update: Joi.object().keys({
  //   firstname: Schemas.String,
  //   lastname: Schemas.String,
  //   password: Schemas.Password,
  // }),
};

export {userSchema};