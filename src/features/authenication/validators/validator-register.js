import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "string.empty": "username is required." }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+?]{6,}$/)
    .messages({
      "string.empty": "password is required.",
      "string.pattern.base":
        "password must be at least 6 characters and cannot contain certain special characters.",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "confirm password is required.",
    "any.only": "password and confirm password did not match",
  }),
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "e-mail is required.",
    "string.email": "invalid e-mail.",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
