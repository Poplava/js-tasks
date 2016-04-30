import fs from 'fs';
import path from 'path';
import pug from 'pug';
import express from 'express';
import serveStatic from 'serve-static';

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const TEMPLATES_PATH = path.resolve(SRC_PATH, 'templates');
const TASKS_PATH = path.resolve(ROOT_PATH, 'tasks');
const MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');

const fileNames = fs.readdirSync(TASKS_PATH);
const taskNames = fileNames.filter(fileName => fs.statSync(path.resolve(TASKS_PATH, fileName)).isDirectory());

const indexTemplate = path.resolve(TEMPLATES_PATH, 'index.pug');
const pureTemplate = path.resolve(TEMPLATES_PATH, 'pure.pug');
const testTemplate = path.resolve(TEMPLATES_PATH, 'test.pug');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  return res.send(
    pug.renderFile(indexTemplate, {
      pageTitle: 'Tasks',
      taskNames: taskNames
    })
  );
});

app.use('/assets', serveStatic(SRC_PATH));
app.use('/assets/vendor', serveStatic(MODULES_PATH));
app.use('/tasks', serveStatic(TASKS_PATH));

app.get('/test/:taskName', (req, res) => {
  const { taskName } = req.params;

  if (taskNames.indexOf(taskName) === -1) {
    return res.status(404).send('404 Not Found');
  }

  return res.send(
    pug.renderFile(testTemplate, {
      pageTitle: taskName,
      taskName: taskName
    })
  );
});

app.get('/pure/:taskName', (req, res) => {
  const { taskName } = req.params;

  if (taskNames.indexOf(taskName) === -1) {
    return res.status(404).send('404 Not Found');
  }

  return res.send(
    pug.renderFile(pureTemplate, {
      pageTitle: taskName,
      taskName: taskName
    })
  );
});

app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
