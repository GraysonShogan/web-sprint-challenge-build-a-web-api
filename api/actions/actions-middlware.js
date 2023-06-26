// add middlewares here related to actions
const { get } = require("./actions-model");

async function checkActionId(req, res, next) {
  get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({
          status: 404,
          message: "action not found",
        });
      }
    })
    .catch(next);
}

async function checkAction(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    res.status(400).json({
      message: "error",
    });
  } else {
    next();
  }
}

module.exports = {
  checkActionId,
  checkAction,
};
