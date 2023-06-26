// [GET] /api/projects
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving projects", error });
    });
});

// [GET] /api/projects/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Projects.getById(id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving project", error });
    });
});

// [POST] /api/projects
router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({ message: "Name and description are required" });
    return;
  }

  const newProject = { name, description };

  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating project", error });
    });
});

// [PUT] /api/projects/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({ message: "Name and description are required" });
    return;
  }

  Projects.getById(id)
    .then((project) => {
      if (project) {
        const updatedProject = { ...project, name, description };

        Projects.update(id, updatedProject)
          .then(() => {
            res.json(updatedProject);
          })
          .catch((error) => {
            res.status(500).json({ message: "Error updating project", error });
          });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving project", error });
    });
});

// [DELETE] /api/projects/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting project", error });
    });
});

// [GET] /api/projects/:id/actions
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then((actions) => {
      if (actions.length > 0) {
        res.json(actions);
      } else {
        res.json([]);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error retrieving project actions", error });
    });
});

module.exports = router;
