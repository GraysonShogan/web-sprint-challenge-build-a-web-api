// add middlewares here related to projects
const { get } = require("./projects-model");

async function checkProjectId(req, res, next) {
  get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({
          status: 404,
          message: "user not found",
        });
      }
    })
    .catch(next);
}

async function checkProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    next({
      status: 400,
      message: "please complete all fields",
    });
  } else {
    next();
  }
}

module.exports = {
  checkProjectId,
  checkProject,
};
