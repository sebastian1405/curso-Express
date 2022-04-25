const routeHelper = (callback) => {
  return async (req, res) => {
    try {
      await callback(req, res);
    } catch (error) {
      //normalmente aqui se harian comparaciones dependiendo del error
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const addUserToDB = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("hubo un problema")), 500)
  );
  //ejemplo para error
};
// export default { routeHelper, sleep, addUserToDB };
