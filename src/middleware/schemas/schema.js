import Joi from "joi";

const anyString = {
    "any.string": "El campo es obligatorio",
    "string.min": "Como mínimo debería tener 2 caracteres",
    "string.max": "Se excedió de los 30 caracteres"
};

const membershipNumber = {
    "any.string": "El campo es obligatorio",
    "string.min": "Como mínimo debería tener 8 caracteres",
    "string.max": "Como máximo debería tener 8 caracteres"
};
const email = {
    "any.string": "El campo es obligatorio"
};

const password = {
    "any.string": "El campo es obligatorio",
    "string.min": "Como mínimo debería tener 6 caracteres",
    "string.max": "Como máximo debería tener 24 caracteres"
};

export const Schemas = {
    String: Joi.string().min(2).max(55).required().messages(anyString),
    MembershipNumber: Joi.string().min(6).max(12).required().messages(membershipNumber),
    Email: Joi.string().required().email().messages(email),
    Password: Joi.string().min(6).max(24).required().messages(password),
};