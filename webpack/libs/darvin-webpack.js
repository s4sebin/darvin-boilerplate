/* eslint-disable */
const path = require('path');
const glob = require('glob');
const basePath = process.cwd();

const fs = require('fs');
const simpleGit = require('simple-git')(basePath);
const crypto = require('crypto');

const { filterCommitsInDateRange, prepareDependencies, getTemplateFiles, getDirs, getSVGIcons } = require('./darvin-helpers');

let webpackEntryObj = {},
    previewIndexObj = {
      types: [],
      payload: {}
    },
    htmlTemplates = [],
    dir = path.resolve(basePath, 'src/templates'),
    webpackEntryDefault = ['./src/js/main.js'],
    activityDays = 20,
    endDate = new Date(),
    startDate = new Date(endDate.getTime() - (activityDays * 24 * 60 * 60 * 1000));

console.log('start darvin..');

// get all categories
previewIndexObj.types = getDirs(dir);

// exclude config folder from types
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'config');
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'layouts');

// create payloads by types
previewIndexObj.types.forEach((type) => {
  previewIndexObj.payload[type] = {};

  fs.readdirSync(path.resolve(basePath, `src/templates/${type}`)).forEach((file) => {

    // only accept files not starting with _ or .
    if (file.charAt(0) !== '_' && file.charAt(0) !== '.') {
      let templateObj = getTemplateFiles(type, file);
      let tmplPath = templateObj.template.substring(0, templateObj.template.lastIndexOf("/")).replace('src/templates/', '');
      let config = {};

      previewIndexObj.payload[type][file] = {
        id: crypto.createHash('md5').update(file).digest("hex"),
        name: file,
        type: type,
        chunkName: `js/main`,
        template: templateObj.template,
        templateRel: templateObj.template.replace('src/templates/', ''),
        target: `${tmplPath}/${file}.html`,
        path: tmplPath,
        previews: templateObj.previews,
        variants: templateObj.previews.length
      }

      if (type === 'pages') {
        previewIndexObj.payload[type][file].previews = [`${file}`];
        previewIndexObj.payload[type][file].variants = 1;
      }

      if (templateObj.previews.length == 0) {
        previewIndexObj.payload[type][file].chunkName = 'js/main';
      }

      // load element config file
      try {
        config = require(path.resolve(basePath, `src/templates/${tmplPath}/meta/config.json`));
      } catch (e) {
        if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
          console.error("no config for " + path.resolve(basePath, `src/templates/${tmplPath}/meta/config.json`));
        } else {
          throw e;
        }
      }

      previewIndexObj.payload[type][file].config = config;

      const jsPath = `./src/templates/${type}/${file}/main.js`;
      let name = `${type}/${file}/${file}`;

      if(type!='pages') {
        prepareDependencies(file, type);
      }

      // create entry if element js exist
     /* try {
        if (fs.existsSync(jsPath)) {
          webpackEntryObj[name] = [];

          // add to default preview entrys
          let entry = webpackEntryDefaultPreview.slice(0);
          entry.push(jsPath);

          webpackEntryDefault.push(jsPath);
          webpackEntryObj[name] = entry;

          // set chunk
          previewIndexObj.payload[type][file].chunkName = `${tmplPath}/${file}`;
        }
      } catch (err) { }*/

      // filter last commits from last days
      simpleGit.log({ 'file': `./src/templates/${type}/${file}/${file}.njk` }, (err, log) => {
        let obj = {};
        let filteredCommits = filterCommitsInDateRange(startDate, endDate, log.all);

        log.all = filteredCommits;

        // get object to extend if exist
        try {
          obj = JSON.parse(fs.readFileSync('./log/activity-visualizer.json', 'utf8'));
        } catch (err) {}

        obj[file] = log;

        if (!fs.existsSync('./log')){
          fs.mkdirSync('./log');
        }

        fs.writeFileSync('./log/activity-visualizer.json', JSON.stringify(obj), 'utf8', () => { });
      });
    }

  });
});

// add default main and preview entry
webpackEntryObj['js/main'] = webpackEntryDefault;

if (!fs.existsSync('./log')){
  fs.mkdirSync('./log');
}

fs.writeFileSync(`./log/entry.report.json`, JSON.stringify(webpackEntryObj), 'utf8', () => { });

// get icons
let allIconsInDir = getSVGIcons();


module.exports = {
  webpackEntryObj: webpackEntryObj,
  previewIndexObj: previewIndexObj,
  allIconsInDir: allIconsInDir
};
