
const isValidBody = (res, res, next) => {
  let validFields = ['description', 'done'];

  Object.keys(req.body).forEach(key => {

    if (!validFields.includes(key)) {
      return res.status(400).send({ error: 'Invalid body' });
    }

    if (!req.body[key]) {
      return res.status(400).send({ error: 'Missing fields' });
    };
  });
  next();
};

const getTask = (req, res, next) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id == id);
  if (!task) {
    return res.status(404).send({ error: 'Task not found' });
  };
  req.task = task;
  next();
}

module.exports = { getTask, isValidBody };