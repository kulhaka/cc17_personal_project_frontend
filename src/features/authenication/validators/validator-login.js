import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "string.empty": "username is required." }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "password is required." }),
});

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateLogin;
