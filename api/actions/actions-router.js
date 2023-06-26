// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");

// [GET] /api/actions
router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving actions", error });
    });
});

// [GET] /api/actions/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Actions.getById(id)
    .then((action) => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving action", error });
    });
});

// [POST] /api/actions
router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({ message: "Project ID, description, and notes are required" });
    return;
  }

  const newAction = { project_id, description, notes };

  Actions.insert(newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating action", error });
    });
});

// [PUT] /api/actions/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({ message: "Project ID, description, and notes are required" });
    return;
  }

  Actions.getById(id)
    .then((action) => {
      if (action) {
        const updatedAction = { ...action, project_id, description, notes };

        Actions.update(id, updatedAction)
          .then(() => {
            res.json(updatedAction);
          })
          .catch((error) => {
            res.status(500).json({ message: "Error updating action", error });
          });
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving action", error });
    });
});

// [DELETE] /api/actions/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting action", error });
    });
});

module.exports = router;
