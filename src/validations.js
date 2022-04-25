//Aqui se crean las validaciones para las rutas
const yup = require("yup");
const createUserValidation2 = (data) => {
  const { name, age, email } = data;

  if (typeof name !== "string") {
    throw new Error("name must be a string");
  }
  if (name.length <= 5) {
    throw new Error("name must be at  least 5 characters long");
  }
  if (!/[a-z]+$/i.test(name)) {
    throw new Error("name must contain only a-z characters");
  }

  //------

  if (typeof age !== "number") {
    throw new Error("age must be a number");
  }
  if (age <= 0) {
    throw new Error("age must be greater than 0");
  }
  if (age > 100) {
    throw new Error("age must be less than 100");
  }

  // -------

  if (typeof email !== "string") {
    throw new Error("email must be a string");
  }
  if (!/[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email)) {
    throw new Error("email must be valid ");
  }
};

const createUserValidation = (data) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5)
      .matches(/^[a-z]+$/).required,
    age: yup.number().min(1).max(100).integer().required,
    email: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/)
      .required,
  });

  schema.validateSync(data);
};
module.exports = {
  createUserValidation,
};
