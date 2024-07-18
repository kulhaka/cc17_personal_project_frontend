import Joi from "joi";

const editSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).allow("").messages({
    "string.email": "invalid e-mail.",
  }),
  password: Joi.string()
    .allow("")
    .pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+?]{6,}$/)
    .messages({
      "string.empty": "password is required.",
      "string.pattern.base":
        "password must be at least 6 characters and cannot contain certain special characters.",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "string.empty": "confirm password is required.",
    "any.only": "password and confirm password did not match",
  }),
  currentPassword: Joi.string()
    .required()
    .messages({ "string.empty": "password is required." }),
});

const validateEdit = (input) => {
  const { error } = editSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateEdit;
