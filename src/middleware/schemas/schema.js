import Joi from "joi";

const anyString = {
    "any.string": "{{#label}} is required",
    "string.min": "The minimum length for {{#label}} is {{#limit}}",
    "string.max": "The maximum length for {{#label}} is {{#limit}}"
};

const membershipNumber = {
    "any.string": "This field is required",
    "string.min": "The minimum length for {{#label}} is {{#limit}}",
};
const email = {
    "any.string": "{{#label}} is required",
};

const password = {
    "any.string": "{{#label}} is required",
    "string.min": "The minimum length for {{#label}} is {{#limit}}",
    "string.max": "The maximum length for {{#label}} is {{#limit}}"
};

export const Schemas = {
    String: Joi.string().min(1).max(55).required().messages(anyString),
    MembershipNumber: Joi.string().min(6).required().messages(membershipNumber),
    Email: Joi.string().required().email().messages(email),
    Password: Joi.string().min(6).max(24).required().messages(password),
};