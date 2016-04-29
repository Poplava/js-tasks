import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import express from 'express';
import serveStatic from 'serve-static';

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const TASKS_PATH = path.resolve(ROOT_PATH, 'tasks');

const fileNames = fs.readdirSync(TASKS_PATH);
const testNames = fileNames.filter(fileName => fs.statSync(path.resolve(TASKS_PATH, fileName)).isDirectory());


inquirer.prompt([
    {
      type: 'list',
      name: 'entry',
      choices: testNames,
      message: 'Which entry do you want to serve?'
    }
]).then(answers => init(answers));

function init({ entry }) {
  const app = express();
  const port = 3000;
  const taskPath = path.resolve(TASKS_PATH, entry);
  const indexPath = path.resolve(SRC_PATH, 'index.html');

  app.get('/', (req, res) => {
    res.send(
      fs.readFileSync(
        path.resolve(indexPath),
        { encoding: 'utf-8' }
      ).replace('{{title}}', entry)
    );
  });
  app.use('/', serveStatic(SRC_PATH));
  app.use('/js', serveStatic(taskPath));

  app.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  });
}
