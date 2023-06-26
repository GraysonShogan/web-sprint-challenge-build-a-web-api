// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const { checkActionId, checkAction } = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (err) {
    res.status(500).json({
      message: "There are no actions to return",
    });
  }
});

router.get("/:id", checkActionId, async (req, res, next) => {
  await Actions.get(req.params.id)
    .then((action) => res.json(action))
    .catch(next);
});

router.post("/", checkAction, async (req, res, next) => {
  const newAction = req.body;
  Actions.insert(newAction)
    .then((action) => res.json(action))
    .catch(next);
});

router.put("/:id", checkActionId, checkAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((project) => res.json(project))
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  Actions.remove(req.params.id)
    .then((action) => res.json())
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "server error",
  });
});

module.exports = router;
