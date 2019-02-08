/* eslint-disable */
const path = require('path');
const glob = require('glob');
const basePath = process.cwd();

const dirModule = './src/templates/modules';
const dirComponents = './src/templates/components';
const dirPages = './src/templates/pages';

const fs = require('fs');
const simpleGit = require('simple-git')(basePath);
const nunjucks = require('nunjucks');
const { parseFile } = require('nunjucks-parser');

const webpackEntryObj = {};

let previewIndexObj = {
  types: [],
  payload: {}
},
htmlTemplates = [],
dir = path.resolve(basePath, 'src/templates');


let webpackEntryDefault = ['./src/js/base.js'],
    webpackEntryDefaultPreview = ['./src/js/base.js', './src/js/preview.js'],
    activityDays = 20,
    endDate = new Date(),
    startDate = new Date(endDate.getTime() - (activityDays * 24 * 60 * 60 * 1000)),
    getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory()),
    modules = getDirs(`./src/templates/modules`),
    components = getDirs(`./src/templates/components`),
    pages = getDirs(`./src/templates/pages`);

const filterCommitsInDateRange = (startDate, endDate, commitsArr) => {
      let retArr = [];
      let commitsArrDate = commitsArr.map(item => ( new Date(item.date.split(' ')[0]) ));

      // loop all dates
      for (var i = 0; i < commitsArrDate.length; i++) {
          let date = commitsArrDate[i];

          // if date between startDate and endDate range
          if (startDate <= date && date <= endDate) {
            retArr.push(commitsArr[i]);
        }
      }

      return retArr;
    },
    prepareDependencies = async (file, type) => {
      let env = nunjucks.configure(`./src/templates`);
      let {dependencies} = await parseFile(env, `${type}/${file}/${file}.njk`);
      let removeIndex = 0;
      let obj = {
        dependencies: dependencies
      }

      dependencies.forEach((dependency, i) => {
        for (var key in dependency) {
          if(dependency.hasOwnProperty(key)) {
            // console.log(key + " -> " + dependency[key]);

            if(dependency[key]!=null) {

              if(key!='path') {
                // remove system path
                if(dependency[key].includes('/src/templates/')) {
                  dependency[key] = dependency[key].split('/src/templates/')[1];
                }
                // remove filename
                dependency[key] = dependency[key].substring(0, dependency[key].lastIndexOf("/"));
              }
            }

          }
        }

        // remove own dep
        if(dependency['name']==`${type}/${file}`) {
          removeIndex = i;
        }

      });

      dependencies.splice(removeIndex, 1);

      fs.writeFile(`./src/templates/${type}/${file}/meta/dependencies.json`, JSON.stringify(obj), 'utf8', () => {});
    },
    getTemplateFiles = (type, file) => {
      let templatePath = `src/templates/${type}/${file}/${file}.njk`;
      let tmplPreviews = [];

      if (!fs.existsSync( path.resolve(basePath, `${templatePath}`))) {
          console.error("TEMPLATE NOT EXIST! " + path.resolve(basePath, `${templatePath}`));
          return [];
      }

      // get previews
      tmplPreviews = glob.sync('*.preview*.njk', {
        cwd: path.join(basePath, `src/templates/${type}/${file}/`),
        realpath: false
      }).map(page => {
        return page.replace('.njk', '');
      });

      return {
        template: templatePath,
        previews: tmplPreviews
      }
    };

    console.log('build template context..');

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
    if(file.charAt(0)!=='_'&&file.charAt(0)!=='.') {
      let templateObj = getTemplateFiles(type, file);
      let tmplPath = templateObj.template.substring(0, templateObj.template.lastIndexOf("/")).replace('src/templates/', '');
      let config = {};

      previewIndexObj.payload[type][file] = {
        name: file,
        type: type,
        chunkName: `js/preview`,
        template: templateObj.template,
        templateRel: templateObj.template.replace('src/templates/', ''),
        target: `${tmplPath}/${file}.html`,
        path: tmplPath,
        previews: templateObj.previews,
        variants: templateObj.previews.length
      }

      if(type==='pages') {
        previewIndexObj.payload[type][file].previews = [`${file}`];
        previewIndexObj.payload[type][file].variants = 1;
      }

      if(templateObj.previews.length==0) {
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


      if(type=="components"||type=="modules") {
        const path = `./src/templates/${type}/${file}/main.js`;
        let name = `${type}/${file}/${file}`;

        prepareDependencies(file, type);

        // check if js entry file exist
        try {
          if (fs.existsSync(path)) {
            webpackEntryObj[name] = [];

            // add to default preview entrys
            let entry = webpackEntryDefaultPreview.slice(0);
            entry.push(path);

            webpackEntryDefault.push(path);
            webpackEntryObj[name] = entry;

            previewIndexObj.payload[type][file].chunkName = `${tmplPath}/${file}`;

          }
        } catch(err) {}

        // write git commits from module dir
        simpleGit.log({'file': `./src/templates/${type}/${file}/${file}.njk`}, (err, log) => {
          let filteredCommits = filterCommitsInDateRange(startDate, endDate, log.all);
          log.all = filteredCommits;

          fs.writeFile(`./src/templates/${type}/${file}/meta/activity.json`, JSON.stringify(log), 'utf8', () => {});
        });
      }

    }

  });
});

// add default main and preview entry
webpackEntryObj['js/main'] = webpackEntryDefault;
webpackEntryObj['js/preview'] = webpackEntryDefaultPreview;

fs.writeFile(`./entry.report.json`, JSON.stringify(webpackEntryObj), 'utf8', () => {});

module.exports = {
  webpackEntryObj: webpackEntryObj,
  previewIndexObj: previewIndexObj
};
