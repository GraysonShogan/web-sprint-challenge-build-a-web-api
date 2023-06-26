// add middlewares here related to projects
function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.getById(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving project", error });
    });
}

function validateActionId(req, res, next) {
  const { id } = req.params;

  Actions.getById(id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving action", error });
    });
}

module.exports = {
  validateProjectId,
  validateActionId,
};
