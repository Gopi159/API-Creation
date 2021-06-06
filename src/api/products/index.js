const services = require("./controller");
const init = (router) => {
  router.post("/addProduct", services.post);
  router.post("/updateProduct", services.update);
  router.get("/getProducts", services.getAll);
  router.get("/getProduct", services.getById);
  return router;
};
module.exports = init;
