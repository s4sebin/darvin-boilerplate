const path = require('path');
const glob = require('glob');
const fs = require('fs');
const basePath = process.cwd();

const nunjucks = require('nunjucks');
const { parseFile } = require('nunjucks-parser');

const filterCommitsInDateRange = (startDate, endDate, commitsArr) => {
  let retArr = [];
  let commitsArrDate = commitsArr.map(item => (new Date(item.date.split(' ')[0])));

  // loop all dates
  for (let i = 0; i < commitsArrDate.length; i++) {
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
  let { dependencies } = await parseFile(env, `${type}/${file}/${file}.njk`);

  let selfIndex = 0;
  let obj = {
    dependencies: dependencies
  }

  dependencies.forEach((dependency, i) => {
    for (let key in dependency) {
      if (dependency.hasOwnProperty(key)) {
        if (dependency[key] != null) {

          if (key != 'path') {
            // remove system path
            if (dependency[key].includes('/src/templates/')) {
              dependency[key] = dependency[key].split('/src/templates/')[1];
            }
            // remove filename
            dependency[key] = dependency[key].substring(0, dependency[key].lastIndexOf("/"));
          }
        }
      }
    }

    // remove own dep
    if (dependency['name'] == `${type}/${file}`) {
      selfIndex = i;
    }

  });

  dependencies.splice(selfIndex, 1);

  // remove layouts
  dependencies = dependencies.filter(dependency => !dependency.name.includes('layouts/'));

  if (!fs.existsSync(`./src/templates/${type}/${file}/log`)){
    fs.mkdirSync(`./src/templates/${type}/${file}/log`);
  }

  fs.writeFileSync(`./src/templates/${type}/${file}/log/dependencies.json`, JSON.stringify(obj), 'utf8', () => { });
},
getTemplateFiles = (type, file) => {
  let templatePath = `src/templates/${type}/${file}/${file}.njk`;
  let tmplPreviews = [];

  if (!fs.existsSync(path.resolve(basePath, `${templatePath}`))) {
    // console.error("TEMPLATE NOT EXIST! " + path.resolve(basePath, `${templatePath}`));
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
},
getSVGIcons = () => {
  let icons = [];

  // get previews
  icons = glob.sync('*.svg', {
    cwd: path.join(basePath, `src/assets/images/icons/`),
    realpath: false
  }).map(page => {
    return page.replace('.svg', '');
  });

  return {
    icons: icons
  }
},
getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

module.exports = {
  filterCommitsInDateRange: filterCommitsInDateRange,
  prepareDependencies: prepareDependencies,
  getTemplateFiles: getTemplateFiles,
  getDirs: getDirs,
  getSVGIcons: getSVGIcons
};
